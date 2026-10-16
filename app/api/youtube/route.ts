import { NextResponse } from "next/server";

// Fallback channel data for Shaz Mohamed (@CallMeShazzamTECH)
const FALLBACK_DATA: YouTubeChannelData = {
  channelTitle: "CallMeShazzam ☕",
  channelUrl: "https://www.youtube.com/@CallMeShazzamTECH",
  fetchedAt: new Date().toISOString(),
  videos: [
    {
      id: "demo1",
      title: "CHAi with Tech — The Brutal Reality of Modern Flagships",
      published: new Date().toISOString(),
      updated: new Date().toISOString(),
      link: "https://www.youtube.com/@CallMeShazzamTECH",
      thumbnail: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&auto=format&fit=crop",
      description: "Unfiltered breakdown of this season's smartphones over cutting chai.",
      viewCount: "1240000",
    },
    {
      id: "demo2",
      title: "Mobile Kadhakal: Why Cheap Phones Beat Flagships",
      published: new Date().toISOString(),
      updated: new Date().toISOString(),
      link: "https://www.youtube.com/@CallMeShazzamTECH",
      thumbnail: "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=800&auto=format&fit=crop",
      description: "Testing real-world battery, thermals, and daily usability.",
      viewCount: "890000",
    },
    {
      id: "demo3",
      title: "Tech Roasts & Gadgets Nobody Needs",
      published: new Date().toISOString(),
      updated: new Date().toISOString(),
      link: "https://www.youtube.com/@CallMeShazzamTECH",
      thumbnail: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&auto=format&fit=crop",
      description: "Calling out gimmicky features and overpriced hype gadgets.",
      viewCount: "2100000",
    },
  ],
};

const YOUTUBE_RSS_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=UCR9mOaY0sXkf8FqMv66Gm0A`;

export interface YouTubeVideo {
  id: string;
  title: string;
  published: string;
  updated: string;
  link: string;
  thumbnail: string;
  description: string;
  viewCount?: string;
  starRating?: { count: string; average: string };
}

export interface YouTubeChannelData {
  channelTitle: string;
  channelUrl: string;
  videos: YouTubeVideo[];
  fetchedAt: string;
}

function parseXML(xml: string): YouTubeChannelData {
  const channelTitleMatch = xml.match(/<title>([^<]*)<\/title>/);
  const channelTitle = channelTitleMatch ? channelTitleMatch[1] : "CallMeShazzamTECH";

  const channelUrlMatch = xml.match(/<uri>([^<]*)<\/uri>/);
  const channelUrl = channelUrlMatch ? channelUrlMatch[1] : "https://www.youtube.com/@CallMeShazzamTECH";

  const entries = xml.split("<entry>").slice(1);
  const videos: YouTubeVideo[] = entries.map((entry) => {
    const getTag = (tag: string) => {
      const match = entry.match(new RegExp(`<${tag}>([^<]*)</${tag}>`));
      return match ? match[1] : "";
    };

    const videoId = getTag("yt:videoId");
    const title = getTag("title");
    const published = getTag("published");
    const updated = getTag("updated");
    const link = `https://www.youtube.com/watch?v=${videoId}`;
    const thumbnail = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;

    const descMatch = entry.match(/<media:description>([^]*?)<\/media:description>/);
    const description = descMatch ? descMatch[1].trim() : "";

    const viewCountMatch = entry.match(/media:statistics[^>]*views="(\d+)"/);

    return {
      id: videoId,
      title,
      published,
      updated,
      link,
      thumbnail,
      description: description.substring(0, 300),
      viewCount: viewCountMatch ? viewCountMatch[1] : undefined,
    };
  });

  return {
    channelTitle,
    channelUrl,
    videos: videos.slice(0, 15),
    fetchedAt: new Date().toISOString(),
  };
}

let cachedData: YouTubeChannelData | null = null;
let cacheTime = 0;
const CACHE_DURATION = 10 * 60 * 1000;

// Adding request: Request keeps this dynamically evaluated at runtime
export async function GET(request: Request) {
  try {
    const now = Date.now();

    if (cachedData && now - cacheTime < CACHE_DURATION) {
      return NextResponse.json({
        success: true,
        data: cachedData,
        cached: true,
      });
    }

    // Use an abort timeout of 3 seconds so the build or request never hangs
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);

    let xml = "";
    try {
      const response = await fetch(YOUTUBE_RSS_URL, {
        headers: {
          "User-Agent": "Mozilla/5.0 (compatible; Googlebot/2.1)",
        },
        signal: controller.signal,
      });
      clearTimeout(timeoutId);

      if (response.ok) {
        xml = await response.text();
      }
    } catch {
      clearTimeout(timeoutId);
    }

    if (xml && xml.includes("<entry>")) {
      const parsed = parseXML(xml);
      cachedData = parsed;
      cacheTime = now;
      return NextResponse.json({
        success: true,
        data: parsed,
        cached: false,
      });
    }

    // Graceful fallback whenever RSS is slow or blocked
    return NextResponse.json({
      success: true,
      data: cachedData || FALLBACK_DATA,
      fallback: true,
    });
  } catch (err) {
    return NextResponse.json({
      success: true,
      data: cachedData || FALLBACK_DATA,
      fallback: true,
    });
  }
}
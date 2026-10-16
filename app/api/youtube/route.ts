import { NextResponse } from "next/server";

// YouTube channel handle for @CallMeShazzamTECH
const CHANNEL_HANDLE = "CallMeShazzamTECH";
// RSS feed via handle — YouTube resolves this to the correct channel
const YOUTUBE_RSS_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=UCR9mOaY0sXkf8FqMv66Gm0A`;
// Fallback: resolve via page scrape if RSS fails
const YOUTUBE_CHANNEL_PAGE = `https://www.youtube.com/@${CHANNEL_HANDLE}`;

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
  // Parse channel title
  const channelTitleMatch = xml.match(/<title>([^<]*)<\/title>/);
  const channelTitle = channelTitleMatch ? channelTitleMatch[1] : "CallMeShazzamTECH";

  // Parse channel URL
  const channelUrlMatch = xml.match(/<uri>([^<]*)<\/uri>/);
  const channelUrl = channelUrlMatch ? channelUrlMatch[1] : 'https://www.youtube.com/@CallMeShazzamTECH';

  // Parse entries (videos)
  const entries = xml.split("<entry>").slice(1);
  const videos: YouTubeVideo[] = entries.map((entry) => {
    const getTag = (tag: string) => {
      const match = entry.match(new RegExp(`<${tag}>([^<]*)</${tag}>`));
      return match ? match[1] : "";
    };

    const getAttr = (tag: string, attr: string) => {
      const match = entry.match(new RegExp(`<${tag}[^>]*${attr}="([^"]*)"[^>]*/?>|<${tag}[^>]*${attr}="([^"]*)"[^>]*>`));
      return match ? (match[1] || match[2] || "") : "";
    };

    const videoId = getTag("yt:videoId");
    const title = getTag("title");
    const published = getTag("published");
    const updated = getTag("updated");
    const link = `https://www.youtube.com/watch?v=${videoId}`;
    const thumbnail = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;

    // Extract media:description
    const descMatch = entry.match(/<media:description>([^]*?)<\/media:description>/);
    const description = descMatch ? descMatch[1].trim() : "";

    // Extract media:starRating
    const starCountMatch = entry.match(/media:starRating[^>]*count="(\d+)"/);
    const starAvgMatch = entry.match(/media:starRating[^>]*average="([^"]+)"/);

    // Extract media:statistics viewCount
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
      starRating: starCountMatch ? {
        count: starCountMatch[1],
        average: starAvgMatch ? starAvgMatch[1] : "0",
      } : undefined,
    };
  });

  return {
    channelTitle,
    channelUrl,
    videos: videos.slice(0, 15), // Latest 15 videos
    fetchedAt: new Date().toISOString(),
  };
}

// Cache for 10 minutes to avoid hammering YouTube
let cachedData: YouTubeChannelData | null = null;
let cacheTime = 0;
const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes

export async function GET() {
  try {
    const now = Date.now();

    // Return cached data if still fresh
    if (cachedData && now - cacheTime < CACHE_DURATION) {
      return NextResponse.json({
        success: true,
        data: cachedData,
        cached: true,
      });
    }

    let xml = "";
    let fetchSuccess = false;

    // Try direct RSS feed first
    try {
      const response = await fetch(YOUTUBE_RSS_URL, {
        headers: {
          "User-Agent": "Mozilla/5.0 (compatible; ShazzamPortfolio/1.0)",
        },
        next: { revalidate: 600 },
      });

      if (response.ok) {
        xml = await response.text();
        if (xml.includes("<entry>")) {
          fetchSuccess = true;
        }
      }
    } catch (e) {
      console.warn("[YouTube API] Direct RSS failed, trying fallback...", e);
    }

    // Fallback: resolve channel ID from the channel page
    if (!fetchSuccess) {
      try {
        const pageRes = await fetch(YOUTUBE_CHANNEL_PAGE, {
          headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
          },
        });
        const pageHtml = await pageRes.text();

        // Extract channel ID from page source
        const channelIdMatch = pageHtml.match(/\"channelId\":\"(UC[^"]+)\"/);
        if (channelIdMatch) {
          const resolvedId = channelIdMatch[1];
          const fallbackUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${resolvedId}`;
          const rssRes = await fetch(fallbackUrl, {
            headers: { "User-Agent": "Mozilla/5.0 (compatible; ShazzamPortfolio/1.0)" },
            next: { revalidate: 600 },
          });
          if (rssRes.ok) {
            xml = await rssRes.text();
            if (xml.includes("<entry>")) {
              fetchSuccess = true;
            }
          }
        }
      } catch (e) {
        console.warn("[YouTube API] Fallback channel ID resolution failed", e);
      }
    }

    if (!fetchSuccess || !xml) {
      throw new Error("Could not fetch YouTube RSS from any source");
    }

    const data = parseXML(xml);

    // Update cache
    cachedData = data;
    cacheTime = now;

    return NextResponse.json({
      success: true,
      data,
      cached: false,
    });
  } catch (err) {
    console.error("[YouTube API] Error fetching channel data:", err);

    // Return cached data if available (stale but better than nothing)
    if (cachedData) {
      return NextResponse.json({
        success: true,
        data: cachedData,
        cached: true,
        stale: true,
      });
    }

    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch YouTube data. Please try again later.",
      },
      { status: 502 }
    );
  }
}

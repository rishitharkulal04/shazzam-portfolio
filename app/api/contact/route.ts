import { NextRequest, NextResponse } from "next/server";

export interface CollabFormData {
  brandName: string;
  workEmail: string;
  campaignBrief?: string;
  scope: string;
  budget: string;
}

// In-memory store for submissions (swap for a DB/email service in production)
const submissions: (CollabFormData & { timestamp: string; id: string })[] = [];

export async function POST(request: NextRequest) {
  try {
    const body: CollabFormData = await request.json();

    // --- Validation ---
    if (!body.brandName || body.brandName.trim().length < 2) {
      return NextResponse.json(
        { success: false, error: "Brand name is required (min 2 chars)." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!body.workEmail || !emailRegex.test(body.workEmail)) {
      return NextResponse.json(
        { success: false, error: "A valid work email is required." },
        { status: 400 }
      );
    }

    if (!body.scope) {
      return NextResponse.json(
        { success: false, error: "Campaign scope must be selected." },
        { status: 400 }
      );
    }

    if (!body.budget) {
      return NextResponse.json(
        { success: false, error: "Budget range must be selected." },
        { status: 400 }
      );
    }

    // --- Store submission ---
    const submission = {
      ...body,
      id: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
    };
    submissions.push(submission);

    console.log("[Collab Terminal] New submission received:", {
      id: submission.id,
      brand: submission.brandName,
      email: submission.workEmail,
      scope: submission.scope,
      budget: submission.budget,
      timestamp: submission.timestamp,
    });

    // In production you would: send email via Resend/SendGrid, store in DB, etc.
    // Example: await sendEmail({ to: "shazzam@creatorcollaborations.com", ...submission })

    return NextResponse.json(
      {
        success: true,
        message:
          "Transmission received. Our partnerships desk will revert within 24 hours.",
        id: submission.id,
      },
      { status: 201 }
    );
  } catch (err) {
    console.error("[Collab Terminal] Error processing submission:", err);
    return NextResponse.json(
      { success: false, error: "Failed to process submission. Please try again." },
      { status: 500 }
    );
  }
}

// GET: Returns submission count (for admin/analytics)
export async function GET() {
  return NextResponse.json({
    count: submissions.length,
    message: `${submissions.length} collaboration inquiry(ies) received.`,
  });
}

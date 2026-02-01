import { NextResponse } from "next/server";
import { getComedyBlueprints } from "@standup/cms/blog";

export async function GET() {
  try {
    const entries = await getComedyBlueprints();
    return NextResponse.json({ entries });
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}

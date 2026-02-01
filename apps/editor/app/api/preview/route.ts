import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const DATA_PATH = path.join(process.cwd(), "data");
const FILE = path.join(DATA_PATH, "editor-preview.json");

export async function GET() {
  try {
    await fs.mkdir(DATA_PATH, { recursive: true });
    const raw = await fs.readFile(FILE, "utf-8").catch(() => "null");
    const data = raw ? JSON.parse(raw) : {};
    return NextResponse.json({ data });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    await fs.mkdir(DATA_PATH, { recursive: true });
    await fs.writeFile(FILE, JSON.stringify(body, null, 2), "utf-8");
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}

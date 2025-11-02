import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const path = body?.path || "/";
    
    revalidatePath(path);
    revalidatePath("/");
    
    return NextResponse.json({ revalidated: true, path }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { revalidated: false, error: String(error) },
      { status: 500 }
    );
  }
}


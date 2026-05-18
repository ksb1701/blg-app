import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function GET() {
  // This tells Next.js to purge the cache for the home page
  revalidatePath("/");

  return NextResponse.json({ 
    revalidated: true, 
    message: "Home page cache cleared!" 
  });
}

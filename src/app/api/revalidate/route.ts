import { revalidatePath, revalidateTag } from "next/cache"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  const secret = req.headers.get("x-revalidate-secret")

  if (!process.env.REVALIDATE_SECRET || secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { type } = await req.json().catch(() => ({ type: "product" }))

  if (type === "product") {
    revalidateTag("products")
    revalidatePath("/[countryCode]/store", "page")
    revalidatePath("/[countryCode]/products/[handle]", "page")
  }

  if (type === "category") {
    revalidateTag("categories")
    revalidatePath("/[countryCode]/categories/[...category]", "page")
  }

  if (type === "collection") {
    revalidateTag("collections")
    revalidatePath("/[countryCode]/collections/[handle]", "page")
  }

  return NextResponse.json({ revalidated: true, type })
}

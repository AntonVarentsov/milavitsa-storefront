import { Metadata } from "next"
import { retrieveCustomer } from "@lib/data/customer"
import { getWishlistItems } from "@lib/data/wishlist"
import WishlistTemplate from "@modules/wishlist/templates"

export const metadata: Metadata = {
  title: "Избранное",
  description: "Ваши любимые товары",
}

export default async function WishlistPage() {
  const customer = await retrieveCustomer()
  const serverWishlistItems = await getWishlistItems()

  return (
    <WishlistTemplate
      customer={customer}
      serverWishlistItems={serverWishlistItems}
    />
  )
}

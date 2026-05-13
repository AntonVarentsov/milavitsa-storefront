import { HttpTypes } from "@medusajs/types"
import Item from "@modules/cart/components/item"

type ItemsTemplateProps = {
  cart?: HttpTypes.StoreCart
}

const ItemsTemplate = ({ cart }: ItemsTemplateProps) => {
  const items = cart?.items?.slice().sort((a, b) =>
    (a.created_at ?? "") > (b.created_at ?? "") ? -1 : 1
  )

  return (
    <div>
      {items?.map((item) => (
        <Item
          key={item.id}
          item={item}
          currencyCode={cart?.currency_code ?? "rub"}
        />
      ))}
    </div>
  )
}

export default ItemsTemplate

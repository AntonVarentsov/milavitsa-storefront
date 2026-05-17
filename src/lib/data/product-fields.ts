/**
 * Наборы полей для запросов к /store/products.
 *
 * Дефолтный (в listProducts) — лёгкий, оптимизирован под листинги (PLP, home,
 * related). PDP-набор расширяет его: добавляет variants.options и
 * variants.images, нужные на странице товара (выбор варианта, фильтрация
 * галереи). Передавать через `listProducts({ queryParams: { fields: PDP_PRODUCT_FIELDS } })`.
 */
export const PDP_PRODUCT_FIELDS =
  "*variants.calculated_price,+variants.inventory_quantity,*variants.images,*variants.options,*variants.options.option,*options,*options.values,*images,*collection,+metadata,+tags,"

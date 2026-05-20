# Поиск товаров — Design Spec

**Дата:** 2026-05-20  
**Статус:** Утверждён

## Контекст

В шапке сторфронта есть кнопка поиска (nav-bar.tsx:96–101), которая ничего не делает. Поисковый функционал полностью отсутствует — нет маршрута `/search`, нет поддержки `q`-параметра в data layer, нет поискового модуля. Пользователи не могут искать товары. Цель — реализовать полноценный текстовый поиск с модальным оверлеем и страницей результатов.

## Выбранный подход

**Модальный оверлей + страница `/search`** на базе встроенного PostgreSQL ILIKE (Medusa v2 `q`-параметр) — без внешних поисковых сервисов.

## Архитектура

```
nav-bar.tsx
├── isSearchOpen: boolean (useState)
├── <button onClick={() => setIsSearchOpen(true)}>  [иконка 🔍]
└── <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

SearchModal (Client Component)
├── Backdrop (клик → onClose)
├── Dialog
│   ├── <input> autofocus, placeholder "Поиск товаров..."
│   │   ├── onChange → debounce 300мс → fetchSearchResults(q)
│   │   └── onKeyDown: Enter → router.push(`/${countryCode}/search?q=...`), Escape → onClose
│   └── Results area
│       ├── idle: пусто или подсказка
│       ├── loading: skeleton / spinner
│       ├── results (max 6): список ProductSearchResult
│       └── no-results: "Ничего не найдено"
│           └── ProductSearchResult: thumbnail + title + price → /products/[handle]

/[countryCode]/(main)/search/page.tsx (Server Component)
├── searchParams: { q, sortBy, page }
├── Заголовок "Результаты поиска: [q]"  + кол-во товаров
├── <RefinementList />  (сортировка)
└── <PaginatedProducts q={q} sortBy={sortBy} page={page} />
```

## Файлы для создания

| Файл | Тип | Назначение |
|------|-----|-----------|
| `src/modules/search/components/search-modal/index.tsx` | Client Component | Модальный оверлей поиска |
| `src/app/[countryCode]/(main)/search/page.tsx` | Server Component | Страница результатов поиска |

## Файлы для изменения

| Файл | Изменение |
|------|-----------|
| `src/modules/layout/templates/nav/nav-bar.tsx` | Добавить `isSearchOpen` state, кнопка поиска открывает SearchModal, рендер `<SearchModal />` |
| `src/lib/data/products.ts` → `listProductsWithSort()` | Добавить необязательный параметр `q?: string`, передавать в запрос к `/store/products` |
| `src/modules/store/templates/paginated-products.tsx` | Принять и передать `q` в `listProductsWithSort()` |

## Детали компонентов

### SearchModal

- **Минимальная длина запроса:** 2 символа
- **Debounce:** 300мс (setTimeout/clearTimeout в useEffect)
- **Регион:** берётся из cookies через `getRegion()` (как в других компонентах)
- **Запрос к API:** `listProductsWithSort({ q, pageSize: 6, page: 0, countryCode })`
- **Карточка результата:** изображение 40×40, название, цена `calculated_price`
- **Клавиатура:** Escape → onClose; Enter → navigate + onClose; Tab — штатный порядок фокуса
- **Закрытие:** backdrop click, Escape, клик по результату

### Страница /search

- Реиспользует `PaginatedProducts` и `RefinementList` из `src/modules/store/templates/`
- Поддерживает `sortBy` и `page` (те же параметры что у /store)
- При пустом `q` — показывает все товары (поведение как у /store)
- Заголовок страницы: `Поиск: "[q]" | Milavitsa` для SEO

### Data layer

В `listProductsWithSort()` добавить:
```ts
// было:
const { response: { products } } = await sdk.store.product.list({ ... })

// стало:
const { response: { products } } = await sdk.store.product.list({
  ...(q && { q }),   // передаётся только если задан
  ...
})
```

Medusa v2 `/store/products` поддерживает `q` из коробки — ILIKE по полям `title`, `description`, `subtitle` продуктов через PostgreSQL.

## Ограничения

- Поиск без опечаток (typo-tolerant) — ILIKE ищет точное вхождение подстроки
- Поиск по артикулу/SKU не гарантирован без проверки (нужно уточнить после реализации)
- Нет автодополнения (suggest) — только готовые результаты

## Верификация

1. Запустить storefront: `npm run storefront:dev`
2. Кликнуть на иконку поиска в шапке → должна открыться модаль
3. Набрать 2+ символа → через 300мс появляются результаты
4. Нажать Enter → переход на `/ru/search?q=...` с сеткой товаров
5. Нажать Escape → модаль закрывается
6. Кликнуть на товар в модали → переход на `/ru/products/[handle]`
7. На странице /search работает сортировка и пагинация
8. При пустом запросе `/ru/search` показывает все товары

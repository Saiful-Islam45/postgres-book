

# Book catalog backend

## Live Link: https://prisma-postgres-book-backend.vercel.app
### Application Routes:
#### User
`/api/v1/auth/signup (POST)`

`/api/v1/auth/signin (POST)`

`/api/v1/users (GET)`

`/api/v1/users/f63fafef-9122-4273-a6a7-5b222bc475c0 (Single GET)`

`/api/v1/users/f63fafef-9122-4273-a6a7-5b222bc475c0 (PATCH)`

`/api/v1/users/f63fafef-9122-4273-a6a7-5b222bc475c0 (DELETE)`

`/api/v1/profile (GET)`

#### Category

`/api/v1/categories/create-category (POST)`

`/api/v1/categories (GET)`

`/api/v1/categories/2b7a60f4-ea91-465a-b633-84b8d6b69147 (Single GET)`

`/api/v1/categories/2b7a60f4-ea91-465a-b633-84b8d6b69147 (PATCH)`

`/api/v1/categories/2b7a60f4-ea91-465a-b633-84b8d6b69147 (DELETE)`

#### Books

`/api/v1/books/create-book (POST)`

`/api/v1/books (GET)`

`/api/v1/books/294fd18c-3c0b-4ba3-96fd-81f5852c164e/category (GET)`

`/api/v1/books/a7e7c630-afd1-4a2a-ae09-b837275e63de (GET)`

`/api/v1/books/a7e7c630-afd1-4a2a-ae09-b837275e63de (PATCH)`

`/api/v1/books/a7e7c630-afd1-4a2a-ae09-b837275e63de (DELETE)`

#### Orders

`/api/v1/orders/create-order (POST)`

`/api/v1/orders (GET)`

`/api/v1/orders/9a8f5e56-17c1-469b-b96f-18731cb898f4 (GET)`

We can also use different query for seraching and filtering books like -
``` Query parameters: (Case Insensitive)

- page: The page number for pagination (e.g., ?page=1).
- size: The number of book listings per page (e.g. ?size=10).
- sortBy: The field to sort the cow listings (e.g. ?sortBy=price).
- sortOrder : The order of sorting, either 'asc' or 'desc' (e.g. ?sortOrder=asc).
- minPrice: The minimum price for filtering (e.g. ?minPrice=1000).
- maxPrice: The maximum price for filtering (e.g. ?maxPrice=5000).
- category: Filter using category id (e.g : ?category=f1234573-sfkjsf-45332)
- search: The search query string for searching books (e.g., ?search="Programmig"). (Search Fields should be title,author,genre) ```



# Book catalog backend

## Live Link: https://prisma-postgres-book-backend.vercel.app
### Application Routes:
#### User
`/api/v1/auth/signup (POST)`

`/api/v1/auth/signin (POST)`

`/api/v1/users (GET)`

`/api/v1/users/8208252e-4f76-4d70-8b6b-082fb6984325 (Single GET)`

`/api/v1/users/8208252e-4f76-4d70-8b6b-082fb6984325 (PATCH)`

`/api/v1/users/8208252e-4f76-4d70-8b6b-082fb6984325 (DELETE)`

`/api/v1/profile (GET)`

#### Category

`/api/v1/categories/create-category (POST)`

`/api/v1/categories (GET)`

`/api/v1/categories/0e221c4d-7de4-4d49-8b9f-df3bb60fc665 (Single GET)`

`/api/v1/categories/0e221c4d-7de4-4d49-8b9f-df3bb60fc665 (PATCH)`

`/api/v1/categories/0e221c4d-7de4-4d49-8b9f-df3bb60fc665 (DELETE)`

#### Books

`/api/v1/books/create-book (POST)`

`/api/v1/books (GET)`

`/api/v1/books/6edf0834-2cf3-4beb-bac4-982f5ad5b499/category (GET)`

`/api/v1/books/8db98b6c-fd75-41cc-9d48-ddd5548b8945 (GET)`

`/api/v1/books/8db98b6c-fd75-41cc-9d48-ddd5548b8945 (PATCH)`

`/api/v1/books/8db98b6c-fd75-41cc-9d48-ddd5548b8945 (DELETE)`

#### Orders

`/api/v1/orders/create-order (POST)`

`/api/v1/orders (GET)`

`/api/v1/orders/11371ba6-ed79-40fb-8fb6-7182b56d6129 (GET)`

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

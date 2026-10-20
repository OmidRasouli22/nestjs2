# NestJS Users and Blogs API

A REST API with NestJS, TypeORM and PostgreSQL. I made it to practise
TypeORM relations in NestJS.

## What it has

- **Users:** create, list, search by name, edit, delete
- **Profiles:** one profile per user (one-to-one)
- **Blogs:** each user can have many blog posts (one-to-many)
- **Pagination:** `GET /user/pagination?page=1&limit=10`
- Input checks with `class-validator` DTOs

## Endpoints

| Method | Path | What it does |
|---|---|---|
| POST | `/user` | Create a user |
| GET | `/user?search=` | List users, optional search |
| GET | `/user/pagination` | Users page by page |
| GET | `/user/:id` | One user |
| PATCH | `/user/:id` | Edit a user |
| DELETE | `/user/:id` | Delete a user |
| POST | `/user/profile/:userId` | Add a profile to a user |
| GET | `/user/profile/:userId` | Get a user's profile |
| GET | `/user/blogs/:userId` | All blogs of a user |
| POST | `/blog` | Create a blog post |
| GET | `/blog` | List blog posts |
| GET | `/blog/:id` | One blog post |
| DELETE | `/blog/:id` | Delete a blog post |

## Running it

You need Node.js and PostgreSQL.

```
npm install
export DB_PASSWORD=your_password
npm run start:dev
```

`DB_HOST`, `DB_PORT`, `DB_USER` and `DB_NAME` can also be set. Without
them it uses `localhost:5432`, user `postgres` and database `typeorm`.
Tables are created automatically on start.

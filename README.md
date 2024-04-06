# NestJS Authentication

## Description

NestJS Authentication without Passport using Bcrypt, JWT and Redis

## Features

1. Register
2. Login
3. Show profile
4. Logout

## Technologies stack:

- JWT
- Bcrypt
- TypeORM + PostgreSQL
- Redis
- Docker

## Setup

### 1. Install the required dependencies

```bash
$ yarn install
```

### 2. Rename the .env.example filename to .env and set your local variables

```bash
$ cp .env.example .env
```

### 3. Start the application

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn start:prod
```

## Docker for development

```bash
# start the application
$ yarn docker:up

# stop the application
$ yarn docker:down
```

## Swagger documentation

- [localhost:8000/docs](http://localhost:8000/docs)

## Generate JWT Secret

```sh
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

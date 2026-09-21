# OpenBy

OpenBy is a mobile app that helps people track products after opening them and know how long they remain usable.

Users can scan a product's barcode, record when it was opened, and receive reminders based on its recommended lifetime after opening. Personal inventory is stored locally and does not require an account.

## Core Ideas

- Barcode-first product entry
- Clear expiration tracking
- Local-first personal data
- Timely reminders
- A trusted shared product catalog

## Project Status

OpenBy is in the early stages of development.

## Run locally

This repository contains the Expo mobile app, a NestJS API, and a PostgreSQL database. Run the following commands from the repository root.

### Prerequisites

Install Node.js, pnpm, and Docker. To run the mobile app, use an Android emulator, an iOS simulator, or a device supported by Expo.

### Setup

1. Install the workspace dependencies:

    ```bash
    pnpm install
    ```

2. Copy `apps/api/.env.example` to `apps/api/.env`. Set `DATABASE_URL` and the PostgreSQL variables for your local database.

3. Generate a secret with `openssl rand -base64 32` and assign it to `BETTER_AUTH_SECRET` in `apps/api/.env`. Set `BETTER_AUTH_URL` to the API origin (`http://localhost:3000` with the default port). Do not append `/api/auth` to this URL.

4. Start PostgreSQL and apply the database migrations:

    ```bash
    pnpm db:up
    pnpm --filter @open-by/api db:migrate
    ```

5. Start the API and mobile app:

    ```bash
    pnpm dev
    ```

    To run them separately, use `pnpm dev:api` and `pnpm dev:mobile`.
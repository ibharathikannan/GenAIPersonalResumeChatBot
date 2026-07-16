# Bharathikannan Ilanchezhiyan — Portfolio & AI Assistant

A personal portfolio site built on Angular 18, with a landing page (profile, skills, services) driven by local JSON fixtures and a floating chat widget backed by an AI assistant.

## Stack

- **Frontend:** Angular 18, Angular Material, NgRx, SCSS
- **Data:** `src/assets/data/*.json` for now (profile/skills/services); the same shape will later be served from MongoDB, with images hosted in blob storage
- **Chat:** session-scoped conversation history (`sessionStorage`), calls out to a FastAPI backend (planned) via `environment.chatApiUrl`

The `register`/`booking`/`survey`/`summary`/`booking-detail`/`thankyou` flow is inherited from the original booking-system template this project was built from, and is kept working but not linked from the main navigation.

## Getting started

```bash
npm install
npm start          # ng serve --open, http://localhost:4200
```

## Build

```bash
npm run build:dev    # -> src/environments/environment.dev.ts
npm run build:stg    # -> src/environments/environment.stg.ts
npm run build:prod   # -> src/environments/environment.prod.ts
```

## Test & lint

```bash
npm test    # lint + karma unit tests
npm run lint
```

## Editing site content

- `src/assets/data/profile.json` — name, title, tagline, contact info, nav/footer links, social links
- `src/assets/data/skills.json` — skill tiles (`iconUrl` points at `src/assets/icons/skills/*.svg` today; swap for a blob-storage URL later with no code changes)
- `src/assets/data/services.json` — service tiles, same `iconUrl` convention

## Deployment

Deployed via GitHub Actions to Azure Web Apps — see `.github/workflows/`.

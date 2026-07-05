# Adrenalink

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/a126cb5f-b7f7-4b6b-9aab-416f9e32215c" />

A full-stack web application for discovering and booking extremesports lessons — surfing, snowboarding, climbing, windsurfing, and kitesurfing etc. Users can search for lessons by location and date, explore schools on an interactive map, view available time slots, create bookings and rate their experiences.

> **Academic & Industry Context:** This project serves as the final examination project for a backend web development course, while simultaneously being a real-world client product currently under active development.

---

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [Database Schema](#database-schema)
- [API Reference](#api-reference)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Scripts](#scripts)

---

## Overview

Adrenalink connects extremesports enthusiasts with certified instructors and schools. The platform targets a European market, allowing users to filter lessons by country, location, sport type and date availability — all displayed on an interactive map powered by MapLibre GL.

The project is built as a monorepo with a decoupled client/server architecture:

- **Client** — React SPA (Single Page Application) with TypeScript
- **Server** — RESTful API built with Express and Prisma ORM connected to a MySQL database

---

## Tech Stack

### Frontend

| Technology                 | Purpose                                   |
| -------------------------- | ----------------------------------------- |
| React 19                   | UI component library                      |
| TypeScript                 | Static typing                             |
| Vite                       | Build tool and dev server                 |
| React Router v7            | Client-side routing                       |
| SASS                       | Component and global styling              |
| MapLibre GL + React Map GL | Interactive geospatial map                |
| React Context API          | Global state management (auth, favorites) |

### Backend

| Technology            | Purpose                  |
| --------------------- | ------------------------ |
| Node.js + Express 5   | HTTP server and REST API |
| TypeScript            | Static typing            |
| Prisma ORM            | Database access layer    |
| MySQL                 | Relational database      |
| JSON Web Tokens (JWT) | Stateless authentication |
| bcrypt                | Secure password hashing  |
| Nodemon + tsx         | Development auto-reload  |

---

## Features

### User-Facing

- **Search & Filter** — Filter lessons by country, city/beach, and date range
- **Explore Page** — Tabbed interface for browsing Activities, Schools, and Rentals
- **Interactive Map** — Geolocation-based markers for schools and lesson spots
- **Booking Flow** — Calendar date picker and time slot selector per lesson
- **School Profiles** — Detailed school pages with lesson offerings and ratings
- **Star Ratings** — Users can rate schools on a 1–5 scale (one rating per school)
- **Favorites** — Bookmark lessons and schools for later
- **Authentication** — Secure register and login with JWT tokens
- **Protected Routes** — Route guards that require authentication for booking

### Technical Highlights

- Full TypeScript coverage across both client and server
- Prisma migrations for version-controlled schema changes
- Seed script with realistic test data for development
- Geocoding utility using the Nominatim / OpenStreetMap API
- Responsive design with SCSS breakpoint system
- Graceful server shutdown handling (SIGINT/SIGTERM)

---

## Architecture

```
adrenalink/
├── client/          # React + TypeScript SPA
└── Server/          # Express + Prisma REST API
```

### Frontend Architecture

The client uses a feature-based structure with a clear separation between pages, components, hooks, and context:

- **Pages** render the full view for each route
- **Components** are reusable UI building blocks (cards, map, searchbar, pickers)
- **Hooks** encapsulate data fetching and form logic
- **Context + Providers** manage global state (authentication status, favorites list)

### Backend Architecture

The server follows a layered MVC-inspired pattern:

- **Routes** define URL endpoints and delegate to controllers
- **Controllers** contain the request handling and business logic
- **Prisma Client** acts as the data access layer (replaces a traditional model layer)
- **Utils** provide helper functionality (geocoding)

### Data Flow — Search to Booking

```
User enters search (location + date)
        ↓
GET /api/explore?country=...&location=...&dateFrom=...&dateTo=...
        ↓
Backend filters lessons by availability within the date range
        ↓
Results rendered as cards + map markers
        ↓
User selects lesson → navigates to /booking/:lessonId
        ↓
GET /api/slots/lesson/:lessonId (fetches available time slots)
        ↓
User picks date + time → confirms booking
```

---

## Project Structure

### Client

```
client/src/
├── App.tsx                     # Root component with all route definitions
├── main.tsx                    # React DOM entry point
├── types/
│   └── types.ts                # Shared TypeScript types (School, Lesson, AvailableTimeSlot, ...)
├── pages/
│   ├── landingpage/            # Home / hero page
│   ├── login/                  # Login form
│   ├── register/               # Registration form
│   ├── explore/                # Main search and browse page
│   ├── booking/                # Lesson detail + booking flow
│   ├── school/                 # School profile page
│   └── rental/                 # Rental location page
├── components/
│   ├── navigation/             # Top nav and explore tab nav
│   ├── cards/                  # Lesson cards and booking card subcomponents
│   ├── searchbar/              # Search input with dropdowns (location, calendar)
│   ├── map/                    # DiscoveryMap with MapLibre markers
│   ├── buttons/                # CTA button, FavoriteButton
│   ├── hero/                   # Hero section
│   ├── rating/                 # StarRating component
│   ├── Icon.tsx                # SVG icon wrapper
│   └── ProtectedRoute.tsx      # Auth guard for private routes
├── context/                    # Auth and Favorites contexts and providers
├── hooks/                      # useAuth, useLogin, useRegister, useSearch, useFavorites, ...
├── utils/
│   └── CalendarUtils.ts        # Calendar rendering helpers
├── assets/
│   ├── icons/                  # SVG icons (logo, pins, UI icons)
│   └── images/
└── styles/
    ├── global.scss
    ├── _variables.scss
    └── _breakpoints.scss
```

### Server

```
Server/src/
├── server.ts                   # Entry point — starts HTTP server
├── app.ts                      # Express app setup, middleware, route mounting
├── config/
│   └── db.ts                   # Prisma client initialization
├── controllers/
│   ├── authController.ts       # Register and login logic
│   ├── exploreController.ts    # Filtered lesson search
│   ├── schoolController.ts     # School listings with ratings
│   ├── slotController.ts       # Time slot queries
│   └── ratingController.ts     # School rating read/write
├── routes/
│   ├── authRoutes.ts
│   ├── exploreRoutes.ts
│   ├── schoolRoutes.ts
│   ├── slotRoutes.ts
│   └── ratingRoutes.ts
├── utils/
│   └── geocoding.ts            # Nominatim geocoding helper
└── prisma/
    ├── schema.prisma           # Database schema
    ├── seed.ts                 # Seed script for development data
    └── migrations/             # Prisma migration history
```

---

## Database Schema

Five core models managed with Prisma and MySQL:

### User

Stores registered users with hashed passwords and role-based access.

| Field                           | Type   | Notes                        |
| ------------------------------- | ------ | ---------------------------- |
| id                              | UUID   | Primary key                  |
| email                           | String | Unique                       |
| password                        | String | bcrypt hashed                |
| firstName, lastName             | String |                              |
| passportNumber                  | String | Unique                       |
| address, zipCode, city, country | String |                              |
| phoneCode, phoneNumber          | String |                              |
| role                            | Enum   | STUDENT / INSTRUCTOR / ADMIN |

### School

Represents a surf or watersports school with geolocation.

| Field                        | Type   | Notes           |
| ---------------------------- | ------ | --------------- |
| id                           | UUID   | Primary key     |
| name, country, city, address | String |                 |
| lat, lng                     | Float  | Map coordinates |

### Lesson

An individual lesson offering associated with a school.

| Field             | Type    | Notes                              |
| ----------------- | ------- | ---------------------------------- |
| id                | UUID    | Primary key                        |
| schoolId          | FK      | References School                  |
| lessonType        | String  | group / private                    |
| sportType         | String  | surf / windsurf / kitesurf         |
| level             | String  | beginner / intermediate / advanced |
| durationHours     | Float   |                                    |
| price             | Float   |                                    |
| equipmentIncluded | Boolean |                                    |
| lat, lng          | Float   | Exact lesson location              |

### AvailableTime

Bookable time slots for a lesson.

| Field     | Type     | Notes             |
| --------- | -------- | ----------------- |
| id        | UUID     | Primary key       |
| lessonId  | FK       | References Lesson |
| startTime | DateTime |                   |
| isBooked  | Boolean  | Default false     |

### Rating

User ratings for schools, with a unique constraint per user/school pair.

| Field    | Type | Notes             |
| -------- | ---- | ----------------- |
| id       | UUID | Primary key       |
| schoolId | FK   | References School |
| userId   | FK   | References User   |
| score    | Int  | 1–5               |

---

## API Reference

Base URL: `http://localhost:3000`

### Authentication

| Method | Endpoint             | Description                  | Auth Required |
| ------ | -------------------- | ---------------------------- | ------------- |
| POST   | `/api/auth/register` | Create a new user account    | No            |
| POST   | `/api/auth/login`    | Authenticate and receive JWT | No            |

### Explore / Lessons

| Method | Endpoint       | Description               | Auth Required |
| ------ | -------------- | ------------------------- | ------------- |
| GET    | `/api/explore` | Search lessons by filters | No            |

**Query parameters for `/api/explore`:**

| Parameter  | Type     | Description                  |
| ---------- | -------- | ---------------------------- |
| `country`  | string   | Filter by country            |
| `location` | string   | Filter by city or beach      |
| `dateFrom` | ISO date | Start of availability window |
| `dateTo`   | ISO date | End of availability window   |

### Schools

| Method | Endpoint       | Description                                | Auth Required |
| ------ | -------------- | ------------------------------------------ | ------------- |
| GET    | `/api/schools` | List schools, optionally filter by country | No            |

### Time Slots

| Method | Endpoint                      | Description                                        | Auth Required |
| ------ | ----------------------------- | -------------------------------------------------- | ------------- |
| GET    | `/api/slots/lesson/:lessonId` | Get lesson with all available slots                | No            |
| GET    | `/api/slots/:id`              | Get a specific slot with lesson and school details | No            |
| GET    | `/api/slots?lessonId=X`       | Get available slots for a lesson                   | No            |

### Ratings

| Method | Endpoint                         | Description                  | Auth Required |
| ------ | -------------------------------- | ---------------------------- | ------------- |
| GET    | `/api/ratings/schools/:schoolId` | Get average rating and count | No            |
| POST   | `/api/ratings/schools/:schoolId` | Submit or update a rating    | Yes (JWT)     |

---

## Getting Started

### Prerequisites

- Node.js v18+
- MySQL database
- npm or yarn

### 1. Clone the repository

```bash
git clone <repository-url>
cd adrenalink
```

### 2. Install dependencies

```bash
# Install server dependencies
cd Server
npm install

# Install client dependencies
cd ../client
npm install
```

### 3. Configure environment variables

Create a `.env` file in the `Server/` directory. See [Environment Variables](#environment-variables) for required keys.

### 4. Set up the database

```bash
cd Server

# Run Prisma migrations to create the schema
npx prisma migrate dev

# (Optional) Seed the database with sample data
npx prisma db seed
```

### 5. Start the development servers

```bash
# Terminal 1 — Start the API server
cd Server
npm run dev

# Terminal 2 — Start the frontend dev server
cd client
npm run dev
```

The frontend will be available at `http://localhost:5173` and the API at `http://localhost:3000`.

---

## Environment Variables

The server requires a `.env` file in the `Server/` directory. **Never commit this file to version control.**

| Variable       | Description                              |
| -------------- | ---------------------------------------- |
| `DATABASE_URL` | MySQL connection string for Prisma       |
| `JWT_SECRET`   | Secret key used to sign JWT tokens       |
| `PORT`         | (Optional) Server port, defaults to 3000 |

---

## Scripts

### Server (`Server/`)

| Command                  | Description                                                 |
| ------------------------ | ----------------------------------------------------------- |
| `npm run dev`            | Start the server with Nodemon (auto-reload on file changes) |
| `npm run build`          | Compile TypeScript to JavaScript                            |
| `npm start`              | Run the compiled server (production)                        |
| `npx prisma migrate dev` | Apply pending database migrations                           |
| `npx prisma db seed`     | Seed the database with sample data                          |
| `npx prisma studio`      | Open Prisma Studio (database GUI)                           |

### Client (`client/`)

| Command           | Description                          |
| ----------------- | ------------------------------------ |
| `npm run dev`     | Start the Vite development server    |
| `npm run build`   | Build for production                 |
| `npm run preview` | Preview the production build locally |
| `npm run lint`    | Run ESLint                           |

---

## Course Context

This project was developed as the final examination project for a **backend web development course**, demonstrating:

- Design and implementation of a RESTful API with Express and TypeScript
- Relational database modeling and ORM usage with Prisma and MySQL
- Secure user authentication using JWT and bcrypt
- Clean separation of concerns via a controller/route architecture
- Database migration workflow and seed data management

The project simultaneously operates as a real client product, meaning technical decisions balance academic requirements with practical production considerations.

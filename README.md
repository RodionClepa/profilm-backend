# ProFilm Project

A full-stack web application for browsing and watching films, built with Angular (frontend) and Node.js/Express (backend).

## Project Structure

This project is divided into two separate repositories:

- **Frontend**: Angular application [profilm-frontend](https://github.com/RodionClepa/profilm-frontend)
- **Backend**: Node.js/Express API [profilm-backend](https://github.com/RodionClepa/profilm-backend)

## Prerequisites

- [Node.js](https://nodejs.org/) ( ^18.19.1 || ^20.11.1 || ^22.0.0)
- [npm](https://www.npmjs.com/)
- [Angular CLI](https://angular.dev/installation)
- [Docker](https://www.docker.com/) and Docker Compose
- [Git](https://git-scm.com/)
- [Postgres](https://www.postgresql.org/download/)
- [TheMovieDB - Api Key](https://developer.themoviedb.org/reference/intro/getting-started)

## Getting Started

### Clone the Repositories

```bash
# Clone frontend repository
git clone https://github.com/RodionClepa/profilm-frontend.git

# Clone backend repository
git clone https://github.com/RodionClepa/profilm-backend.git
```

### Backend Setup

1. Navigate to the backend directory:

   ```bash
   cd profilm-backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with the following content:

   ```
   POSTGRES_USER=postgres
   POSTGRES_PASSWORD=postgres
   POSTGRES_DB=profilm
   POSTGRES_PORT=5433
   PORT=3000
   CORS_ORIGIN=http://localhost:4200
   ACCESS_TOKEN_MOVIES=your_themoviedb_api_key
   ```

   > **Note:** Replace `your_themoviedb_api_key` with your actual API key from [TheMovieDB](https://developer.themoviedb.org/reference/intro/getting-started).

4. Start the PostgreSQL database with Docker:

   ```bash
   docker-compose up -d
   ```

5. Start the backend development server:
   ```bash
   npm run serve
   ```
   This will start the Node.js server in development mode with auto-reloading on port 3000.

### Frontend Setup

1. Navigate to the frontend directory:

   ```bash
   cd profilm-frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the Angular development server:
   ```bash
   npm start
   ```
   The frontend application will be available at http://localhost:4200, with API requests proxied to the backend server.

## Development

### Backend

- The backend is built with Node.js and Express using TypeScript
- PostgreSQL is used as the database, managed via Sequelize ORM
- API requests to TheMovieDB are handled through Axios

**Key scripts:**

- `npm run serve` - Start development server with auto-reloading
- `npm run build` - Build the TypeScript project
- `npm start` - Build and start the production server

### Frontend

- The frontend is built with Angular 19
- Swiper library for carousel components

**Key scripts:**

- `npm start` - Start development server
- `npm run build` - Build the application
- `npm run build:prod` - Build the application for production

## API Configuration

The frontend is configured to communicate with the backend API through a proxy configuration:

- Development API URL: `http://localhost:3000`
- The Angular application uses a proxy configuration to redirect API requests to the backend server

## Docker Setup

The project uses Docker for running the PostgreSQL database:

```yaml
services:
  postgres:
    image: postgres:17
    container_name: profilm_db
    restart: always
    environment:
      POSTGRES_USER: ${POSTGRES_USER}
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
      POSTGRES_DB: ${POSTGRES_DB}
    volumes:
      - profilm_db:/var/lib/postgresql/data
    ports:
      - "5433:5432"
volumes:
  profilm_db:
    driver: local
```

## Production Deployment

### Backend Build and Deployment

1. Build the backend for production:

   ```bash
   npm run build
   ```

2. Start the production server:
   ```bash
   npm start
   ```

### Frontend Build and Deployment

1. Build the frontend for production:

   ```bash
   npm run build:prod
   ```

2. The built files will be in the `dist/profilm-front` directory, which can be deployed to a web server.

## Environment Configuration

### Backend (.env)

- `POSTGRES_USER`: PostgreSQL username
- `POSTGRES_PASSWORD`: PostgreSQL password
- `POSTGRES_DB`: Database name
- `POSTGRES_PORT`: PostgreSQL port (default: 5433)
- `PORT`: Backend server port (default: 3000)
- `CORS_ORIGIN`: Allowed CORS origin (default: http://localhost:4200)
- `ACCESS_TOKEN_MOVIES`: TheMovieDB API key

### Frontend (environment.development.ts)

```typescript
export const environment = {
  apiUrl: "http://localhost:3000",
  production: false,
};
```

### API STUFF

Release Type aka with_release_type

- Premiere -1
- Theatrical (limited) -2
- Theatrical -3
- Digital -4
- Physical -5
- TV -6

```json
{
  "images": {
    "base_url": "http://image.tmdb.org/t/p/",
    "secure_base_url": "https://image.tmdb.org/t/p/",
    "backdrop_sizes": ["w300", "w780", "w1280", "original"],
    "logo_sizes": ["w45", "w92", "w154", "w185", "w300", "w500", "original"],
    "poster_sizes": ["w92", "w154", "w185", "w342", "w500", "w780", "original"],
    "profile_sizes": ["w45", "w185", "h632", "original"],
    "still_sizes": ["w92", "w185", "w300", "original"]
  }
}
```

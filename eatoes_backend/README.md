# Eatoes Backend

This is the backend service for the Eatoes application.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the root directory with the following variables:
```
PORT=3000
NODE_ENV=development
```

3. Start the development server:
```bash
npm run dev
```

4. For production:
```bash
npm start
```

## Project Structure

```
src/
  ├── index.js          # Main application entry point
  ├── routes/           # API routes
  ├── controllers/      # Route controllers
  ├── models/           # Database models
  ├── middleware/       # Custom middleware
  └── utils/            # Utility functions
```

## Available Scripts

- `npm start` - Start the production server
- `npm run dev` - Start the development server with hot reload
- `npm test` - Run tests

## API Documentation

The API documentation will be available at `/api-docs` when the server is running. 
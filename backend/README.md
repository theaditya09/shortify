# Shortify Backend

A high-performance URL shortener backend built with Cloudflare Workers, Hono framework, and Prisma. Features serverless architecture, edge computing, and PostgreSQL database integration via Prisma Accelerate.

## 🚀 Features

- **Serverless Architecture**: Deployed on Cloudflare Workers for global edge deployment
- **Fast API**: Built with Hono framework for high performance
- **Database Integration**: PostgreSQL via Prisma with Accelerate for connection pooling
- **URL Shortening**: Generate short URLs with optional custom aliases
- **URL Redirection**: Automatic redirection with click tracking
- **CORS Enabled**: Configured for cross-origin requests
- **Type-Safe**: Full TypeScript support

## 🛠️ Tech Stack

- **Cloudflare Workers** - Serverless edge computing platform
- **Hono** - Fast web framework for the edge
- **Prisma** - Next-generation ORM
- **Prisma Accelerate** - Connection pooling and caching layer
- **PostgreSQL** - Relational database
- **Nanoid** - URL-safe unique ID generator
- **TypeScript** - Type safety

## 📦 Prerequisites

- Node.js 18+ or Bun
- Cloudflare account
- Wrangler CLI installed globally or via npx
- PostgreSQL database (managed via Prisma)

## 🔧 Installation

```bash
# Install dependencies
npm install
# or
bun install
```

## 🗄️ Database Setup

1. **Prisma Schema**: The database schema is defined in `prisma/schema.prisma`

2. **Generate Prisma Client**:
   ```bash
   npx prisma generate
   ```

3. **Run Migrations** (if needed):
   ```bash
   npx prisma migrate dev
   ```

## ⚙️ Configuration

### Environment Variables

Configure your environment variables in `wrangler.jsonc` or via Cloudflare dashboard:

- **ACCELERATE_URL**: Prisma Accelerate connection string
- **DATABASE_URL**: PostgreSQL connection string

**Note**: For production, it's recommended to use Cloudflare Workers secrets instead of hardcoding in `wrangler.jsonc`:

```bash
# Set secrets for production
wrangler secret put ACCELERATE_URL
wrangler secret put DATABASE_URL
```

## 🚀 Development

```bash
# Start local development server
npm run dev
# or
wrangler dev
```

The development server will start and you can test your Worker locally. It will use the environment variables from `wrangler.jsonc`.

## 📡 API Endpoints

### 1. Shorten URL

Create a short URL from a long URL.

**Endpoint**: `POST /api/v1/shorten`

**Request Body**:
```json
{
  "longUrl": "https://example.com/very/long/url",
  "customAlias": "my-short-link" // optional
}
```

**Response** (200):
```json
{
  "message": "URL shortened successfully",
  "shortId": "abc123",
  "originalUrl": "https://example.com/very/long/url"
}
```

**Error Response** (400):
```json
{
  "message": "Invalid URL",
  "error": "Validation error details"
}
```

### 2. Redirect Short URL

Redirect to the original URL using the short code.

**Endpoint**: `GET /{shortCode}`

**Response**:
- **302 Redirect**: Redirects to the original URL
- **404**: Short code not found or expired

### 3. Test Endpoint

Health check endpoint.

**Endpoint**: `GET /test`

**Response** (200):
```json
{
  "message": "test request"
}
```

## 🏗️ Project Structure

```
backend/
├── src/
│   ├── controllers/       # Request handlers
│   │   ├── createHandler.ts
│   │   └── redirectHandler.ts
│   ├── routes/            # Route definitions
│   │   ├── index.ts       # API v1 routes
│   │   ├── create.ts      # Shorten endpoint
│   │   └── redirect.ts    # Redirect endpoint
│   ├── db/                # Database utilities
│   │   └── index.ts
│   └── index.ts           # Main entry point
├── prisma/
│   ├── schema.prisma      # Database schema
│   └── migrations/        # Database migrations
├── wrangler.jsonc         # Cloudflare Workers configuration
└── package.json
```

## 🗄️ Database Schema

The `Url` model stores shortened URLs:

```prisma
model Url {
  id          String   @id @default(cuid())
  shortCode   String   @unique
  longUrl     String
  createdAt   DateTime @default(now())
  expiresAt   DateTime?
  clicks      Int      @default(0)
  lastClickedAt DateTime?
}
```

## 🚀 Deployment

### Deploy to Cloudflare Workers

```bash
# Deploy to production
npm run deploy
# or
wrangler deploy --minify
```

### Environment Setup for Production

1. **Set Secrets** (recommended):
   ```bash
   wrangler secret put ACCELERATE_URL
   wrangler secret put DATABASE_URL
   ```

2. **Or use wrangler.jsonc** (for development/testing):
   - Add your credentials to the `vars` section in `wrangler.jsonc`

3. **Deploy**:
   ```bash
   wrangler deploy
   ```

After deployment, you'll receive a URL like:
```
https://backend.<your-subdomain>.workers.dev
```

## 🔐 Security Considerations

- **CORS**: Currently configured to allow all origins (`origin: '*'`). For production, consider restricting this to your frontend domain.
- **Secrets**: Never commit sensitive credentials to version control. Use Wrangler secrets for production.
- **Input Validation**: All inputs are validated using Zod schemas from `@swekandrew/shortify-schemas`.

## 📝 Scripts

- `npm run dev` - Start local development server
- `npm run deploy` - Deploy to Cloudflare Workers (production)
- `npm run cf-typegen` - Generate TypeScript types from Cloudflare bindings

## 🧪 Testing

You can test the API using curl or any HTTP client:

```bash
# Test shorten endpoint
curl -X POST https://your-worker.workers.dev/api/v1/shorten \
  -H "Content-Type: application/json" \
  -d '{"longUrl": "https://example.com"}'

# Test redirect (should redirect to original URL)
curl -L https://your-worker.workers.dev/abc123

# Test endpoint
curl https://your-worker.workers.dev/test
```

## 🔧 Type Generation

Generate TypeScript types for Cloudflare bindings:

```bash
npm run cf-typegen
```

This creates types based on your Worker configuration that can be used for type-safe access to environment variables and bindings.

## 🐛 Troubleshooting

### Database Connection Issues

- Verify your `ACCELERATE_URL` or `DATABASE_URL` is correct
- Check that Prisma Accelerate is properly configured
- Ensure your database is accessible from Cloudflare's network

### Deployment Issues

- Ensure Wrangler CLI is installed: `npm install -g wrangler` or use `npx`
- Check that you're logged in: `wrangler login`
- Verify your `wrangler.jsonc` configuration is valid

### CORS Errors

If you're experiencing CORS issues:
- Check the CORS configuration in `src/index.ts`
- Ensure your frontend domain is allowed (or use `origin: '*'` for development)

## 📊 Database Migrations

To create a new migration:

```bash
npx prisma migrate dev --name your_migration_name
```

To apply migrations in production:

```bash
npx prisma migrate deploy
```

**Note**: Since this uses Prisma Accelerate, migrations should be run separately from the Worker deployment.

## 🔄 How It Works

1. **Shorten Flow**:
   - Client sends POST request to `/api/v1/shorten` with long URL
   - Server generates a unique short code (nanoid or custom alias)
   - Stores mapping in database via Prisma
   - Returns short URL

2. **Redirect Flow**:
   - Client requests `/{shortCode}`
   - Server looks up short code in database
   - Increments click counter
   - Returns 302 redirect to original URL

## 📄 License

See the main project LICENSE file.

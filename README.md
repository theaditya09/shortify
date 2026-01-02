# Shortify

A modern, full-stack URL shortener application with a beautiful dark-themed UI and serverless backend architecture. Transform long URLs into short, shareable links with optional custom aliases.

## 🌟 Features

- **🔗 URL Shortening**: Convert long URLs into short, memorable links
- **🎨 Custom Aliases**: Create personalized short links with custom aliases
- **📊 Click Tracking**: Track clicks and analytics for shortened URLs
- **⚡ Serverless Backend**: Built on Cloudflare Workers for global edge deployment
- **🎯 Modern Frontend**: Beautiful React UI with glassmorphism effects and smooth animations
- **🔒 Type-Safe**: Full TypeScript support across the entire stack
- **🚀 Fast & Scalable**: Edge computing for low latency worldwide

## 🏗️ Architecture

Shortify follows a modern serverless architecture:

```
┌─────────────────┐
│   Frontend      │  React + Vite + TypeScript
│   (Vercel)      │  Deployed on Vercel
└────────┬────────┘
         │
         │ HTTP/REST API
         │
┌────────▼────────┐
│   Backend       │  Cloudflare Workers + Hono
│   (Workers)     │  Serverless edge functions
└────────┬────────┘
         │
         │ Prisma Accelerate
         │
┌────────▼────────┐
│   Database      │  PostgreSQL
│   (Prisma)      │  Managed via Prisma Accelerate
└─────────────────┘
```

### Components

- **Frontend**: React SPA deployed on Vercel
- **Backend**: Cloudflare Workers API with Hono framework
- **Database**: PostgreSQL with Prisma ORM and Accelerate connection pooling
- **Shared Schemas**: Common Zod validation schemas (`@swekandrew/shortify-schemas`)

## 📁 Project Structure

```
shortify/
├── frontend/              # React frontend application
│   ├── src/
│   │   ├── components/   # React components
│   │   ├── hooks/        # Custom React hooks
│   │   ├── lib/          # Utility functions
│   │   └── ...
│   ├── package.json
│   └── README.md         # Frontend documentation
│
├── backend/              # Cloudflare Workers backend
│   ├── src/
│   │   ├── controllers/  # Request handlers
│   │   ├── routes/       # API route definitions
│   │   ├── db/           # Database utilities
│   │   └── ...
│   ├── prisma/           # Database schema and migrations
│   ├── package.json
│   └── README.md         # Backend documentation
│
└── common/
    └── shortify-schemas/ # Shared Zod validation schemas
        ├── src/
        └── package.json
```

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18+ or **Bun**
- **Cloudflare account** (for backend deployment)
- **Vercel account** (for frontend deployment, or use any static hosting)
- **PostgreSQL database** (managed via Prisma)

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/shortify.git
cd shortify
```

### 2. Set Up Backend

```bash
cd backend

# Install dependencies
npm install
# or
bun install

# Generate Prisma client
npx prisma generate

# Configure environment variables in wrangler.jsonc
# Add your ACCELERATE_URL and DATABASE_URL

# Start development server
npm run dev
```

See [backend/README.md](./backend/README.md) for detailed backend setup.

### 3. Set Up Frontend

```bash
cd frontend

# Install dependencies
npm install
# or
bun install

# Create .env file
echo "VITE_API_URL=http://localhost:8787" > .env

# Start development server
npm run dev
```

See [frontend/README.md](./frontend/README.md) for detailed frontend setup.

### 4. Set Up Shared Schemas (if needed)

```bash
cd common/shortify-schemas

# Install dependencies
bun install

# Build the package
bun run build
```

## 🛠️ Development

### Running Locally

1. **Start Backend**:
   ```bash
   cd backend
   npm run dev
   ```
   Backend will run on `http://localhost:8787`

2. **Start Frontend**:
   ```bash
   cd frontend
   npm run dev
   ```
   Frontend will run on `http://localhost:5173`

3. **Configure Frontend**:
   - Ensure `VITE_API_URL` in frontend `.env` points to your backend URL
   - For local development: `VITE_API_URL=http://localhost:8787`

### Development Workflow

1. Make changes to the codebase
2. Backend changes are hot-reloaded automatically
3. Frontend changes are hot-reloaded via Vite HMR
4. Test your changes locally
5. Commit and push to trigger deployments

## 🚀 Deployment

### Backend Deployment (Cloudflare Workers)

```bash
cd backend

# Set production secrets
wrangler secret put ACCELERATE_URL
wrangler secret put DATABASE_URL

# Deploy
npm run deploy
```

After deployment, you'll receive a URL like:
```
https://backend.<your-subdomain>.workers.dev
```

### Frontend Deployment (Vercel)

1. **Connect Repository**:
   - Import your Git repository to Vercel
   - Set root directory to `frontend`

2. **Configure Environment Variables**:
   - Add `VITE_API_URL` with your Cloudflare Worker URL
   - Example: `https://backend.your-subdomain.workers.dev`

3. **Deploy**:
   - Vercel will automatically deploy on push
   - Or manually trigger deployment from dashboard

### Alternative Frontend Hosting

The frontend can be deployed to any static hosting service:
- **Netlify**: Similar to Vercel setup
- **Cloudflare Pages**: Static hosting on Cloudflare
- **GitHub Pages**: Free static hosting
- **AWS S3 + CloudFront**: Enterprise solution

## 📚 Documentation

- **[Frontend README](./frontend/README.md)**: Frontend setup, development, and deployment
- **[Backend README](./backend/README.md)**: Backend API documentation and deployment
- **[API Documentation](./backend/README.md#-api-endpoints)**: Complete API reference

## 🛠️ Tech Stack

### Frontend
- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS v4** - Styling
- **Radix UI** - Accessible components
- **Framer Motion** - Animations

### Backend
- **Cloudflare Workers** - Serverless runtime
- **Hono** - Web framework
- **Prisma** - ORM
- **Prisma Accelerate** - Connection pooling
- **PostgreSQL** - Database
- **Nanoid** - ID generation

### Shared
- **Zod** - Schema validation
- **TypeScript** - Type safety

## 🔌 API Endpoints

### Shorten URL
```http
POST /api/v1/shorten
Content-Type: application/json

{
  "longUrl": "https://example.com/very/long/url",
  "customAlias": "my-link" // optional
}
```

### Redirect
```http
GET /{shortCode}
```
Returns 302 redirect to original URL

### Health Check
```http
GET /test
```

See [backend/README.md](./backend/README.md) for complete API documentation.

## 🔐 Environment Variables

### Frontend
- `VITE_API_URL` - Backend API URL (required for production)

### Backend
- `ACCELERATE_URL` - Prisma Accelerate connection string
- `DATABASE_URL` - PostgreSQL connection string

**Note**: Never commit sensitive credentials. Use environment variables or secrets management.

## 📝 Scripts

### Backend
```bash
npm run dev      # Start development server
npm run deploy   # Deploy to Cloudflare Workers
npm run cf-typegen # Generate TypeScript types
```

### Frontend
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## 🧪 Testing

### Test Backend API

```bash
# Test shorten endpoint
curl -X POST http://localhost:8787/api/v1/shorten \
  -H "Content-Type: application/json" \
  -d '{"longUrl": "https://example.com"}'

# Test redirect
curl -L http://localhost:8787/abc123

# Test health check
curl http://localhost:8787/test
```

## 🐛 Troubleshooting

### Common Issues

**Frontend can't connect to backend**:
- Verify `VITE_API_URL` is set correctly
- Check that backend is running
- Verify CORS is configured in backend

**Backend database connection errors**:
- Verify `ACCELERATE_URL` or `DATABASE_URL` is correct
- Check Prisma Accelerate configuration
- Ensure database is accessible

**Build errors**:
- Run `npm install` in the respective directory
- Check TypeScript configuration
- Verify all environment variables are set

For more detailed troubleshooting, see individual README files:
- [Frontend Troubleshooting](./frontend/README.md#-troubleshooting)
- [Backend Troubleshooting](./backend/README.md#-troubleshooting)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Built with modern web technologies
- Inspired by clean, minimal design principles
- Powered by Cloudflare Workers and Vercel

## 📞 Support

For issues and questions:
- Open an issue on GitHub
- Check the documentation in individual README files
- Review API documentation in [backend/README.md](./backend/README.md)

---

**Made with ❤️ using React, Cloudflare Workers, and modern web technologies**


# Shortify Frontend

A modern, beautiful URL shortener frontend built with React, TypeScript, and Vite. Features a sleek dark-themed UI with animated effects, glassmorphism design, and smooth interactions.

## 🚀 Features

- **Modern UI/UX**: Dark-themed interface with glassmorphism effects
- **Animated Components**: Custom cursor effects and light ray animations
- **URL Shortening**: Create short links with optional custom aliases
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Type-Safe**: Built with TypeScript for better development experience
- **Fast Build**: Powered by Vite for lightning-fast development and builds

## 🛠️ Tech Stack

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS v4** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **Framer Motion** - Animation library
- **GSAP** - Advanced animations

## 📦 Installation

```bash
# Install dependencies
npm install
# or
bun install
```

## 🔧 Development

```bash
# Start development server
npm run dev
# or
bunx --bun vite
```

The development server will start at `http://localhost:5173` (or the next available port).

## 🏗️ Build

```bash
# Build for production
npm run build
```

The production build will be generated in the `dist` directory.

## 🧪 Preview Production Build

```bash
# Preview the production build locally
npm run preview
```

## 🔍 Linting

```bash
# Run ESLint
npm run lint
```

## 🌐 Environment Variables

Create a `.env` file in the root of the frontend directory:

```env
VITE_API_URL=https://your-backend-url.workers.dev
```

### Required Environment Variables

- **VITE_API_URL** (required for production): The URL of your backend API (Cloudflare Worker URL)

**Note**: In development, if `VITE_API_URL` is not set, it defaults to `http://localhost:8787`.

## 📁 Project Structure

```
frontend/
├── src/
│   ├── components/        # React components
│   │   ├── ui/           # Reusable UI components (Label, Input, etc.)
│   │   ├── UrlShortener.tsx
│   │   └── ...
│   ├── hooks/            # Custom React hooks
│   │   └── useShorten.tsx
│   ├── lib/              # Utility functions
│   │   └── utils.ts
│   ├── assets/           # Static assets (fonts, images, etc.)
│   ├── App.tsx           # Main app component
│   └── main.tsx          # Entry point
├── public/               # Public assets
├── vite.config.ts        # Vite configuration
├── tsconfig.json         # TypeScript configuration
├── vercel.json           # Vercel deployment configuration
└── package.json
```

## 🎨 Path Aliases

The project uses path aliases for cleaner imports:

```typescript
// Instead of
import { cn } from '../../lib/utils'

// You can use
import { cn } from '@/lib/utils'
```

Configured in:
- `vite.config.ts` - For Vite/build tool
- `tsconfig.app.json` - For TypeScript

## 🚀 Deployment

### Vercel (Recommended)

1. **Set Environment Variables**:
   - Go to your Vercel project settings
   - Navigate to **Environment Variables**
   - Add `VITE_API_URL` with your backend API URL

2. **Deploy**:
   - Push to your Git repository
   - Vercel will automatically detect and deploy

3. **Configuration**:
   - Root Directory: `frontend` (if deploying from monorepo)
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

The `vercel.json` file is already configured to handle SPA routing.

### Other Platforms

The built files in the `dist` directory can be deployed to any static hosting service:
- Netlify
- GitHub Pages
- Cloudflare Pages
- AWS S3 + CloudFront
- Any other static hosting provider

## 🔌 API Integration

The frontend communicates with the backend API through the `useShorten` hook:

- **Endpoint**: `${VITE_API_URL}/api/v1/shorten`
- **Method**: POST
- **Request Body**:
  ```json
  {
    "longUrl": "https://example.com",
    "customAlias": "optional-custom-alias"
  }
  ```

## 📝 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🎯 Key Components

- **UrlShortener**: Main component for URL shortening functionality
- **useShorten**: Custom hook for API communication and state management
- **LightRays**: Animated background light effects
- **TargetCursor**: Custom cursor with target tracking
- **ElectricBorder**: Animated border effects

## 🐛 Troubleshooting

### Build Errors

If you encounter TypeScript errors about missing modules:
- Ensure all dependencies are installed: `npm install`
- Check that path aliases are correctly configured in `tsconfig.app.json` and `vite.config.ts`

### API Connection Issues

- Verify `VITE_API_URL` is set correctly in your environment variables
- Check that your backend is running and accessible
- Review browser console for CORS or network errors

### Styling Issues

- Ensure Tailwind CSS is properly configured
- Check that custom fonts are loaded correctly
- Verify that all CSS files are imported in the main entry point

## 📄 License

See the main project LICENSE file.

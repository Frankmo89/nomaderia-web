# Nomadería Web

Plataforma web para Nomadería - Tu Arquitecto de Aventuras. Aplicación de planificación de viajes y aventuras con integración a Supabase.

## 🚀 Tech Stack

- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite 
- **Styling**: TailwindCSS
- **UI Components**: Radix UI + shadcn/ui
- **Animations**: Framer Motion
- **Forms**: React Hook Form + Zod
- **Backend**: Supabase
- **Routing**: React Router v6

## 📋 Prerequisites

- Node.js 18+ 
- pnpm 10.29.2 (specified in package.json via packageManager field)

## 🛠️ Installation

```bash
# Install pnpm globally if you don't have it
npm install -g pnpm

# Install dependencies
pnpm install

# Copy environment variables
cp .env.example .env
# Edit .env with your Supabase credentials
```

## 🏃‍♂️ Development

```bash
# Start development server
pnpm run dev

# Build for production
pnpm run build

# Preview production build
pnpm run preview

# Run linter
pnpm run lint
```

## 📁 Project Structure

```
src/
├── components/        # React components
│   ├── ui/           # Reusable UI components (shadcn/ui)
│   ├── admin/        # Admin dashboard components
│   └── ...           # Feature components
├── lib/              # Utilities and configurations
├── types/            # TypeScript type definitions
├── data/             # Static data and content
└── articles/         # Blog articles content
```

## 🔧 Configuration

- `vite.config.ts` - Vite build configuration with optimizations
- `tailwind.config.js` - Tailwind CSS configuration
- `tsconfig.json` - TypeScript configuration (strict mode enabled)
- `.eslintrc.cjs` - ESLint rules for code quality

## 🔐 Environment Variables

See `.env.example` for required environment variables.

## 📦 Build Optimizations

- Code splitting with React.lazy
- Manual chunk splitting for vendor libraries
- Tree-shaking for unused code
- Optimized dependencies bundling

## 🧪 Type Checking

```bash
# Run TypeScript compiler
tsc --noEmit
```

## 🚀 Deployment

This project uses pnpm as the package manager. The `packageManager` field in `package.json` ensures that Vercel and other deployment platforms use the correct version (pnpm@10.29.2).

### Vercel Deployment
- Vercel automatically detects the `packageManager` field and uses pnpm 10.29.2
- The `pnpm-lock.yaml` file is kept in sync with `package.json`
- Deployments use `--frozen-lockfile` to ensure consistent installations

## 🤝 Contributing

This is a private project for Nomadería.

## 📄 License

Private - All rights reserved

---

Made with ❤️ by Nomadería

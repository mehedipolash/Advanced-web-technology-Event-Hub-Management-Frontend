# EventHub

A modern event management platform built with **Next.js 14** and **TypeScript**, designed to streamline event discovery, registration, and management.

## 🚀 Key Features

- **⚡ High Performance**: Leveraging Next.js 14 with App Router for optimal speed and SEO
- **🔒 Type Safety**: Full TypeScript implementation for robust development
- **🎨 Modern Styling**: PostCSS with advanced CSS features and responsive design
- **📱 Mobile-First**: Fully responsive across all device sizes
- **🔍 SEO Optimized**: Built-in SEO enhancements and metadata management
- **♿ Accessibility**: WCAG compliant with focus on inclusive design
- **📦 Production Ready**: Optimized builds and performance monitoring

## 🏗️ Architecture

```
eventhub/
├── app/                    # App Router directory
│   ├── (auth)/            # Authentication route group
│   ├── (dashboard)/       # Dashboard route group
│   ├── api/               # API routes
│   ├── events/            # Event pages and components
│   └── globals.css        # Global styles
├── components/            # Reusable UI components
│   ├── ui/               # Base UI components
│   ├── forms/            # Form components
│   └── layout/           # Layout components
├── lib/                  # Utility libraries
│   ├── utils/           # Helper functions
│   ├── validations/     # Form validations
│   └── constants/       # App constants
├── public/              # Static assets
│   ├── images/         # Image resources
│   └── icons/          # Icon assets
├── types/              # TypeScript type definitions
└── config/             # Configuration files
```

## 🛠️ Technology Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: PostCSS with Modern CSS
- **Code Quality**: ESLint + Prettier
- **Package Manager**: npm
- **Deployment**: Vercel (optimized)

## 📋 Prerequisites

- Node.js 18.17 or later
- npm 9.0 or later

## ⚙️ Installation & Setup

### 1. Clone Repository
```bash
git clone https://github.com/your-organization/eventhub.git
cd eventhub
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Configuration
```bash
cp .env.example .env.local
```
Configure environment variables in `.env.local` for your deployment environment.

## 🚀 Development

### Start Development Server
```bash
npm run dev
```
Access the application at `http://localhost:3000`

### Build for Production
```bash
npm run build
```

### Start Production Server
```bash
npm start
```

### Run Linting
```bash
npm run lint
```

### Fix Linting Issues
```bash
npm run lint:fix
```

## 📁 Project Structure Details

### `/app`
- Utilizes Next.js 14 App Router for file-based routing
- Contains layout, page, and loading components
- Implements React Server Components where applicable

### `/components`
- Modular component architecture
- Strict TypeScript prop definitions
- Comprehensive component documentation

### `/lib`
- Utility functions and helpers
- Validation schemas
- Application constants and configuration

## 🎯 Scripts Overview

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Create optimized production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint analysis |
| `npm run lint:fix` | Automatically fix linting issues |
| `npm run type-check` | Validate TypeScript types |

## 🔧 Configuration

### Next.js Configuration (`next.config.ts`)
- Optimized bundle splitting
- Image optimization settings
- Security headers configuration

### TypeScript (`tsconfig.json`)
- Strict type checking enabled
- Path aliases for clean imports
- Modern ECMAScript features

### PostCSS (`postcss.config.mjs`)
- Advanced CSS processing
- Autoprefixer configuration
- CSS optimization plugins

## 📊 Performance

- Lighthouse score > 90
- Core Web Vitals optimized
- Bundle size monitoring
- Image optimization pipeline

## 🤝 Contributing

Please read our [Contributing Guidelines](CONTRIBUTING.md) before submitting pull requests. We welcome issues and feature requests in our GitHub repository.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- 📧 Email: polashmehedi33@gmail.com
- 🐛 Profile: [](https://github.com/mehedipolash))


---

**EventHub** – Modern Event Management Simplified

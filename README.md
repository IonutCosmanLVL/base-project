# 🏠 Ares Residence – Presentation Website

A high-performance presentation website built with **Next.js**, **TypeScript**, **TailwindCSS**, and powered by **Contentful** as a headless CMS. Designed to be fast, scalable, and easily editable by content teams.

---

## ✨ Features

- ⚡️ Next.js 14 App Router
- 🔤 TypeScript support
- 🎨 TailwindCSS for utility-first styling
- 📦 SCSS support for custom styling layers
- 🌐 Contentful integration for dynamic content
- 🧠 Clean and modular file structure
- 🖼 Image optimization (Next/Image)
- 🧭 Accessible, SEO-ready navigation

---

## 🛠 Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/your-project-name.git
cd your-project-name
```
### 2. Install Dependencies
```bash
npm install
# or
yarn install
```

### 3. Environment Variables
```bash
Create a .env.local file in the root and add your Contentful credentials:
CONTENTFUL_SPACE_ID=your_space_id
CONTENTFUL_ACCESS_TOKEN=your_access_token
CONTENTFUL_ENVIRONMENT=master
```

### 4. Run the Development Server
```bash
npm run dev
# or
yarn dev
```

📁 Project Structure
```bash
src/
│
├── app/                 # Next.js App Router (layout, page.tsx, etc)
│
├── components/          # Reusable UI components (Header, Footer, Hero, etc.)
│
├── lib/                 # Contentful client and data-fetching logic
│
├── styles/              # SCSS styles, variables, and Tailwind config
│
├── types/               # TypeScript types (Contentful models, etc.)
│
└── public/              # Static assets like images, favicons
```

✍️ Contentful Setup
Go to Contentful and create a space.
Create Content Types:
```bash
Navbar – includes logo image, navigation links (rich text), and social media (assets).
(You can add more like Hero, Footer, etc.)
Grab your API keys and paste them in .env.local.
```

✅ Best Practices
```bash
Use <Link> from next/link for internal routing
Optimize all images with next/image
Keep logic like getNavbar() in the lib/ folder
Structure styles with globals.scss and modular partials
Follow accessibility (a11y) and SEO principles in all components
```

📦 Scripts
```bash
npm run dev         # Run local dev server
npm run build       # Build for production
npm run start       # Start production server
npm run lint        # Run ESLint
```


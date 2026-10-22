#  NovaStore

A modern, production-ready e-commerce storefront built with React, TypeScript, and Vite.

** Live Demo:** [novastore.vercel.app](https://novastore.vercel.app)

---

##  Features

### Core
-  **Home Page** with hero, categories, and featured products
-  **Shop** with search, category filters, sort, and pagination
-  **Product Details** with image gallery and related products
-  **Cart** with quantity management and persistent state
-  **Wishlist** with toggle and persistence
-  **Checkout** with multi-step form (shipping + payment)
-  **Orders** with full history and details
-  **Auth** with login, register, and protected routes

### Technical
-  **React 19** + **TypeScript** + **Vite**
-  **Custom CSS Modules** — no CSS frameworks
-  **TanStack Query** for server state
-  **Zustand** for global state
-  **React Hook Form** + **Zod** for forms
-  **React Router v7** with lazy loading
-  **Vitest** + **React Testing Library**

---

##  Tech Stack

| Category | Technology |
|---|---|
| **Framework** | React 19 |
| **Language** | TypeScript |
| **Build** | Vite |
| **Styling** | CSS Modules + Custom Design System |
| **Routing** | React Router v7 |
| **State (Client)** | Zustand + persist |
| **State (Server)** | TanStack Query |
| **Forms** | React Hook Form + Zod |
| **HTTP** | Axios + Interceptors |
| **Icons** | Lucide React |
| **Testing** | Vitest + React Testing Library |
| **Deployment** | Vercel |

---

##  Getting Started

### Prerequisites
- Node.js 18+
- npm or pnpm

### Installation

```bash
# Clone the repo
git clone https://github.com/USERNAME/novastore.git
cd novastore

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Start dev server
npm run dev


Design System
The project uses CSS Variables as design tokens for a consistent design:

Colors: Slate-based with one amber accent

Typography: Inter (Google Fonts)

Spacing: 4px scale

Radius: Rounded corners, no sharp edges

Shadows: Subtle, used sparingly

All design tokens live in src/styles/variables.css.

📄 License
This project is open source and available under the MIT License.

Author
[Mahmoud Sulaiman]

GitHub: @developer-mahmoud-sulaiman

LinkedIn: @developer-mahmoud-sulaiman
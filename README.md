# NovaStore

NovaStore is an e-commerce web application built with React and TypeScript. It includes product browsing, search and filtering, a shopping cart, a wishlist, checkout, and order management.

**Live Demo:** [https://novastore-pearl.vercel.app/](https://novastore-pearl.vercel.app/)

## Features

- **Home Page** – Hero section, product categories, and featured products.
- **Shop** – Browse products with search, category filters, sorting, and pagination.
- **Product Details** – View product information, images, and related products.
- **Shopping Cart** – Update quantities and keep cart items saved between sessions.
- **Wishlist** – Add or remove favorite products with persistent storage.
- **Checkout** – Multi-step checkout form for shipping and payment details.
- **Orders** – View order history and order details.
- **Authentication** – Login, registration, and protected routes.
- **Responsive Design** – Layouts designed to work across different screen sizes.

## Tech Stack

| Category | Technology |
|---|---|
| Frontend | React 19, TypeScript |
| Build Tool | Vite |
| Styling | CSS Modules, CSS Variables |
| Routing | React Router v7 |
| Client State | Zustand |
| Server State | TanStack Query |
| Forms & Validation | React Hook Form, Zod |
| HTTP Requests | Axios |
| Icons | Lucide React |
| Testing | Vitest, React Testing Library |
| Deployment | Vercel |

## Getting Started

### Prerequisites

- Node.js
- npm

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/developer-mahmoud-sulaiman/novastore.git
   ```

2. Navigate to the project directory:

   ```bash
   cd novastore
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Configure the environment variables if required. Create a `.env` file in the project root and add the variables used by the application.

5. Start the development server:

   ```bash
   npm run dev
   ```

6. Open the local URL displayed in your terminal.

## Available Scripts

```bash
npm run dev
npm run build
npm run lint
npm run test:run
```

- `dev` – Start the development server.
- `build` – Run TypeScript checks and build the application for production.
- `lint` – Check the code for linting issues.
- `test:run` – Run the test suite.

## Design System

The project uses CSS variables to keep the UI styling consistent across components.

- **Colors:** Slate-based palette with an amber accent.
- **Typography:** Inter.
- **Spacing:** Consistent 4px-based scale.
- **Components:** Reusable UI components styled with CSS Modules.

Design tokens are defined in `src/styles/variables.css`.

## Author

**Mahmoud Sulaiman**

- GitHub: [@developer-mahmoud-sulaiman](https://github.com/developer-mahmoud-sulaiman)
- LinkedIn: [@developer-mahmoud-sulaiman](https://www.linkedin.com/in/developer-mahmoud-sulaiman/)

## License

This project is licensed under the MIT License.

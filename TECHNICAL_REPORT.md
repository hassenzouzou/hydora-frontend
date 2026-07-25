# HYDORA Frontend — Complete Technical Documentation

> **Generated:** 2026-07-25
> **Author:** AI Reverse Engineering Analysis
> **Repository:** `/home/hassen-zouzou/Desktop/myProjects/HYDORA/hydora-frontend`

---

## 1. Executive Summary

### What This Project Is

HYDORA is a **single-page e-commerce storefront** for a premium insulated water bottle brand operating in Algeria. The application is a fully functional, client-side-rendered (with SSR capability) React application built on **TanStack Start** (a full-stack React framework), using **TanStack Router** for routing with file-based conventions.

### What Problem It Solves

It provides a complete online shopping experience for Algerian customers:

- Browse products by category
- Filter and sort products
- View product details with color/size selection
- Add to cart with persistent state
- Checkout with COD (Cash on Delivery)
- Wilaya-based shipping calculation
- Order confirmation flow
- Contact/about informational pages

### Main Features

| Feature            | Status      | Description                                                        |
| ------------------ | ----------- | ------------------------------------------------------------------ |
| Product catalog    | ✅ Complete | 8 mock products, filterable by category, size, color, availability |
| Product detail     | ✅ Complete | Color/size selector, quantity picker, related products             |
| Cart               | ✅ Complete | Persistent drawer, add/remove/update quantities                    |
| Checkout           | ✅ Complete | Form validation, wilaya-based shipping, COD payment                |
| Order confirmation | ✅ Complete | Success page with order details                                    |
| SEO                | ✅ Complete | Per-route `<head>` meta tags, OG tags, Twitter cards               |
| RTL/Arabic         | ✅ Complete | Full Arabic UI, RTL layout, Cairo font                             |
| Responsive         | ✅ Complete | Mobile hamburger menu, responsive grids                            |
| Error handling     | ✅ Complete | SSR error capture, 404 page, route-level errors                    |
| Static pages       | ✅ Complete | About us, Contact page with social links                           |

### Overall Architecture

```
┌──────────────────────────────────────────────┐
│                TanStack Start                 │
│  ┌──────────────┐  ┌──────────────────────┐  │
│  │  server.ts   │  │     start.ts         │  │
│  │(SSR handler) │  │(Middleware pipeline)  │  │
│  └──────────────┘  └──────────────────────┘  │
│                     ┌──────────────────────┐  │
│                     │     router.tsx       │  │
│                     │ (TanStack Router)    │  │
│                     └──────────┬───────────┘  │
│  ┌────────────────────────────┼──────────────┐│
│  │     routeTree.gen.ts       │              ││
│  │  (auto-generated routes)   │              ││
│  └────────────────────────────┼──────────────┘│
│                               ▼               │
│  ┌──────────────────────────────────────────┐ │
│  │            __root.tsx                     │ │
│  │  (Layout shell: navbar, footer, cart,    │ │
│  │   QueryClientProvider, Toaster)          │ │
│  └────────────────┬─────────────────────────┘ │
│                   ▼                           │
│  ┌──────────────────────────────────────┐    │
│  │    Route Pages (8 routes)            │    │
│  │  + Components + Stores + Lib         │    │
│  └──────────────────────────────────────┘    │
└──────────────────────────────────────────────┘
```

### Estimated Complexity

**Medium-Low.** The project is well-structured but relatively small:

- ~25 source files
- No API integration (fully mock-based)
- 2 Zustand stores
- React Query set up but unused
- Pure presentation + local state

### Technologies Used

- **React 19.2** — UI library
- **TanStack Start 1.168** — Full-stack framework (SSR + file routing)
- **TanStack Router 1.170** — Type-safe file-based routing
- **TanStack React Query 5.101** — Data fetching (set up but not actively used)
- **Vite 8.0** — Build tool & dev server
- **TypeScript 5.8** — Type safety
- **Tailwind CSS 4.2** — Utility-first styling
- **Zustand 5.0** — Global state management
- **shadcn/ui (Radix UI)** — Headless UI primitives (50+ components available)
- **Lucide React** — Icon library
- **Sonner 2.0** — Toast notifications
- **React Hook Form 7.71** — Form management (installed but not used for forms)
- **Zod 3.24 / Valibot 1.4** — Schema validation (installed but unused)
- **Recharts 2.15** — Charts (installed but unused)
- **date-fns 4.1** — Date utilities (installed but unused)
- **Embla Carousel 8.6** — Carousel (installed but unused)
- **Nitro 3.0** — Server engine (dev dependency)
- **ESLint 9.32** — Linting
- **Prettier 3.7** — Formatting

---

## 2. Technology Stack — Deep Analysis

### Core Framework: TanStack Start

TanStack Start is a full-stack React framework that provides:

- **SSR (Server-Side Rendering)** via the `server.ts` entry point
- **File-based routing** via TanStack Router conventions
- **Server middleware** pipeline via `start.ts`
- **SSR error handling** with custom error page fallback
- **Nitro** as the underlying server engine (Vinxi under the hood)

**Why this choice:** TanStack Start was chosen as a modern alternative to Next.js. It provides SSR without the "magic" of Next.js App Router, giving more explicit control. The project uses it primarily as a **static site with SSR fallback**, as all data is mock-based.

### Routing: TanStack Router

- **File-based routing** with `createFileRoute()`
- **Auto-generated route tree** (`routeTree.gen.ts`)
- **Type-safe search params** via `validateSearch()`
- **Route-level data loading** via `loader()`
- **Per-route head management** with `<head>` meta/link tags
- **Type-safe navigation** with `Link` and `useNavigate()`
- **Scroll restoration** built in

**Why this choice:** TanStack Router is the only type-safe router for React. Every route param, search param, and navigation is fully type-checked.

### State Management: Zustand

Two lightweight stores:

1. **cart-store.ts** — Cart state with `persist` middleware (localStorage)
2. **order-store.ts** — Last order memory (in-memory only)

**Why Zustand:** Minimal boilerplate, no providers needed, built-in persistence. Perfect for a small-to-medium e-commerce app.

### Styling: Tailwind CSS 4 + Custom Utilities

- **Tailwind v4** with the new CSS-first configuration (`@theme`, `@utility`)
- **Custom design tokens** (hydora brand colors, shadows, fonts)
- **4 custom utility classes**: `btn-primary`, `btn-cyan`, `btn-outline-navy`, `card-hydora`, `container-hydora`, `section-title-underline`
- **shadcn/ui** components configured with New York style, CSS variables
- **RTL support** via `dir="rtl"` and Tailwind's built-in RTL utilities

### UI Components: shadcn/ui (Radix UI)

50+ Radix UI primitive components are installed but **most are unused**. The actually used ones appear to be:

- None of the shadcn components are directly imported in any route or component file
- They were scaffolded and available for future use

### Icons: Lucide React

Used extensively across all components for UI decoration.

---

## 3. Folder Structure

```
hydora-frontend/
├── public/
│   ├── favicon.ico          # Browser tab icon
│   └── logo.PNG             # HYDORA brand logo (used in Logo component)
├── src/
│   ├── components/
│   │   ├── cart/
│   │   │   └── CartDrawer.tsx        # Slide-out cart panel
│   │   ├── home/
│   │   │   ├── HeroSection.tsx       # Landing page hero with product visuals
│   │   │   ├── CategoriesRow.tsx     # Category grid (thermal/sport/kids/office)
│   │   │   ├── BestSellerProducts.tsx # Top 8 products grid
│   │   │   └── TrustBadges.tsx       # Trust signals (quality, delivery, COD, support)
│   │   ├── layout/
│   │   │   ├── AnnouncementBar.tsx   # Top bar with shipping/quality/COD
│   │   │   ├── Navbar.tsx            # Main navigation + mobile menu
│   │   │   ├── Footer.tsx            # Site footer with links & social
│   │   │   └── Logo.tsx              # Reusable logo (light/dark variants)
│   │   ├── products/
│   │   │   └── ProductCard.tsx       # Product grid card with quick-add
│   │   └── ui/                       # 50+ shadcn/ui components (unused)
│   │       ├── accordion.tsx
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── dialog.tsx
│   │       ├── drawer.tsx
│   │       ├── sheet.tsx
│   │       ├── ... (50 more)
│   ├── hooks/
│   │   └── use-mobile.tsx            # Mobile breakpoint detection hook
│   ├── lib/
│   │   ├── error-capture.ts          # SSR error capture for h3
│   │   ├── error-page.ts             # Static HTML error page renderer
│   │   ├── format.ts                 # Price formatting utility
│   │   ├── mock-data.ts              # ALL mock products & categories
│   │   ├── utils.ts                  # cn() — Tailwind class merge utility
│   │   └── wilayas.ts                # 58 Algerian wilayas with shipping prices
│   ├── routes/
│   │   ├── __root.tsx                # Root layout + head + providers
│   │   ├── index.tsx                 # Home page
│   │   ├── about.tsx                 # About us page
│   │   ├── cart.tsx                  # Cart page
│   │   ├── checkout.tsx              # Checkout/order form
│   │   ├── contact.tsx               # Contact page
│   │   ├── order-success.tsx         # Order confirmation
│   │   ├── product.$id.tsx           # Product detail (dynamic)
│   │   └── products.tsx              # Product listing with filters
│   ├── store/
│   │   ├── cart-store.ts             # Zustand cart store (persisted)
│   │   └── order-store.ts            # Zustand order store (in-memory)
│   ├── router.tsx                    # Router instance creation
│   ├── routeTree.gen.ts              # Auto-generated route tree
│   ├── server.ts                     # SSR entry point (fetch handler)
│   ├── start.ts                      # TanStack Start config + middleware
│   └── styles.css                    # Global styles + Tailwind + design tokens
├── components.json                   # shadcn/ui configuration
├── eslint.config.js                  # ESLint flat config
├── package.json                      # Dependencies + scripts
├── tsconfig.json                     # TypeScript configuration
├── vite.config.ts                    # Vite + plugins config
└── README.md                         # (empty)
```

### How Folders Communicate

```
routes/ ──imports──▶ components/
   │                    │
   │                    ├── layout/    (Navbar, Footer, Logo, AnnouncementBar)
   │                    ├── home/      (HeroSection, CategoriesRow, etc.)
   │                    ├── products/  (ProductCard)
   │                    └── cart/      (CartDrawer)
   │
   ├──imports──▶ store/  (cart-store, order-store)
   ├──imports──▶ lib/    (mock-data, format, utils, wilayas)
   └──imports──▶ hooks/  (use-mobile — installed but not used in routes)
```

---

## 4. File-by-File Documentation

### 4.1 Entry Points & Configuration

#### `package.json`

- **Purpose:** Project manifest defining dependencies, scripts, and metadata.
- **Key scripts:**
  - `dev` → `vite dev` — starts dev server
  - `build` → `vite build` — production build
  - `build:dev` → `vite build --mode development` — development build
  - `preview` → `vite preview` — preview production build
  - `lint` → `eslint .`
  - `format` → `prettier --write .`
- **Key observation:** The project is named `tanstack_start_ts` (a generic scaffold name, not yet renamed to "hydora-frontend").

#### `vite.config.ts`

- **Purpose:** Vite build configuration.
- **Plugins (order matters):**
  1. `tanstackStart()` — TanStack Start SSR plugin
  2. `nitro()` — Nitro server engine
  3. `react()` — @vitejs/plugin-react for Fast Refresh
  4. `tailwindcss()` — @tailwindcss/vite for Tailwind v4
- **Alias:** `@` → `./src` for clean imports

#### `tsconfig.json`

- **Target:** ES2022
- **JSX:** react-jsx (automatic runtime)
- **Module:** ESNext with Bundler resolution
- **Strict mode:** Enabled
- **Path alias:** `@/*` → `./src/*`
- **No emit:** TypeScript used only for type checking, Vite handles bundling

#### `eslint.config.js`

- **Format:** Flat config (eslint 9.x)
- **Extends:** `@eslint/js` recommended, `typescript-eslint` recommended
- **Plugins:** `react-hooks`, `react-refresh`
- **Ignores:** `dist`, `.output`, `.vinxi`
- **Custom rule:** Blocks `server-only` import (TanStack Start uses file naming convention instead)
- **Prettier integration:** Via `eslint-plugin-prettier/recommended`

#### `components.json`

- **Purpose:** shadcn/ui configuration file
- **Style:** new-york
- **Base color:** slate
- **CSS variables:** Enabled
- **Icon library:** lucide
- **RTL:** false (handled manually via Tailwind's RTL utilities)

---

### 4.2 Core Application Files

#### `src/server.ts` — SSR Entry Point

**Purpose:** The server-side entry point for SSR. Handles incoming HTTP requests in production.

**Key logic:**

1. Imports `error-capture` module (side-effect: registers global error listeners)
2. Lazily imports `@tanstack/react-start/server-entry` for the actual SSR handler
3. **`normalizeCatastrophicSsrResponse()`** — Detects when h3 (the underlying HTTP framework) has swallowed an SSR error into a generic `{"unhandled":true,"message":"HTTPError"}` response. If detected, renders a custom error page.
4. **`fetch()`** — The main request handler. Calls the SSR handler and normalizes error responses.

**Design decisions:**

- The lazy import pattern avoids loading the SSR entry until first request (cold-start optimization)
- The h3 swallow detection is necessary because h3 catches in-handler throws and converts them to generic 500 responses, losing the actual error

#### `src/start.ts` — TanStack Start Configuration

**Purpose:** Creates the TanStack Start instance with middleware.

**Key logic:**

1. Creates an error middleware that wraps every server request
2. If middleware catches an error with `statusCode` property, re-throws it (let h3 handle it)
3. Otherwise, renders the custom error page with 500 status

**Design decisions:**

- The middleware approach separates error handling from the SSR handler
- Non-HTTP errors (bugs, exceptions) get a friendly HTML error page instead of a raw 500

#### `src/router.tsx` — Router Factory

**Purpose:** Creates the TanStack Router instance.

**Key logic:**

1. Creates a new `QueryClient` instance (for React Query cache)
2. Creates router with:
   - `routeTree` from auto-generated file
   - `context: { queryClient }` passed to all routes
   - `scrollRestoration: true` for preserving scroll position
   - `defaultPreloadStaleTime: 0` — always preload

**Why a factory function (`getRouter()`)?** TanStack Router typically creates the router as a module-level export. Using a factory ensures a fresh QueryClient per SSR request, preventing state leakage between requests.

#### `src/routeTree.gen.ts` — Auto-Generated Route Tree

**Purpose:** Automatically generated by TanStack Router's Vite plugin. Maps file-system routes to route definitions.

**Generated from:** Files in `src/routes/` matching the file-based routing convention.

**Route mapping:**

| File                | Route ID         | Path             | Type        |
| ------------------- | ---------------- | ---------------- | ----------- |
| `__root.tsx`        | `__root__`       | —                | Root layout |
| `index.tsx`         | `/`              | `/`              | Static      |
| `about.tsx`         | `/about`         | `/about`         | Static      |
| `cart.tsx`          | `/cart`          | `/cart`          | Static      |
| `checkout.tsx`      | `/checkout`      | `/checkout`      | Static      |
| `contact.tsx`       | `/contact`       | `/contact`       | Static      |
| `order-success.tsx` | `/order-success` | `/order-success` | Static      |
| `products.tsx`      | `/products`      | `/products`      | Static      |
| `product.$id.tsx`   | `/product/$id`   | `/product/$id`   | Dynamic     |

**⚠️ Do not edit this file.** It is regenerated on every file change.

#### `src/styles.css` — Global Styles & Design System

**Purpose:** The single source of truth for all styles.

**Structure:**

1. **Tailwind imports:** `@import "tailwindcss"` with `source(none)` + explicit `@source "../src"` for tree-shaking
2. **`tw-animate-css`** import for animation utilities
3. **Dark mode variant:** `@custom-variant dark (&:is(.dark *))` — configured but UNUSED (no dark mode UI)
4. **`@theme inline` block:** Maps CSS variables to Tailwind theme tokens
5. **`:root` block:** Brand color palette (navy, cyan, surface, border)
6. **`@layer base`:** Base styles (border-color, heading styles)
7. **Custom utilities:**
   - `container-hydora` — max-width container (1280px)
   - `section-title-underline` — heading with cyan underline
   - `btn-primary` — Navy filled button
   - `btn-cyan` — Cyan filled button with glow shadow
   - `btn-outline-navy` — Outline navy button
   - `card-hydora` — Product/category card with hover lift effect

**Design tokens:**

```
Brand Navy:    #152558 (dark), #0d1a45 (darker), #1e3470 (lighter)
Brand Cyan:    #00c4e2 (main), #00a8c4 (dark), #e0f8fd (light)
Surface:       #f4fbfd (alt), #f0f9fc (hero)
Border:        #c8eef6 (main), #e5f5fb (subtle)
Font:          Cairo (Arabic-optimized)
```

---

### 4.3 Routes (Pages)

#### `src/routes/__root.tsx` — Root Layout

**Purpose:** The root route that wraps all pages.

**Responsibilities:**

- Provides `<html>`, `<head>`, `<body>` shell (via `RootShell`)
- Sets global `<head>` meta tags (charset, viewport, OG, Twitter cards)
- Loads Cairo font from Google Fonts
- Provides `QueryClientProvider` wrapping all routes
- Renders persistent layout: `AnnouncementBar` → `Navbar` → `<Outlet />` → `Footer`
- Renders `CartDrawer` (global overlay)
- Renders `Toaster` (sonner toast notifications, RTL mode)
- Provides 404 (`NotFoundComponent`) and error (`ErrorComponent`) fallbacks

**Route context:** `{ queryClient: QueryClient }` — available to all child routes via `Route.useRouteContext()`

**Head management:** Uses TanStack Router's `head()` function which renders `<meta>`, `<link>`, `<title>`, `<script>` tags into the document head.

**Key detail:** The `RootShell` component renders the actual `<html>` and `<body>` tags — this is TanStack Start's convention for SSR. The `HeadContent` and `Scripts` components from TanStack Router inject the appropriate tags.

#### `src/routes/index.tsx` — Home Page

**Purpose:** Landing page compositing 4 sections.

**Composition:**

```
HeroSection → CategoriesRow → BestSellerProducts → TrustBadges
```

**No data fetching, no state.** Pure composition of presentation components.

#### `src/routes/products.tsx` — Product Listing Page

**Purpose:** Full product catalog with filtering, sorting, and search.

**State:**

- `category` — from URL search params (via `validateSearch`)
- `searchQ` — local text search
- `selectedSizes` — multi-select filter
- `selectedColors` — multi-select filter
- `onlyAvailable` — boolean toggle
- `sort` — enum: `"new" | "price_asc" | "price_desc"`
- `mobileFiltersOpen` — mobile filter panel toggle

**Filtering logic (`useMemo`):**

1. Filter by category slug (if provided)
2. Filter by search text (includes match)
3. Filter by selected sizes
4. Filter by selected colors
5. Filter by availability
6. Sort by price

**UI layout:**

- Desktop: sidebar (280px fixed) + product grid (4 columns)
- Mobile: sort bar + product grid (2 columns) + slide-out filter panel

**Search params:** `validateSearch` ensures type-safe URL search params. Category selection updates the URL, enabling shareable filtered views.

**Edge case handling:** Empty results show a "no products" message with a clear-filters button.

#### `src/routes/product.$id.tsx` — Product Detail Page

**Purpose:** Individual product page with purchase flow.

**Data loading:**

- Uses `loader()` to find the product by `params.id` from `mockProducts`
- Throws `notFound()` if not found (triggers 404 component)

**State:**

- `color` — selected color (defaults to first)
- `size` — selected size (defaults to first)
- `qty` — quantity (defaults to 1)

**Key interactions:**

- Color picker (pill buttons with active state)
- Size picker (pill buttons)
- Quantity stepper (min: 1)
- Add to cart button → adds item → shows toast → opens drawer
- Related products (same category, max 4)

**Head management:** Dynamic SEO tags with product name, description, and image.

**Error handling:** Custom `errorComponent` for loader failures, `notFoundComponent` for missing products.

#### `src/routes/cart.tsx` — Cart Page

**Purpose:** Full-page cart view with item management.

**State:** All from `useCartStore`

- `items` — cart contents
- `removeItem` / `updateQuantity` / `clearCart` — mutations
- `getTotalPrice()` — computed total

**Empty state:** Illustrated empty cart with CTA to browse products.

**Filled state:**

- Item list with image, name, color/size, quantity stepper, line total
- Clear cart button
- Cart summary sidebar (subtotal, COD payment notice)
- "Proceed to checkout" button

**Edge case:** Quantity decrement to 0 removes the item (via `updateQuantity` which calls `removeItem` when qty ≤ 0).

#### `src/routes/checkout.tsx` — Checkout Page

**Purpose:** Order placement form with delivery selection.

**Form fields:**

| Field          | Required    | Validation                             |
| -------------- | ----------- | -------------------------------------- |
| `fullName`     | Yes         | Non-empty                              |
| `phone`        | Yes         | Algerian phone regex `/^0[567]\d{8}$/` |
| `email`        | No          | Email format if provided               |
| `wilayaCode`   | Yes         | Must be selected                       |
| `commune`      | Yes         | Non-empty                              |
| `address`      | Conditional | Required only for home delivery        |
| `deliveryType` | Yes         | `"home"` or `"stopdesk"`               |
| `notes`        | No          | Free text                              |

**Shipping calculation:**

- Based on selected wilaya from `wilayas.ts`
- Home delivery and Stop Desk have different prices per wilaya
- Updates in real-time when wilaya or delivery type changes

**Submission flow:**

1. Validate → show toast error if invalid
2. Set `submitting = true`
3. **Mock delay:** `await new Promise(r => setTimeout(r, 700))`
4. Create order object with generated ID (`HYD-${timestamp}`)
5. Store in `orderStore`
6. Clear cart
7. Navigate to `/order-success`

**Payment:** Only "Cash on Delivery" (COD). Hardcoded — no payment gateway integration.

**Design pattern:** Manually managed form state (not React Hook Form, despite it being a dependency). Validation is manual with an error map.

#### `src/routes/order-success.tsx` — Order Confirmation Page

**Purpose:** Displays order confirmation after successful checkout.

**Guard:** If `orderStore.lastOrder` is null, redirects to `/` via `<Navigate>`.

**Content:**

- Success icon + thank you message
- Order ID with date
- Item list with images
- Delivery address summary
- Cost breakdown (subtotal, shipping, total)
- Navigation buttons (home, continue shopping)

#### `src/routes/about.tsx` — About Page

**Purpose:** Brand story and values page.

**Sections:**

1. Hero: Gradient background with title
2. Story: Text + image (hardcoded Unsplash URL)
3. Values: 4 cards (Quality, Eco-friendly, Hydration, Local)
4. CTA: Link to products

**No dynamic data.** Entirely static content.

#### `src/routes/contact.tsx` — Contact Page

**Purpose:** Contact information and social links.

**Sections:**

1. Hero: Gradient background with quick action buttons (call, WhatsApp, email)
2. Contact grid: 4 info cards (Phone, Email, Address, Hours)
3. Sidebar: Location card (navy gradient with SVG map decoration), Social links card
4. Promise section: 3 trust cards

**Sub-components:**

- `InfoCard` — Reusable contact info card with icon, text, and action link
- `LocationCard` — Styled location card with SVG background decoration
- `SocialCard` — Social media links (Instagram, Facebook, TikTok)

**All contact info is hardcoded** (phone: 0555 12 34 56, email: contact@hydora.dz).

---

### 4.4 Components

#### Layout Components

##### `src/components/layout/AnnouncementBar.tsx`

- **Purpose:** Top bar above the navbar showing trust signals
- **Content:** 3 items (Delivery, Authentic Products, COD) with separators
- **Responsive:** Hides items progressively on smaller screens (sm, md breakpoints)
- **Props:** None
- **State:** None
- **Dependencies:** lucide-react icons

##### `src/components/layout/Navbar.tsx`

- **Purpose:** Main navigation bar with mobile menu
- **Props:** None
- **State:** `mobileOpen`, `mobileCatsOpen`
- **Features:**
  - Sticky positioning with backdrop blur
  - Desktop: Horizontal nav + categories dropdown (hover)
  - Mobile: Hamburger menu with expandable categories
  - Cart button with item count badge
  - Logo on the right (RTL)
- **Active link styling:** `text-cyan-brand` for current route
- **Dependencies:** `useCartStore`, `mockCategories`, `Logo`

##### `src/components/layout/Footer.tsx`

- **Purpose:** Site footer
- **Content:**
  - Brand column (Logo + description)
  - Quick links (Home, Products, About, Contact)
  - Contact info (phone, email, social icons)
  - Copyright bar
- **Props:** None
- **Dependencies:** `Logo`, lucide-react

##### `src/components/layout/Logo.tsx`

- **Purpose:** Reusable logo component
- **Props:**
  - `className` (default: `"h-9"`)
  - `onDark` (boolean, default: `false`)
- **Logic:** Renders `logo.PNG` from public folder. On dark backgrounds, wraps in a white rounded container.
- **Issue:** The `src` path is `../../../logo.PNG` — this is fragile relative pathing. Should use `/logo.PNG` instead.

#### Home Components

##### `src/components/home/HeroSection.tsx`

- **Purpose:** Landing page hero section
- **Content:**
  - Headline: "ترطيب يدوم معك أينما ذهبت"
  - Subheadline: Brand description
  - Two CTAs: "تسوق الآن" (primary) and "اكتشف المجموعة" (secondary)
  - Feature badges: 24H cold, 12H hot, BPA Free, Leak-proof
  - Desktop: 4 decorative bottle images with rotation and blur background
  - Mobile: Single hero bottle image
- **Data:** First 4 products from `mockProducts`
- **Props:** None
- **Performance note:** Bottle images are decorative but are real Unsplash URLs. No lazy loading.

##### `src/components/home/CategoriesRow.tsx`

- **Purpose:** Category grid showing 4 categories
- **Data:** `mockCategories`
- **Interaction:** Each card links to `/products?category={slug}`
- **Props:** None

##### `src/components/home/BestSellerProducts.tsx`

- **Purpose:** "Best sellers" product grid
- **Data:** First 8 products from `mockProducts` (via `slice(0, 8)`)
- **Reuses:** `ProductCard` component
- **Props:** None

##### `src/components/home/TrustBadges.tsx`

- **Purpose:** Trust signal badges row
- **Content:** 4 badges (Quality, Fast Delivery, COD, Support 7/7)
- **Props:** None

#### Product Components

##### `src/components/products/ProductCard.tsx`

- **Purpose:** Product card for grid display with quick-add
- **Props:** `{ product: MockProduct }`
- **Features:**
  - Links to product detail page
  - Availability badge (green "متوفر" or red "نفد المخزون")
  - Category badge
  - Image with hover zoom effect
  - Grayscale filter on unavailable products
  - Quick-add button (floating cyan circle)
  - Hover lift effect (card-hydora utility)
- **Quick add:** Adds product with default color/size and qty 1, shows toast, opens drawer
- **Dependencies:** `useCartStore`, `formatPrice`, `sonner`

#### Cart Components

##### `src/components/cart/CartDrawer.tsx`

- **Purpose:** Slide-out cart panel (global, rendered in root)
- **State:** All from `useCartStore`
- **Features:**
  - Backdrop overlay
  - Slide-in animation from right
  - Item list with image, quantity stepper, remove button
  - Cart summary (subtotal)
  - Navigation buttons (view cart, checkout)
  - Empty state
- **Conditional rendering:** `if (!isOpen) return null`
- **Accessibility:** `role="dialog"`, `aria-label`

---

### 4.5 Store Files

#### `src/store/cart-store.ts` — Cart State

**Technology:** Zustand with `persist` middleware

**State shape:**

```typescript
{
  items: CartItem[],        // cart contents
  isDrawerOpen: boolean,    // drawer visibility
}
```

**CartItem type:**

```typescript
{
  productId: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
  color: string;
  size: string;
}
```

**Actions:**

| Action                                 | Behavior                                                    |
| -------------------------------------- | ----------------------------------------------------------- |
| `openDrawer()`                         | Sets `isDrawerOpen = true`                                  |
| `closeDrawer()`                        | Sets `isDrawerOpen = false`                                 |
| `addItem(item)`                        | Adds or increments. Key is `productId-color-size` composite |
| `removeItem(id, color, size)`          | Removes by composite key                                    |
| `updateQuantity(id, color, size, qty)` | Updates qty. Removes item if qty ≤ 0                        |
| `clearCart()`                          | Empties all items                                           |
| `getTotalItems()`                      | Computed: sum of quantities                                 |
| `getTotalPrice()`                      | Computed: sum of price × quantity                           |

**Persistence:** `localStorage` key: `"hydora-cart"`

**Composite key:** `${productId}-${color}-${size}` — A product with different color/size is treated as a separate cart item. This is correct e-commerce behavior.

#### `src/store/order-store.ts` — Order State

**Technology:** Zustand (in-memory only, no persistence)

**State shape:**

```typescript
{
  lastOrder: PlacedOrder | null;
}
```

**Actions:**

| Action                | Behavior                   |
| --------------------- | -------------------------- |
| `setLastOrder(order)` | Sets the last placed order |
| `clearLastOrder()`    | Resets to null             |

**Why in-memory only:** The order success page shows the order, but after navigating away the data is lost. This prevents stale order data from being displayed on revisits. The order data should ideally come from a backend.

---

### 4.6 Library/Utility Files

#### `src/lib/mock-data.ts` — Mock Data

**Purpose:** The ENTIRE data layer of the application. Contains all product and category data.

**Types:**

- `MockCategory`: `{ id, name, slug, image }`
- `MockProduct`: `{ id, name, description, price, is_available, image, category, categorySlug, colors[], sizes[] }`

**Data:**

- 4 categories: Thermal, Sport, Kids, Office
- 8 products: Generated programmatically with variations
- All images: Unsplash URLs (8 unique bottle images)

**How products are generated:**

```typescript
productNames.map((name, i) => ({
  id: i + 1,
  name,
  description: /* same for all */,
  price: 1500 + i * 350,            // 1500, 1850, 2200, 2550, 2900, 3250, 3600, 3950
  is_available: i !== 5,             // product 6 is out of stock
  image: bottleImages[i % 8],
  category: mockCategories[i % 4].name,
  categorySlug: mockCategories[i % 4].slug,
  colors: colorPool.slice(0, 3 + (i % 3)),  // 3-5 colors
  sizes: sizePool.slice(0, 2 + (i % 3)),    // 2-4 sizes
}))
```

**⚠️ CRITICAL:** This file is the single source of all data. Every page that displays products or categories imports from here. When integrating with Strapi, this entire file must be replaced with API calls.

**Unsplash image URLs used:**

- `photo-1602143407151-7111542de6e8` (blue bottle)
- `photo-1523362628745-0c100150b504` (sports bottle)
- `photo-1610824352934-c10d87b700cc` (bottle)
- `photo-1550505095-81378a674395` (kids bottle)
- `photo-1523275335684-37898b6baf30` (product)
- `photo-1526401485004-46910ecc8e51` (bottle)
- `photo-1555529669-2269763671c0` (product)
- `photo-1560393464-5c69a73c5770` (office bottle)

#### `src/lib/format.ts` — Price Formatting

**Function:** `formatPrice(price: number): string`
**Output:** `"١٬٥٠٠ دج"` (Arabic numerals + "DZD" suffix)
**Uses:** `toLocaleString("ar-DZ")` for Arabic number formatting

#### `src/lib/utils.ts` — Class Name Utility

**Function:** `cn(...inputs: ClassValue[]): string`
**Purpose:** Merges Tailwind classes with conflict resolution.
**Uses:** `clsx` + `tailwind-merge`
**Usage:** Standard shadcn/ui pattern. Not actually used in any of the main components (they use template literals instead).

#### `src/lib/wilayas.ts` — Algerian Wilayas Data

**Purpose:** Complete list of 58 Algerian wilayas with shipping prices.

**Type:** `Wilaya { code, name, nameFr, homeDelivery, stopDeskDelivery }`

**Price ranges:**

- Home delivery: 500 DZD (Algiers) to 1700 DZD (remote southern wilayas)
- Stop Desk: 350 DZD (Algiers) to 1100 DZD (remote southern wilayas)

**Note:** Prices are hardcoded and marked as "indicative" in comments. The file mentions "Yalidine/ZR-Express feed" as a future real-time integration.

#### `src/lib/error-capture.ts` — SSR Error Capture

**Purpose:** Captures unhandled errors and promise rejections before h3 swallows them.

**Mechanism:**

1. Registers `error` and `unhandledrejection` event listeners
2. Stores the last error with a 5-second TTL
3. `consumeLastCapturedError()` retrieves and clears the stored error

**Why this exists:** h3 (the Nitro HTTP framework) catches thrown errors in request handlers and converts them to generic 500 responses. The actual error is lost. This module captures the error out-of-band so `server.ts` can log it and render a meaningful error page.

#### `src/lib/error-page.ts` — Error Page Renderer

**Purpose:** Renders a static HTML error page for SSR failures.

**Function:** `renderErrorPage(): string`
**Returns:** Complete HTML document with inline CSS, "Try again" button, and "Go home" link.

**Design:** Self-contained HTML with no external dependencies. Works even when the entire React tree fails to render.

#### `src/hooks/use-mobile.tsx` — Mobile Detection Hook

**Purpose:** Detects if the viewport is mobile width (< 768px).

**Returns:** `boolean`

**Implementation:**

- Uses `window.matchMedia` with `max-width: 767px`
- Reactive via `change` event listener
- SSR-safe (starts as `undefined`, resolves to boolean on client)

**Usage:** Currently **NOT used** anywhere in the application. Installed but dormant.

---

### 4.7 UI Components (`src/components/ui/`)

50+ shadcn/ui components were scaffolded but **none are imported in any route or feature component**. They are available for future use. The list includes:

`accordion`, `alert-dialog`, `alert`, `aspect-ratio`, `avatar`, `badge`, `breadcrumb`, `button`, `calendar`, `card`, `carousel`, `chart`, `checkbox`, `collapsible`, `command`, `context-menu`, `dialog`, `drawer`, `dropdown-menu`, `form`, `hover-card`, `input-otp`, `input`, `label`, `menubar`, `navigation-menu`, `pagination`, `popover`, `progress`, `radio-group`, `resizable`, `scroll-area`, `select`, `separator`, `sheet`, `sidebar`, `skeleton`, `slider`, `sonner`, `switch`, `table`, `tabs`, `textarea`, `toggle-group`, `toggle`, `tooltip`

These are mostly Radix UI primitives wrapped with Tailwind styling per shadcn/ui conventions.

---

## 5. Application Startup Flow

### Step-by-step execution:

```
1. npm run dev
   └─> Executes "vite dev"
       └─> Vite starts dev server on localhost:5173
           └─> Plugins loaded in order:
               1. tanstackStart() — registers TanStack Start SSR
               2. nitro() — registers Nitro server engine
               3. react() — registers React Fast Refresh
               4. tailwindcss() — registers Tailwind JIT compilation

2. Browser navigates to http://localhost:5173
   └─> Nitro receives HTTP request
       └─> Request passes through start.ts error middleware
           └─> server.ts fetch() handler invoked
               └─> Lazily loads @tanstack/react-start/server-entry
                   └─> Server entry renders the React tree:
                       1. router.tsx creates router + QueryClient
                       2. __root.tsx RootShell renders <html>/<head>/<body>
                       3. HeadContent injects:
                          - <meta> tags (charset, viewport, description, OG, Twitter)
                          - <link> tags (CSS, fonts preconnect, Google Fonts, favicon)
                       4. RootComponent renders:
                          - QueryClientProvider
                          - AnnouncementBar
                          - Navbar
                          - <Outlet /> (matched route)
                          - Footer
                          - CartDrawer (hidden initially)
                          - Toaster

3. Route matching:
   └─> TanStack Router matches URL to routeTree.gen.ts
       └─> For "/" → index.tsx → HomePage component
           └─> HeroSection renders
               └─> Reads mockProducts (first 4)
               └─> Displays hero text + bottle images
           └─> CategoriesRow renders
               └─> Reads mockCategories
               └─> Displays 4 category cards
           └─> BestSellerProducts renders
               └─> Reads mockProducts (first 8)
               └─> Displays ProductCard grid
           └─> TrustBadges renders
               └─> Displays 4 trust signal badges

4. Hydration:
   └─> Client-side React hydrates the server-rendered HTML
       └─> Event listeners attached
       └─> Zustand store rehydrated from localStorage
       └─> App becomes interactive
```

---

## 6. Routing Analysis

### Route Tree

```
__root__ (RootShell + RootComponent)
├── /                  (index.tsx)        Home page
├── /about             (about.tsx)        About us
├── /cart              (cart.tsx)         Cart page
├── /checkout          (checkout.tsx)     Checkout form
├── /contact           (contact.tsx)      Contact page
├── /order-success     (order-success.tsx) Order confirmation
├── /products          (products.tsx)     Product listing
└── /product/$id       (product.$id.tsx)  Product detail
```

### Route Types

| Route            | Type    | Params        | Search Params                   | Loader              | Guard                                   |
| ---------------- | ------- | ------------- | ------------------------------- | ------------------- | --------------------------------------- |
| `/`              | Static  | —             | —                               | No                  | No                                      |
| `/about`         | Static  | —             | —                               | No                  | No                                      |
| `/cart`          | Static  | —             | —                               | No                  | No                                      |
| `/checkout`      | Static  | —             | —                               | No                  | No (but checks empty cart in component) |
| `/contact`       | Static  | —             | —                               | No                  | No                                      |
| `/order-success` | Static  | —             | —                               | No                  | Yes (redirects if no order)             |
| `/products`      | Static  | —             | `category?`, `search?`, `sort?` | No                  | No                                      |
| `/product/$id`   | Dynamic | `$id: string` | —                               | Yes (finds product) | Yes (notFound if missing)               |

### Navigation Flow

```
Home ──┬──▶ Products ──▶ Product Detail ──▶ (Add to Cart)
       │                      │
       ├──▶ About             └──▶ Cart ──▶ Checkout ──▶ Order Success ──▶ Home
       │
       └──▶ Contact
```

### Route Guards

- **Order Success:** Redirects to `/` if no order exists in `orderStore`
- **Product Detail:** Shows 404 if product ID doesn't match any mock product
- **Checkout:** Shows empty state if cart is empty (doesn't redirect, just shows message)

### Meta/SEO Strategy

Each route has its own `head()` function that sets:

- `<title>` with HYDORA branding
- `<meta name="description">`
- OG tags (`og:title`, `og:description`, `og:image`, `og:type`)
- Twitter card tags
- `robots` meta (noindex for cart/checkout/order-success)

Dynamic routes (product detail) use `loaderData` to personalize meta tags with the product name and image.

---

## 7. Component Architecture

### Complete Component Hierarchy

```
<RootShell>                                   [__root.tsx]
└── <html lang="ar" dir="rtl">
    └── <head> (HeadContent)
    └── <body>
        └── <RootComponent>
            └── <QueryClientProvider>
                └── <div className="flex min-h-screen...">
                    ├── <AnnouncementBar />     [layout/AnnouncementBar.tsx]
                    ├── <Navbar />              [layout/Navbar.tsx]
                    │   ├── <Logo />            [layout/Logo.tsx]
                    │   ├── <Link /> (×5)       [TanStack Router]
                    │   └── categories dropdown
                    ├── <main>
                    │   └── <Outlet />          [TanStack Router]
                    │       └── (matched route component)
                    └── <Footer />              [layout/Footer.tsx]
                        └── <Logo onDark />
                ├── <CartDrawer />              [cart/CartDrawer.tsx]
                └── <Toaster />                 [sonner]
```

### Per-Route Component Trees

**Home (`/`):**

```
<HomePage>
├── <HeroSection />
│   └── <ProductCard /> (implicitly uses mockProducts data)
├── <CategoriesRow />
│   └── <Link to="/products"> (×4, category cards)
├── <BestSellerProducts />
│   └── <ProductCard product={p} /> (×8)
└── <TrustBadges />
```

**Products (`/products`):**

```
<ProductsPage>
├── <aside> (desktop filters sidebar)
│   ├── search input
│   ├── category buttons
│   ├── size buttons
│   ├── color buttons
│   ├── availability checkbox
│   └── clear filters button
├── sort bar
├── <ProductCard /> (×filtered.length)
└── mobile filter slide-out panel
```

**Product Detail (`/product/$id`):**

```
<ProductDetailPage>
├── breadcrumb nav
├── image gallery (4 thumbnails)
├── product info
│   ├── category badge
│   ├── title, price, availability
│   ├── description
│   ├── color picker
│   ├── size picker
│   ├── quantity stepper
│   ├── add to cart button
│   └── trust chips (×4)
└── related products → <ProductCard /> (×4)
```

**Checkout (`/checkout`):**

```
<CheckoutPage>
├── <form>
│   ├── contact section (fullName, phone, email)
│   ├── address section (wilaya, commune, address, notes)
│   ├── delivery section (home vs stopdesk)
│   └── payment section (COD only)
└── order summary sidebar
    ├── item list
    ├── price breakdown
    └── submit button
```

### Component Property Matrix

| Component          | Props                | State                      | Reusable?          |
| ------------------ | -------------------- | -------------------------- | ------------------ |
| AnnouncementBar    | —                    | —                          | ✅ Yes             |
| Navbar             | —                    | mobileOpen, mobileCatsOpen | ✅ Yes             |
| Footer             | —                    | —                          | ✅ Yes             |
| Logo               | className?, onDark?  | —                          | ✅ Yes             |
| CartDrawer         | —                    | (from store)               | ✅ Yes             |
| HeroSection        | —                    | —                          | ❌ Home only       |
| CategoriesRow      | —                    | —                          | ❌ Home only       |
| BestSellerProducts | —                    | —                          | ❌ Home only       |
| TrustBadges        | —                    | —                          | ✅ Could be reused |
| ProductCard        | product: MockProduct | —                          | ✅ Yes             |

---

## 8. State Management

### State Inventory

| State            | Location         | Type        | Persisted       | Scope             |
| ---------------- | ---------------- | ----------- | --------------- | ----------------- |
| Cart items       | `cart-store.ts`  | Zustand     | ✅ localStorage | Global            |
| Drawer open      | `cart-store.ts`  | Zustand     | ❌              | Global            |
| Last order       | `order-store.ts` | Zustand     | ❌              | Global            |
| Query cache      | `router.tsx`     | React Query | ❌              | Per-request (SSR) |
| Form fields      | Each route       | `useState`  | ❌              | Component         |
| Search/filters   | `products.tsx`   | `useState`  | ❌              | Component         |
| Mobile menu      | `Navbar.tsx`     | `useState`  | ❌              | Component         |
| Mobile detection | `use-mobile.tsx` | `useState`  | ❌              | Hook              |

### Data Flow Diagram

```
User Action (click "Add to Cart")
    │
    ▼
ProductCard.tsx
    │ handleQuickAdd()
    │ addItem({...})           ──▶ useCartStore.addItem()
    │                                │
    │                                ▼
    │                           Zustand Store
    │                           ├── items[] updated
    │                           └── persist → localStorage
    │
    │ toast.success("تمت الإضافة")
    │ openDrawer()
    │
    ▼
CartDrawer.tsx                   Navbar.tsx
◀── useCartStore.isDrawerOpen   ◀── useCartStore.getTotalItems()
    (re-renders, shows panel)       (re-renders badge count)
```

### Why Zustand + Persist?

- **No Provider needed** — Zustand stores are accessed directly via hooks, no wrapping required
- **localStorage persistence** — Cart survives page refreshes and browser restarts
- **Tiny bundle** — Zustand is ~1KB gzipped
- **No React Query usage** — Despite being installed and configured, React Query is never actually called with `useQuery`. The `mockProducts` are imported directly as static arrays.

---

## 9. Data Flow

### Complete Data Flow for Product Purchase

```
┌─────────────────────────────────────────────────────────────┐
│ 1. DATA SOURCE                                              │
│    mock-data.ts (static arrays)                             │
│    ├── mockProducts: MockProduct[]                          │
│    └── mockCategories: MockCategory[]                       │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│ 2. ROUTE LOADER (product.$id.tsx)                           │
│    loader: ({ params }) =>                                  │
│      mockProducts.find(p => String(p.id) === params.id)     │
│    └─> Returns product or throws notFound()                 │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│ 3. COMPONENT STATE                                          │
│    ProductDetailPage                                        │
│    ├── color: useState(product.colors[0])                   │
│    ├── size: useState(product.sizes[0])                     │
│    └── qty: useState(1)                                     │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│ 4. USER INTERACTION                                         │
│    User selects color → setColor(c)                         │
│    User selects size  → setSize(s)                          │
│    User adjusts qty  → setQty(n)                            │
│    User clicks "Add" → handleAdd()                          │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│ 5. STORE MUTATION                                           │
│    handleAdd() {                                            │
│      addItem({ productId, name, price, image,               │
│                quantity: qty, color, size })                │
│      toast.success("تمت الإضافة للسلة")                      │
│      openDrawer()                                           │
│    }                                                        │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│ 6. UI UPDATE                                                │
│    Navbar: badge count updates (getTotalItems())            │
│    CartDrawer: slides in with updated items                 │
│    localStorage: cart state auto-persisted                  │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│ 7. CHECKOUT FLOW                                            │
│    Cart → Checkout (cart items displayed)                   │
│    User fills form → validates → submits                    │
│    Mock delay (700ms) → creates order → stores in           │
│    orderStore → clears cart → navigates to order-success    │
└─────────────────────────────────────────────────────────────┘
```

---

## 10. API Layer

### Current State: **ZERO API Calls**

The application makes **no HTTP requests** to any backend. All data is sourced from `src/lib/mock-data.ts` as statically imported arrays.

### Mock Data Access Points

| Location                                 | Data Accessed                    | Method        |
| ---------------------------------------- | -------------------------------- | ------------- |
| `routes/index.tsx`                       | — (delegates to components)      | —             |
| `routes/products.tsx`                    | `mockProducts`, `mockCategories` | Direct import |
| `routes/product.$id.tsx`                 | `mockProducts` (via loader)      | Direct import |
| `components/home/HeroSection.tsx`        | `mockProducts`                   | Direct import |
| `components/home/CategoriesRow.tsx`      | `mockCategories`                 | Direct import |
| `components/home/BestSellerProducts.tsx` | `mockProducts`                   | Direct import |
| `components/products/ProductCard.tsx`    | — (receives product as prop)     | —             |
| `components/layout/Navbar.tsx`           | `mockCategories`                 | Direct import |
| `routes/checkout.tsx`                    | `wilayas` (hardcoded)            | Direct import |

### Simulated Async Operations

**Checkout submission** (`routes/checkout.tsx`, line ~130):

```typescript
// Simulate order placement — replace with Strapi POST later.
await new Promise((r) => setTimeout(r, 700));
```

This is the **only** async operation in the entire codebase. It simulates a network request delay.

### React Query Setup (Unused)

Despite being configured:

```typescript
// router.tsx
const queryClient = new QueryClient();
const router = createRouter({
  context: { queryClient },
  // ...
});
```

And the `QueryClientProvider` being mounted in `RootComponent`, there are **zero calls** to `useQuery`, `useMutation`, `useSuspenseQuery`, or any other React Query hook in the entire codebase. React Query is scaffolding waiting to be used when the backend is connected.

---

## 11. Backend Integration Map

This section maps every data dependency to its future Strapi equivalent.

### Products

| Frontend Feature  | Current Data Source                                 | Future Strapi Collection                                                                      | Recommended REST Endpoint                                           | Notes                          |
| ----------------- | --------------------------------------------------- | --------------------------------------------------------------------------------------------- | ------------------------------------------------------------------- | ------------------------------ |
| Product listing   | `mockProducts` array                                | `Product` collection type                                                                     | `GET /api/products?populate=*`                                      | Add pagination, filters        |
| Product detail    | `mockProducts.find()`                               | `Product` collection type                                                                     | `GET /api/products/:id?populate=*`                                  | Use slug or documentId         |
| Category filter   | `mockProducts.filter(p => p.categorySlug === slug)` | `Product` with `category` relation                                                            | `GET /api/products?filters[category][slug][$eq]=thermal&populate=*` | Strapi filters                 |
| Size/color filter | Client-side `Array.filter()`                        | `Product` fields or relations                                                                 | `GET /api/products?filters[sizes][$contains]=500ml`                 | Consider moving to server-side |
| Price sort        | Client-side `Array.sort()`                          | Strapi sort param                                                                             | `GET /api/products?sort=price:asc`                                  | Native Strapi sorting          |
| Search            | Client-side `String.includes()`                     | Strapi filters                                                                                | `GET /api/products?filters[name][$containsi]=searchTerm`            | Strapi `$containsi` operator   |
| Availability      | `product.is_available` boolean                      | `Product` boolean field                                                                       | Include in response, filter: `filters[is_available][$eq]=true`      | Simple boolean                 |
| Related products  | Client-side filter by category                      | `GET /api/products?filters[category][slug][$eq]=...&filters[id][$ne]=...&pagination[limit]=4` | Same category, exclude current                                      |

### Categories

| Frontend Feature  | Current Data Source    | Future Strapi Collection   | Recommended REST Endpoint        | Notes         |
| ----------------- | ---------------------- | -------------------------- | -------------------------------- | ------------- |
| Category grid     | `mockCategories` array | `Category` collection type | `GET /api/categories?populate=*` | With image    |
| Category dropdown | `mockCategories` array | Same as above              | Same endpoint                    | Can be cached |

### Cart

| Feature          | Current                | Future           | Notes                          |
| ---------------- | ---------------------- | ---------------- | ------------------------------ |
| Cart storage     | Zustand + localStorage | Keep client-side | No backend needed for cart     |
| Cart persistence | localStorage           | localStorage     | Strapi doesn't need cart state |

### Checkout / Orders

| Frontend Feature | Current Data Source          | Future Strapi Collection            | Recommended REST Endpoint             | Notes                                |
| ---------------- | ---------------------------- | ----------------------------------- | ------------------------------------- | ------------------------------------ |
| Wilaya list      | `wilayas.ts` hardcoded       | `Wilaya` collection or external API | `GET /api/wilayas` or Yalidine/ZR API | Needs real-time pricing              |
| Shipping calc    | Client-side from wilaya data | Backend calculation                 | Part of order creation                | Server should calculate              |
| Order submission | Mock delay + local state     | `Order` collection type             | `POST /api/orders`                    | Include customer info, items, totals |
| Order ID         | `HYD-${timestamp}`           | Strapi auto-generated or custom     | Return from `POST /api/orders`        | Use Strapi's ID or custom field      |

### Customer Info (Checkout Form)

| Field     | Current                | Future                  | Notes                                          |
| --------- | ---------------------- | ----------------------- | ---------------------------------------------- |
| Full name | Form state             | Part of `Order` payload | No separate customer collection needed for COD |
| Phone     | Form state (validated) | Part of `Order`         | Primary contact method                         |
| Email     | Form state (optional)  | Part of `Order`         | Optional                                       |
| Wilaya    | From `wilayas.ts`      | Relation to `Wilaya`    | Could be a relation                            |
| Commune   | Free text              | Free text or relation   | Free text is simpler                           |
| Address   | Free text              | Free text               | Required for home delivery                     |

### Static Content

| Page         | Current          | Future                      | Notes                                |
| ------------ | ---------------- | --------------------------- | ------------------------------------ |
| About us     | Hardcoded JSX    | Could be Strapi single type | `GET /api/about` for dynamic content |
| Contact info | Hardcoded in JSX | Could be Strapi single type | `GET /api/contact-info`              |
| Hero text    | Hardcoded in JSX | Could be Strapi single type | `GET /api/home-page`                 |

### Summary Table

```
┌─────────────────────┬──────────────────────┬──────────────────────────┐
│ Frontend Feature    │ Current Data Source   │ Future Strapi Collection │
├─────────────────────┼──────────────────────┼──────────────────────────┤
│ Products list       │ mockProducts array    │ Product (collection)     │
│ Product detail      │ mockProducts.find()   │ Product (single)         │
│ Categories          │ mockCategories array  │ Category (collection)    │
│ Cart                │ Zustand + localStorage│ (Stays client-side)      │
│ Checkout form       │ useState + manual     │ Order (POST)             │
│ Wilayas/shipping    │ wilayas.ts (static)   │ Wilaya or external API   │
│ Order confirmation  │ orderStore (in-mem)   │ Order (GET by ID)        │
│ Static pages        │ Hardcoded JSX         │ Single types (optional)  │
└─────────────────────┴──────────────────────┴──────────────────────────┘
```

---

## 12. Authentication Flow

### Current State: **NO AUTHENTICATION**

The application has **zero authentication**. There is:

- No login page
- No logout button
- No user registration
- No JWT tokens
- No session management
- No protected routes
- No user context/provider

### Why This Makes Sense

For a COD-based e-commerce store targeting the Algerian market:

- Customers don't need accounts to order
- COD eliminates payment authentication
- Phone number is the primary identifier

### What Would Need Auth (Future)

| Feature           | Auth Needed? | Notes                             |
| ----------------- | ------------ | --------------------------------- |
| Customer accounts | Optional     | Order history, saved addresses    |
| Admin dashboard   | Yes          | Strapi admin panel handles this   |
| Order tracking    | Maybe        | Could use order ID + phone lookup |
| Payment gateway   | Yes          | If adding online payment later    |

---

## 13. Forms

### Forms in the Application

**Only one form:** Checkout page (`routes/checkout.tsx`)

### Form Implementation

| Aspect            | Implementation                                |
| ----------------- | --------------------------------------------- |
| State management  | Manual `useState<FormState>`                  |
| Validation        | Manual validation function                    |
| Error display     | Conditional rendering per field               |
| Submission        | `onSubmit` handler with async mock            |
| Loading state     | `submitting` boolean                          |
| Reset             | Form resets on navigation (component unmount) |
| Controlled inputs | All inputs are controlled                     |

### Validation Rules

| Field        | Rule                       | Regex/Logic                                   |
| ------------ | -------------------------- | --------------------------------------------- |
| `fullName`   | Required                   | `form.fullName.trim()` must be non-empty      |
| `phone`      | Algerian mobile            | `/^0[567]\d{8}$/`                             |
| `email`      | Optional, valid format     | `/^\S+@\S+\.\S+$/`                            |
| `wilayaCode` | Required                   | Must be selected from dropdown                |
| `commune`    | Required                   | Non-empty trim                                |
| `address`    | Required for home delivery | Non-empty trim when `deliveryType === "home"` |

### Missing: React Hook Form

Despite `react-hook-form` and `@hookform/resolvers` being installed, they are **not used**. The checkout form uses manual state management and validation. This is functional but could be refactored to use `react-hook-form` for better validation, error messages, and less boilerplate.

---

## 14. Custom Hooks

### `useIsMobile()` — `src/hooks/use-mobile.tsx`

| Aspect         | Detail                                     |
| -------------- | ------------------------------------------ |
| Purpose        | Detect mobile viewport (< 768px)           |
| Input          | None                                       |
| Output         | `boolean`                                  |
| Internal logic | `window.matchMedia` with `change` listener |
| Dependencies   | React `useState`, `useEffect`              |
| SSR handling   | Starts as `undefined`, resolves on client  |
| Usage          | **NOT USED anywhere in the application**   |

**Potential improvements:**

- Export the breakpoint as a constant
- Add a `useMediaQuery` generic hook
- Use in Navbar for conditional rendering instead of CSS breakpoints

### No Other Custom Hooks

The `hooks/` directory contains only `use-mobile.tsx`. No data-fetching hooks, no form hooks, no authentication hooks exist.

---

## 15. Utilities

### `cn()` — `src/lib/utils.ts`

- **Purpose:** Merge Tailwind CSS classes with conflict resolution
- **Uses:** `clsx` for conditional joining, `tailwind-merge` for override resolution
- **Usage in project:** Not currently used by any component (all use template literals)
- **Why it exists:** shadcn/ui scaffolding. Will be useful when shadcn components are used.

### `formatPrice()` — `src/lib/format.ts`

- **Purpose:** Format price for Algerian Dinar display
- **Input:** `number`
- **Output:** `string` — Arabic-formatted number + " دج"
- **Example:** `formatPrice(1500)` → `"١٬٥٠٠ دج"`
- **Used in:** `ProductCard.tsx`, `CartDrawer.tsx`, `cart.tsx`, `checkout.tsx`, `order-success.tsx`, `product.$id.tsx`

### `renderErrorPage()` — `src/lib/error-page.ts`

- **Purpose:** Generate a complete HTML error page string
- **Used in:** `server.ts` (SSR error fallback), `start.ts` (middleware error fallback)

### `consumeLastCapturedError()` — `src/lib/error-capture.ts`

- **Purpose:** Retrieve the last captured error from the global error listener
- **Used in:** `server.ts` (to log the original error when h3 swallows it)

---

## 16. Styling System

### Architecture

```
Tailwind CSS v4 (CSS-first config)
├── @theme inline (CSS variable mappings)
├── @utility (custom utility classes)
├── @layer base (element defaults)
└── @custom-variant dark (dark mode hook — unused)
```

### Design Tokens

| Token                | Value     | Usage                     |
| -------------------- | --------- | ------------------------- |
| `--brand-navy`       | `#152558` | Primary text, backgrounds |
| `--brand-navy-dark`  | `#0d1a45` | Hover states              |
| `--brand-navy-light` | `#1e3470` | Light navy variant        |
| `--brand-cyan`       | `#00c4e2` | Accent color, CTAs        |
| `--brand-cyan-dark`  | `#00a8c4` | Hover states              |
| `--brand-cyan-light` | `#e0f8fd` | Light backgrounds         |
| `--surface-alt`      | `#f4fbfd` | Alternate surface         |
| `--surface-hero`     | `#f0f9fc` | Hero background           |
| `--border-subtle`    | `#e5f5fb` | Subtle borders            |

### Typography

- **Font:** Cairo (Google Fonts) — weights: 400, 500, 600, 700, 800
- **Direction:** RTL (`dir="rtl"`)
- **Language:** Arabic (`lang="ar"`)

### Custom Utilities

| Utility                   | Purpose                               |
| ------------------------- | ------------------------------------- |
| `container-hydora`        | max-width: 1280px, horizontal padding |
| `section-title-underline` | Heading with centered cyan underline  |
| `btn-primary`             | Navy filled button with hover         |
| `btn-cyan`                | Cyan filled button with glow shadow   |
| `btn-outline-navy`        | Outline button with hover fill        |
| `card-hydora`             | White card with shadow and hover lift |

### Responsive Strategy

- **Mobile-first** Tailwind breakpoints
- Navbar collapses to hamburger at `md` (768px)
- Product grid: 2 cols → 3 cols (md) → 4 cols (xl)
- Filter sidebar: hidden on mobile, slide-out panel instead
- AnnouncementBar: progressively hides items on smaller screens

### Dark Mode

Configured but **not implemented**. The `@custom-variant dark` exists in CSS but no toggle, no dark color values, no dark mode UI.

### Animations

- `tw-animate-css` provides animation utilities
- Card hover: `translateY(-4px)` + shadow increase
- Cart drawer: `animate-in slide-in-from-right`
- Image hover: `scale-105` zoom
- Category dropdown: `opacity` + `visible` transition
- Button hover: background-color transitions

---

## 17. Assets

### Static Assets

| File          | Path                  | Type      | Usage                       |
| ------------- | --------------------- | --------- | --------------------------- |
| `logo.PNG`    | `/public/logo.PNG`    | PNG image | Logo component (brand logo) |
| `favicon.ico` | `/public/favicon.ico` | ICO       | Browser tab icon            |

### External Assets

| Resource          | Source                | Purpose                    |
| ----------------- | --------------------- | -------------------------- |
| Cairo font        | Google Fonts CDN      | Primary typeface           |
| 8 Unsplash images | `images.unsplash.com` | Product photos (mock data) |

### Image Optimization

- **None** — All images are external URLs (Unsplash) loaded at full resolution
- No lazy loading attributes on `<img>` tags
- No `srcset` or responsive images
- No local image optimization pipeline

### Icons

- **Library:** Lucide React (`lucide-react`)
- **Usage:** Extensively across all components
- **No custom SVG icons**

---

## 18. Environment Variables

### Current State: **NO `.env` FILES**

The workspace search found **no `.env` files** in the project. The application has no environment variable configuration.

### Missing Environment Variables

When integrating with Strapi, the following will be needed:

| Variable                | Purpose                      | Example                 |
| ----------------------- | ---------------------------- | ----------------------- |
| `VITE_STRAPI_URL`       | Strapi backend URL           | `http://localhost:1337` |
| `VITE_STRAPI_API_TOKEN` | Strapi API token (if needed) | `...`                   |
| `VITE_SITE_URL`         | Production site URL          | `https://hydora.dz`     |

No `.env.example` file exists either.

---

## 19. Performance Review

### Rendering

| Aspect                | Status | Notes                                             |
| --------------------- | ------ | ------------------------------------------------- |
| Server-side rendering | ✅     | Via TanStack Start + Nitro                        |
| Client-side hydration | ✅     | React 19 hydrates SSR output                      |
| Memoization           | ❌     | No `React.memo`, `useMemo`, or `useCallback` used |

### `useMemo` Usage

- **`products.tsx`:** `filtered` products list — CORRECT usage for expensive filter computations
- **`product.$id.tsx`:** `related` products — Minor optimization
- **`checkout.tsx`:** `selectedWilaya` and `shipping` — CORRECT for derived state

### Missing Optimizations

| Issue                               | Impact                                | Fix                                  |
| ----------------------------------- | ------------------------------------- | ------------------------------------ |
| No `React.memo` on ProductCard      | Re-renders all cards on filter change | Wrap in `React.memo`                 |
| No `useCallback` for event handlers | New function refs each render         | Wrap callbacks                       |
| No image lazy loading               | All product images load eagerly       | Add `loading="lazy"`                 |
| No code splitting                   | All routes in single bundle           | TanStack Router can lazy-load routes |
| No bundle size analysis             | Unknown bundle size                   | Add `rollup-plugin-visualizer`       |

### Duplicate Code

- Quantity stepper UI is duplicated in `CartDrawer.tsx`, `cart.tsx`, and `product.$id.tsx`
- Empty cart state is duplicated in `CartDrawer.tsx`, `cart.tsx`, and `checkout.tsx`
- Trust badges pattern (icon + label) is repeated in `HeroSection.tsx` and `product.$id.tsx`

---

## 20. Code Quality Review

### Scores (1-10)

| Category               | Score | Explanation                                                                |
| ---------------------- | ----- | -------------------------------------------------------------------------- |
| Architecture           | 7/10  | Clean separation of concerns, but no service/API abstraction layer         |
| Naming                 | 8/10  | Consistent Arabic/English naming, clear file names                         |
| Consistency            | 7/10  | Consistent patterns but some duplication                                   |
| Readability            | 8/10  | Well-structured, clear component trees                                     |
| Maintainability        | 7/10  | Easy to understand, but mock data is scattered                             |
| Scalability            | 5/10  | No API abstraction means every component needs refactoring for backend     |
| SOLID Principles       | 6/10  | Single responsibility mostly followed, but components import data directly |
| Separation of Concerns | 6/10  | Routes mix data, UI, and state; no service layer                           |
| DRY                    | 5/10  | Significant duplication (quantity stepper, empty states)                   |
| KISS                   | 9/10  | Very simple, no over-engineering                                           |

### Strengths

- Clean component hierarchy
- TypeScript used throughout with proper types
- Well-documented inline comments (Arabic)
- Consistent file naming conventions
- TanStack Router used correctly with type-safe search params

### Weaknesses

- No API/service abstraction layer
- Mock data imported directly in components
- Form validation is manual (should use react-hook-form or zod)
- React Query is installed but completely unused
- Duplicate UI patterns without shared components

---

## 21. Security Review

### Findings

| Issue                                | Severity | Detail                                  |
| ------------------------------------ | -------- | --------------------------------------- |
| No authentication                    | Low      | Appropriate for COD-only store          |
| No sensitive data in code            | ✅ Safe  | All data is mock/public                 |
| No XSS vectors found                 | ✅ Safe  | React's JSX escaping prevents injection |
| No eval() or dangerouslySetInnerHTML | ✅ Safe  | Not used anywhere                       |
| Phone validation                     | ✅ Good  | Algerian phone regex enforces format    |
| Form validation                      | ✅ Good  | Client-side validation present          |
| No CSRF protection                   | Medium   | Will need for authenticated API calls   |
| No HTTPS enforcement                 | Low      | Relies on deployment platform           |
| localStorage for cart                | Low risk | No sensitive data in cart               |
| Logo path uses relative `../`        | Low      | Could break in different contexts       |

### Missing

- **No Content Security Policy (CSP)**
- **No API key/secret management** (will need `.env` for Strapi)
- **No rate limiting** (client-side only)

---

## 22. Dependency Analysis

### Core Dependencies (Actively Used)

| Package                  | Version   | Purpose              | Necessity                     |
| ------------------------ | --------- | -------------------- | ----------------------------- |
| react                    | ^19.2.0   | UI library           | Essential                     |
| react-dom                | ^19.2.0   | DOM rendering        | Essential                     |
| @tanstack/react-router   | ^1.170.16 | Routing              | Essential                     |
| @tanstack/react-start    | ^1.168.26 | SSR framework        | Essential                     |
| @tanstack/router-plugin  | ^1.168.18 | Route generation     | Essential                     |
| @tanstack/react-query    | ^5.101.1  | Data fetching        | **NOT USED** (but configured) |
| zustand                  | ^5.0.14   | State management     | Essential                     |
| tailwindcss              | ^4.2.1    | Styling              | Essential                     |
| @tailwindcss/vite        | ^4.2.1    | Tailwind Vite plugin | Essential                     |
| lucide-react             | ^0.575.0  | Icons                | Essential                     |
| sonner                   | ^2.0.7    | Toasts               | Essential                     |
| clsx                     | ^2.1.1    | Class utilities      | Used by `cn()`                |
| tailwind-merge           | ^3.5.0    | Class merging        | Used by `cn()`                |
| class-variance-authority | ^0.7.1    | Component variants   | **NOT USED**                  |
| tw-animate-css           | ^1.3.4    | CSS animations       | Used in styles.css            |

### Unused Dependencies (Can Be Removed)

| Package                | Reason                                                |
| ---------------------- | ----------------------------------------------------- |
| react-hook-form        | Installed but manual form state used instead          |
| @hookform/resolvers    | Companion to react-hook-form                          |
| zod                    | Installed but no schemas defined                      |
| valibot                | Alternative to zod, also unused                       |
| recharts               | Chart library, no charts in app                       |
| date-fns               | Date formatting, could be useful for order dates      |
| embla-carousel-react   | Carousel, no carousel in app                          |
| react-day-picker       | Date picker, no date input in app                     |
| react-resizable-panels | Resizable panels, unused                              |
| input-otp              | OTP input, unused                                     |
| cmdk                   | Command palette, unused                               |
| plugin-react           | Appears to be a security package, likely accidental   |
| vite-tsconfig-paths    | Path alias resolution, may be handled by Vite already |

### Radix UI Components (50+ installed, mostly unused)

Only the ones that might be useful:

- `@radix-ui/react-dialog` — Could replace CartDrawer's custom implementation
- `@radix-ui/react-slot` — Used by shadcn Button component

### Dev Dependencies

All dev dependencies are appropriate and actively used by the build/lint toolchain.

---

## 23. Build Process

### Build Pipeline

```
vite build
│
├── 1. TanStack Router plugin: Generates routeTree.gen.ts
├── 2. Vite resolves all imports
├── 3. TypeScript type checking (via tsc or IDE)
├── 4. Tailwind CSS: Scans source files, generates CSS
├── 5. React JSX transformation
├── 6. Bundling (Rollup under the hood)
│   ├── Code splitting (manual configuration needed)
│   ├── Tree shaking (automatic)
│   └── Minification (automatic in production)
├── 7. SSR bundle generated (for server.ts)
├── 8. Output to dist/ or .output/
└── 9. Nitro server ready for deployment
```

### Build Scripts

| Script      | Command                         | Purpose                          |
| ----------- | ------------------------------- | -------------------------------- |
| `build`     | `vite build`                    | Production build                 |
| `build:dev` | `vite build --mode development` | Dev build (less optimization)    |
| `preview`   | `vite preview`                  | Preview production build locally |

### Deployment

TanStack Start with Nitro can deploy to:

- Node.js server
- Serverless platforms (Vercel, Netlify, Cloudflare Workers)
- Docker containers

No deployment configuration exists in the project yet.

---

## 24. Architecture Diagrams

### Overall Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        BROWSER                              │
│  ┌───────────────────────────────────────────────────────┐  │
│  │                    React App                           │  │
│  │  ┌─────────┐  ┌──────────┐  ┌────────────────────┐   │  │
│  │  │ Router  │  │  Zustand │  │  React Query       │   │  │
│  │  │(TanStack│  │  Stores  │  │  (configured,      │   │  │
│  │  │ Router) │  │          │  │   unused)          │   │  │
│  │  └────┬────┘  └────┬─────┘  └────────────────────┘   │  │
│  │       │            │                                   │  │
│  │       ▼            ▼                                   │  │
│  │  ┌──────────────────────────────────────────────┐     │  │
│  │  │              Components                       │     │  │
│  │  │  Layout │ Home │ Products │ Cart │ Checkout  │     │  │
│  │  └──────────────────────────────────────────────┘     │  │
│  │                         │                              │  │
│  └─────────────────────────┼──────────────────────────────┘  │
│                            │                                 │
│                   mock-data.ts                               │
│                   (static arrays)                            │
└─────────────────────────────────────────────────────────────┘
```

### Component Hierarchy (Simplified)

```
RootShell
└── RootComponent
    ├── AnnouncementBar
    ├── Navbar
    │   ├── Logo
    │   └── Navigation Links
    ├── Outlet (page content)
    │   ├── HomePage
    │   │   ├── HeroSection
    │   │   ├── CategoriesRow
    │   │   ├── BestSellerProducts
    │   │   │   └── ProductCard (×8)
    │   │   └── TrustBadges
    │   ├── ProductsPage
    │   │   ├── FiltersPanel
    │   │   └── ProductCard (×N)
    │   ├── ProductDetailPage
    │   │   └── ProductCard (related ×4)
    │   ├── CartPage
    │   ├── CheckoutPage
    │   ├── OrderSuccessPage
    │   ├── AboutPage
    │   └── ContactPage
    ├── Footer
    │   └── Logo
    ├── CartDrawer
    └── Toaster
```

### Request Flow (Future Strapi Integration)

```
Component
    │
    ▼
useQuery({ queryKey: ['products'], queryFn: fetchProducts })
    │
    ▼
fetchProducts()
    │ GET /api/products?populate=*
    ▼
Strapi Backend (localhost:1337)
    │
    ▼
JSON Response { data: [...], meta: {...} }
    │
    ▼
React Query Cache
    │
    ▼
Component re-renders with data
```

### Application Lifecycle

```
Server Start
    │
    ├── vite.config.ts plugins initialized
    ├── routeTree.gen.ts auto-generated
    ├── Nitro server starts
    │
    ▼
First Request
    │
    ├── server.ts fetch() handler
    ├── start.ts error middleware
    ├── router.tsx: getRouter()
    │   └── QueryClient created
    ├── SSR renders __root.tsx
    │   └── Route matched → component rendered
    ├── HTML sent to browser
    │
    ▼
Client Hydration
    │
    ├── React 19 hydrates SSR HTML
    ├── Zustand restores from localStorage
    ├── Event listeners attached
    ├── App becomes interactive
    │
    ▼
User Navigation (SPA)
    │
    ├── TanStack Router handles client-side
    ├── No full page reload
    ├── New route component rendered
    └── Scroll restored
```

---

## 25. Learning Roadmap

### Prerequisites

- React fundamentals (components, hooks, JSX)
- TypeScript basics (interfaces, types, generics)
- Tailwind CSS basics (utility classes)
- Understanding of RTL (right-to-left) layouts

### Recommended Learning Order

| Order | Topic                  | Files to Read                                         | Difficulty         |
| ----- | ---------------------- | ----------------------------------------------------- | ------------------ |
| 1     | Project setup & config | `package.json`, `vite.config.ts`, `tsconfig.json`     | ⭐ Easy            |
| 2     | Design system & styles | `styles.css`                                          | ⭐ Easy            |
| 3     | Data layer (mocks)     | `lib/mock-data.ts`, `lib/wilayas.ts`                  | ⭐ Easy            |
| 4     | State management       | `store/cart-store.ts`, `store/order-store.ts`         | ⭐⭐ Easy-Medium   |
| 5     | Root layout & routing  | `routes/__root.tsx`, `router.tsx`, `routeTree.gen.ts` | ⭐⭐ Medium        |
| 6     | Layout components      | `components/layout/*.tsx`                             | ⭐⭐ Medium        |
| 7     | Home page              | `routes/index.tsx`, `components/home/*.tsx`           | ⭐⭐ Medium        |
| 8     | Product components     | `components/products/ProductCard.tsx`                 | ⭐⭐ Medium        |
| 9     | Product listing        | `routes/products.tsx`                                 | ⭐⭐⭐ Medium-Hard |
| 10    | Product detail         | `routes/product.$id.tsx`                              | ⭐⭐⭐ Medium-Hard |
| 11    | Cart system            | `components/cart/CartDrawer.tsx`, `routes/cart.tsx`   | ⭐⭐⭐ Medium-Hard |
| 12    | Checkout flow          | `routes/checkout.tsx`                                 | ⭐⭐⭐ Hard        |
| 13    | Order flow             | `routes/order-success.tsx`                            | ⭐⭐ Medium        |
| 14    | Static pages           | `routes/about.tsx`, `routes/contact.tsx`              | ⭐⭐ Medium        |
| 15    | SSR & error handling   | `server.ts`, `start.ts`, `lib/error-*.ts`             | ⭐⭐⭐⭐ Hard      |

### Files to Ignore Initially

- `src/components/ui/*` — 50+ shadcn components, none are used
- `src/hooks/use-mobile.tsx` — Not used anywhere
- `routeTree.gen.ts` — Auto-generated, don't read manually

### Key Concepts to Understand

1. **TanStack Router file-based routing** — How `createFileRoute()` works and how `$id` creates dynamic segments
2. **Zustand persist middleware** — How cart data survives page refreshes
3. **Composite cart key** — `productId-color-size` triplet identifies unique cart items
4. **TanStack Start SSR** — How `server.ts`, `start.ts`, and `__root.tsx` work together
5. **Route context** — How `queryClient` is passed from router to all routes

---

## 26. Backend Preparation Checklist

### ✅ Already Ready

- [x] Complete UI for all pages
- [x] Form validation logic
- [x] Cart management (client-side)
- [x] RTL/Arabic localization
- [x] Responsive design
- [x] SEO meta tags per route
- [x] Error handling (404, 500)
- [x] Shipping calculation logic (with mock data)

### ❌ Needs Modification

- [ ] **Replace all `import { mockProducts }` with API calls** (7 files affected)
- [ ] **Replace all `import { mockCategories }` with API calls** (3 files affected)
- [ ] **Replace checkout mock delay with real API POST**
- [ ] **Add order API call** instead of local `orderStore`
- [ ] **Add React Query hooks** (`useQuery`, `useMutation`) for all data
- [ ] **Create `.env` file** with `VITE_STRAPI_URL`
- [ ] **Create API service layer** (e.g., `src/services/api.ts`) to abstract fetch calls
- [ ] **Add loading states** for all data-dependent components
- [ ] **Add error states** for API failures
- [ ] **Wire up wilaya shipping** to real-time API or Strapi collection

### ❌ Needs Refactoring

- [ ] Extract a **QuantityStepper** shared component (duplicated 3 times)
- [ ] Extract an **EmptyState** shared component (duplicated 3 times)
- [ ] Create an **API client** with base URL, error handling, auth headers
- [ ] Move **product filtering to server-side** (Strapi filters)
- [ ] Add **pagination** for product listing (not needed for 8 items, but needed for real catalog)

### ❌ What Should Be Configurable

- [ ] `VITE_STRAPI_URL` — Strapi backend URL
- [ ] `VITE_STRAPI_API_TOKEN` — API token for authenticated requests
- [ ] `VITE_SITE_URL` — Production URL for OG tags
- [ ] Shipping API endpoint (if using Yalidine/ZR-Express)

---

## 27. Refactoring Opportunities

### High Priority

| Issue                                    | Impact                                      | Effort |
| ---------------------------------------- | ------------------------------------------- | ------ |
| Create API service layer                 | **Critical** for Strapi integration         | Medium |
| Replace all mock imports with API calls  | **Critical** — entire data layer changes    | High   |
| Add React Query hooks for data fetching  | **Critical** — enables caching & refetching | Medium |
| Extract shared QuantityStepper component | Reduces duplication, fixes consistency      | Low    |
| Extract shared EmptyState component      | 3 instances → 1 component                   | Low    |

### Medium Priority

| Issue                              | Impact                                 | Effort |
| ---------------------------------- | -------------------------------------- | ------ |
| Use react-hook-form for checkout   | Better validation, less boilerplate    | Medium |
| Add zod schema for form validation | Type-safe validation                   | Low    |
| Add React.memo to ProductCard      | Performance for large grids            | Low    |
| Add image lazy loading             | Page load performance                  | Low    |
| Fix Logo image path (`/logo.PNG`)  | Prevent broken images in nested routes | Low    |
| Add `.env.example`                 | Documentation for new developers       | Low    |
| Remove unused dependencies         | Smaller bundle, faster install         | Low    |

### Low Priority

| Issue                         | Impact               | Effort |
| ----------------------------- | -------------------- | ------ |
| Implement dark mode           | Nice to have         | Medium |
| Add unit tests                | Quality assurance    | High   |
| Add Storybook for components  | Development workflow | High   |
| Route-level code splitting    | Bundle size          | Medium |
| Add PWA support               | Offline capability   | High   |
| Internationalization (French) | Market reach         | High   |

---

## 28. Potential Bugs

### Confirmed Issues

| #   | Issue                                                                | Location                          | Severity | Fix                             |
| --- | -------------------------------------------------------------------- | --------------------------------- | -------- | ------------------------------- |
| 1   | Logo image uses relative path `../../../logo.PNG`                    | `components/layout/Logo.tsx`      | Medium   | Change to `/logo.PNG`           |
| 2   | Product detail `img` uses product image for all 4 gallery thumbnails | `routes/product.$id.tsx` line ~95 | Low      | No multi-image data in mocks    |
| 3   | Cart page total doesn't include shipping                             | `routes/cart.tsx`                 | Low      | Shipping calculated at checkout |

### Potential Issues

| #   | Issue                                      | Risk         | Detail                                                 |
| --- | ------------------------------------------ | ------------ | ------------------------------------------------------ |
| 1   | **All products have the same description** | Data quality | `mock-data.ts` uses one description for all 8 products |
| 2   | **No timestamp on cart items**             | Feature      | Can't show "added X minutes ago"                       |
| 3   | **No debounce on search**                  | Performance  | Every keystroke triggers re-filter                     |
| 4   | **Zustand persist can fail**               | Edge case    | If localStorage is full or disabled                    |
| 5   | **Race condition on checkout**             | Edge case    | User could modify cart between page load and submit    |
| 6   | **No max quantity limit**                  | Edge case    | Could add 999 items                                    |
| 7   | **Empty search shows all products**        | UX           | No distinction between "no query" and "no results"     |

### Loading States

- **All components are synchronous** — No loading spinners exist because all data is static
- After Strapi integration, every product/category component needs loading state
- Current `submitting` state in checkout is the only loading state in the app

### Error Handling

- Route-level error boundaries exist (in `__root.tsx`)
- SSR errors are caught with custom error page
- **No API error handling** because no API calls exist yet
- **No network error recovery** — Will need retry logic for Strapi calls

---

## 29. Glossary

| Term                | Definition (in this project's context)                                              |
| ------------------- | ----------------------------------------------------------------------------------- |
| **TanStack Start**  | Full-stack React framework providing SSR, file-based routing, and server middleware |
| **TanStack Router** | Type-safe router with file-based route generation                                   |
| **Nitro**           | Server engine used by TanStack Start for production deployments                     |
| **h3**              | HTTP framework used by Nitro internally                                             |
| **Zustand**         | Lightweight state management library with built-in persistence                      |
| **React Query**     | Server state management library for fetching, caching, and syncing data             |
| **shadcn/ui**       | Component collection built on Radix UI primitives with Tailwind styling             |
| **Radix UI**        | Headless, accessible UI primitives                                                  |
| **RTL**             | Right-to-Left text direction (Arabic)                                               |
| **COD**             | Cash on Delivery — payment method                                                   |
| **Wilaya**          | Algerian administrative division (province/state), 58 total                         |
| **Stop Desk**       | Delivery to a pickup point instead of home address                                  |
| **Composite Key**   | `productId-color-size` used as unique identifier for cart items                     |
| **Route Context**   | Data passed from router to all routes (here: `queryClient`)                         |
| **Route Loader**    | Function that loads data before rendering a route                                   |
| **Search Params**   | URL query parameters managed by the router                                          |
| **SSR**             | Server-Side Rendering — HTML generated on the server                                |
| **Hydration**       | Process of attaching React event listeners to server-rendered HTML                  |
| **Tree Shaking**    | Removing unused code from the final bundle                                          |

---

## 30. Final Summary

### How the Project Works

HYDORA is a fully-functional e-commerce storefront that currently operates entirely on mock data. It uses **TanStack Start** for SSR and routing, **Zustand** for cart state, and **Tailwind CSS** for styling. The entire UI is in Arabic with RTL layout. Products, categories, and shipping data are hardcoded in static TypeScript files. The checkout flow simulates order placement with a delay instead of calling a backend API.

### How Data Moves

```
Static TypeScript arrays (mock-data.ts, wilayas.ts)
    ↓ (direct import)
React Components + Zustand Stores
    ↓ (user interaction)
Cart state persisted to localStorage
    ↓ (checkout submit)
Mock delay → Order stored in memory → Cart cleared → Success page
```

### How Pages Communicate

- **Navigation:** Via TanStack Router `<Link>` components (no full page reloads)
- **Shared State:** Via Zustand stores (`useCartStore`, `useOrderStore`)
- **URL State:** Category filters communicated via URL search params
- **Head Management:** Each route independently manages its `<head>` meta tags

### How Components Communicate

- **Parent → Child:** Props (e.g., `ProductCard` receives `product` prop)
- **Child → Parent:** Callbacks (e.g., checkout form updates)
- **Sibling → Sibling:** Via shared Zustand store (e.g., `Navbar` and `CartDrawer` both read `useCartStore`)
- **Global → Any:** Toast notifications via `sonner` (imperative API)

### What You Must Understand Before Integrating Strapi

1. **Every component that imports `mockProducts` or `mockCategories` needs to be refactored** to use `useQuery` hooks instead
2. **A new API service layer** (`src/services/api.ts`) should be created to abstract fetch calls, handle errors, and manage auth
3. **React Query must be activated** — it's already configured in `router.tsx` and `__root.tsx`, you just need to write the query hooks
4. **The checkout flow** currently simulates orders with `setTimeout` — this needs to become a real `POST` to Strapi
5. **Shipping data** (`wilayas.ts`) needs to either come from Strapi or an external delivery API

### The Five Most Important Architectural Ideas

1. **Everything is mock data** — `src/lib/mock-data.ts` is the single source of truth. The first step in Strapi integration is replacing this file's imports with API calls.
2. **TanStack Router is the backbone** — Routes are file-based, type-safe, and auto-generated. Understanding `createFileRoute()`, `loader()`, and `validateSearch()` is essential.
3. **Cart is client-only** — Zustand with localStorage persistence. The cart never touches a server. This is intentional for COD e-commerce.
4. **SSR is active but cosmetic** — TanStack Start renders on the server, but since all data is static imports, SSR provides no data-fetching benefit. When Strapi is connected, SSR will actually fetch data.
5. **The codebase is designed for a backend** — React Query is already configured, route loaders exist, and the checkout `setTimeout` comment explicitly says "replace with Strapi POST later." The foundation is ready.

---

## Scores

### Frontend Readiness Score: **72/100**

**Explanation:** The frontend is fully functional as a standalone application. All pages render correctly, the cart works, checkout validation is solid, and the UI is polished. However, it cannot go to production because:

- All data is mock (no real products)
- No backend integration
- No authentication for admin
- No real order processing
- No payment processing
- No analytics or tracking
- No error tracking (Sentry, etc.)
- Missing loading and error states for async operations

### Maintainability Score: **65/100**

**Explanation:** The code is clean and well-structured but has significant technical debt:

- Duplicated UI patterns (quantity stepper, empty states)
- No shared component library usage despite having shadcn installed
- Mock data imported everywhere (hard to refactor)
- No API abstraction layer
- 15+ unused dependencies
- No tests
- Manual form validation instead of using installed libraries
- The good: TypeScript, consistent patterns, clear naming, good comments

### Strapi Integration Readiness Score: **58/100**

**Explanation:** The project is partially ready for Strapi integration:

- ✅ React Query already configured and mounted
- ✅ Route loaders ready for async data
- ✅ Clear data model (products, categories, orders)
- ✅ TypeScript types align with Strapi collection patterns
- ✅ Comment markers indicate where API calls should go
- ❌ No API service layer or fetch abstraction
- ❌ All 10+ files import mock data directly
- ❌ No loading/error states for async operations
- ❌ No environment variable configuration
- ❌ No pagination logic
- ❌ No image handling for Strapi media
- ❌ No auth token management

**Integration effort estimate:** 3-5 days for a complete Strapi integration, assuming Strapi collections are already set up with matching schemas.

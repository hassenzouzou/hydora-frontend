# Open Graph Meta Tags Integration Guide

This guide explains how Open Graph (OG) meta tags are integrated in the HYDORA project and how to extend or modify them.

---

## 1. Overview

Open Graph meta tags control how your site appears when shared on social media platforms (Facebook, Twitter/X, LinkedIn, Telegram, etc.). The HYDORA project implements OG tags at two levels:

- **Static tags** in the root route (`__root.tsx`) — apply to all pages by default
- **Dynamic tags** via the `useSeoMeta` hook — override static tags per page or per component

---

## 2. OG Tag Structure

Every page should include the following OG meta tags:

| Tag                   | Purpose                           | Example                                 |
| --------------------- | --------------------------------- | --------------------------------------- |
| `og:title`            | Title shown in the preview        | `"HYDORA — قوارير حرارية عالية الجودة"` |
| `og:description`      | Description shown below the title | `"ترطيب يدوم معك أينما ذهبت."`          |
| `og:image`            | Preview image URL (absolute)      | `"https://hydora.dz/og-img.png"`        |
| `og:url`              | Canonical URL of the page         | `"https://hydora.dz/products"`          |
| `og:type`             | Content type                      | `"website"` or `"product"`              |
| `og:site_name`        | Site name                         | `"HYDORA"`                              |
| `twitter:card`        | Twitter card type                 | `"summary_large_image"`                 |
| `twitter:title`       | Twitter-specific title            | Same as `og:title`                      |
| `twitter:description` | Twitter-specific description      | Same as `og:description`                |
| `twitter:image`       | Twitter-specific image            | Same as `og:image`                      |

---

## 3. Static OG Tags (Root Route)

The root route at `src/routes/__root.tsx` defines default OG tags that apply to all pages unless overridden.

### Location

```
src/routes/__root.tsx  →  head() → meta[]
```

### What was added

The following tags were added to the root route's `head()` function:

```tsx
{ property: "og:image", content: "https://hydora.dz/og-img.png" },
{ property: "og:url", content: "https://hydora.dz" },
{ property: "og:site_name", content: "HYDORA" },
{ name: "twitter:site", content: "@hydora" },
{ name: "twitter:creator", content: "@hydora" },
{ name: "twitter:title", content: "HYDORA — Stay Refreshed" },
{ name: "twitter:description", content: "..." },
{ name: "twitter:image", content: "https://hydora.dz/og-img.png" },
{ name: "theme-color", content: "#0e7490" },
```

The `og:image` points to `/public/og-img.png`, which is served at `https://hydora.dz/og-img.png`.

---

## 4. Per-Route OG Tags

Each route file defines its own `head()` function that **merges** with the root route's meta tags. Route-specific tags override the root defaults.

### Example: Products Page (`src/routes/products.tsx`)

```tsx
head: () => ({
  meta: [
    { title: "المنتجات — HYDORA" },
    { name: "description", content: "تسوق مجموعة HYDORA من القوارير الحرارية عالية الجودة." },
    { property: "og:title", content: "المنتجات — HYDORA" },
    { property: "og:description", content: "تسوق مجموعة HYDORA من القوارير الحرارية عالية الجودة." },
    { property: "og:type", content: "website" },
    { property: "og:url", content: "https://hydora.dz/products" },
    { property: "og:image", content: "https://hydora.dz/og-img.png" },
    { property: "og:site_name", content: "HYDORA" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:site", content: "@hydora" },
    { name: "twitter:creator", content: "@hydora" },
    { name: "twitter:title", content: "المنتجات — HYDORA" },
    { name: "twitter:description", content: "تسوق مجموعة HYDORA من القوارير الحرارية عالية الجودة." },
    { name: "twitter:image", content: "https://hydora.dz/og-img.png" },
  ],
}),
```

### All routes with their OG coverage:

| Route            | OG Image              | OG URL | OG Type   | Dynamic     |
| ---------------- | --------------------- | ------ | --------- | ----------- |
| `/` (home)       | ✅                    | ✅     | `website` | ❌ (static) |
| `/products`      | ✅                    | ✅     | `website` | ❌ (static) |
| `/product/$id`   | ✅ (dynamic via hook) | ✅     | `product` | ✅          |
| `/checkout`      | ✅                    | ✅     | `website` | ❌ (static) |
| `/cart`          | ✅                    | ✅     | `website` | ❌ (static) |
| `/about`         | ✅                    | ✅     | `website` | ❌ (static) |
| `/contact`       | ✅                    | ✅     | `website` | ❌ (static) |
| `/order-success` | ✅                    | ✅     | `website` | ❌ (static) |

---

## 5. Dynamic OG Tags with `useSeoMeta` Hook

For pages with dynamic content (like product detail pages), static `head()` tags are insufficient because the product name, description, and image change per product. The `useSeoMeta` hook solves this.

### Hook Location

```
src/hooks/use-seo.ts
```

### How It Works

The hook uses `useEffect` to update `document.title` and `<meta>` elements in the DOM when the component renders with new data.

### Usage in Product Detail Page

```tsx
import { useSeoMeta } from "@/hooks/use-seo";

function ProductDetailPage({ product }: { product: Product }) {
  // ... existing logic ...

  useSeoMeta({
    title: `${product.name} — HYDORA`,
    description: product.description?.slice(0, 160) ?? "...",
    ogTitle: product.name,
    ogDescription: product.description?.slice(0, 200) ?? "...",
    ogImage: fullImageUrl,
    ogUrl: `https://hydora.dz/product/${product.id}`,
    ogType: "product",
    twitterCard: "summary_large_image",
    twitterTitle: product.name,
    twitterDescription: product.description?.slice(0, 200) ?? "...",
    twitterImage: fullImageUrl,
  });

  // ... rest of component ...
}
```

### Hook API

```ts
interface SeoMeta {
  title?: string;
  description?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogUrl?: string;
  ogType?: string;
  twitterCard?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
}

function useSeoMeta(meta: SeoMeta): void;
```

---

## 6. The OG Image (`/public/og-img.png`)

The OG preview image is located at:

```
/public/og-img.png
```

### Requirements for OG Images

| Requirement                 | Value                           |
| --------------------------- | ------------------------------- |
| Minimum size                | 1200 × 630 pixels (recommended) |
| Maximum size                | 8 MB                            |
| Aspect ratio                | 1.91:1 (landscape)              |
| Format                      | PNG or JPEG                     |
| Accessible via absolute URL | Yes                             |

### Customizing the OG Image Per Page

To use a different image for a specific page, set `og:image` in that page's `head()` or pass a different URL to `useSeoMeta()`.

For product pages, the hook dynamically sets `og:image` to the product's first image URL.

---

## 7. Header Structure (SEO Best Practice)

Each page follows a consistent heading hierarchy:

```
h1 — Page title (one per page)
  └── h2 — Section headings
        └── h3 — Subsection headings
```

### Examples

**Home page:**

- `h1` — Hero headline ("ترطيب يدوم معك أينما ذهبت")
- `h2` — "الأكثر مبيعاً" (Best Sellers section)

**Products page:**

- `h1` — "المنتجات"

**Product detail:**

- `h1` — Product name
- `h2` — "منتجات مشابهة" (Related products)

**Cart:**

- `h1` — "سلة التسوق"

**Checkout:**

- `h1` — "إتمام الطلب"
- `h2` — "معلومات التوصيل" / "ملخص الطلب"

---

## 8. Adding OG Tags to a New Route

To add complete OG tags to a new route:

### Step 1: Add a `head()` function to the route

```tsx
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/your-route")({
  head: () => ({
    meta: [
      { title: "Page Title — HYDORA" },
      { name: "description", content: "Page description here." },
      { property: "og:title", content: "Page Title — HYDORA" },
      { property: "og:description", content: "Page description here." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://hydora.dz/your-route" },
      { property: "og:image", content: "https://hydora.dz/og-img.png" },
      { property: "og:site_name", content: "HYDORA" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@hydora" },
      { name: "twitter:creator", content: "@hydora" },
      { name: "twitter:title", content: "Page Title — HYDORA" },
      { name: "twitter:description", content: "Page description here." },
      { name: "twitter:image", content: "https://hydora.dz/og-img.png" },
    ],
  }),
  component: YourPageComponent,
});
```

### Step 2: If the page has dynamic content, use `useSeoMeta`

```tsx
import { useSeoMeta } from "@/hooks/use-seo";

function YourPageComponent() {
  const data = useYourData();

  useSeoMeta({
    title: `${data.name} — HYDORA`,
    description: data.description,
    ogTitle: data.name,
    ogDescription: data.description,
    ogImage: data.imageUrl,
    ogUrl: `https://hydora.dz/your-route/${data.id}`,
    ogType: "website",
    twitterCard: "summary_large_image",
    twitterTitle: data.name,
    twitterDescription: data.description,
    twitterImage: data.imageUrl,
  });

  return <div>...</div>;
}
```

### Step 3: Verify the tags render correctly

1. Run the dev server: `npm run dev`
2. Open the page in a browser
3. Right-click → View Source → search for `og:` tags
4. Or use the [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/) to test

---

## 9. Testing OG Tags

### Facebook Sharing Debugger

1. Go to https://developers.facebook.com/tools/debug/
2. Enter your page URL
3. Click "Debug"
4. The debugger will scrape the page and show the OG tags it found
5. Click "Scrape Again" if you recently updated tags

### Twitter Card Validator

1. Go to https://cards-dev.twitter.com/validator
2. Enter your page URL
3. Click "Preview" to see how the tweet will look

### LinkedIn Post Inspector

1. Go to https://www.linkedin.com/post-inspector/
2. Enter your page URL
3. Click "Inspect" to see the preview

---

## 10. Updating the OG Image

To change the default OG image:

1. Replace `/public/og-img.png` with your new image
2. Ensure the image meets the requirements (1200×630px, PNG/JPEG, <8MB)
3. Clear any CDN or cache if applicable
4. Test with the debuggers above

To use a custom OG image for a specific page, override `og:image` in that page's `head()` or `useSeoMeta()` call.

---

## 11. Environment Variables

The site URL is currently hardcoded as `https://hydora.dz`. To make it configurable, add a `.env` variable:

```env
VITE_SITE_URL=https://hydora.dz
```

Then reference it in meta tags:

```tsx
{ property: "og:url", content: `${import.meta.env.VITE_SITE_URL}/products` }
```

This allows different URLs for development, staging, and production environments.

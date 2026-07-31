import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import { Toaster } from "sonner";

import appCss from "../styles.css?url";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/cart/CartDrawer";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-navy">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-navy">الصفحة غير موجودة</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          الصفحة التي تبحث عنها غير متوفرة أو تم نقلها.
        </p>
        <div className="mt-6">
          <a href="/" className="btn-primary">
            العودة للرئيسية
          </a>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {}, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold text-navy">حدث خطأ ما</h1>
        <p className="mt-2 text-sm text-muted-foreground">لم يتم تحميل الصفحة، حاول مرة أخرى.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="btn-primary"
          >
            حاول مرة أخرى
          </button>
          <a href="/" className="btn-outline-navy">
            الرئيسية
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "HYDORA — قوارير حرارية عالية الجودة | Stay Refreshed" },
      {
        name: "description",
        content:
          "HYDORA — قوارير حرارية عالية الجودة، تصميم أنيق وأداء استثنائي. توصيل لجميع الولايات، الدفع عند الاستلام.",
      },
      { name: "author", content: "HYDORA" },
      { name: "robots", content: "index, follow" },
      { property: "og:title", content: "HYDORA — Stay Refreshed" },
      {
        property: "og:description",
        content: "قوارير حرارية عالية الجودة — ترطيب يدوم معك أينما ذهبت.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://hydora.dz" },
      { property: "og:image", content: "https://hydora.dz/og-img.png" },
      { property: "og:site_name", content: "HYDORA" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@hydora" },
      { name: "twitter:creator", content: "@hydora" },
      { name: "twitter:title", content: "HYDORA — Stay Refreshed" },
      {
        name: "twitter:description",
        content: "قوارير حرارية عالية الجودة — ترطيب يدوم معك أينما ذهبت.",
      },
      { name: "twitter:image", content: "https://hydora.dz/og-img.png" },
      {
        name: "theme-color",
        content: "#0e7490",
      },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cairo:wght@400;500;600;700;800&display=swap",
      },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      { rel: "canonical", href: "https://hydora.dz" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex min-h-screen flex-col bg-background">
        <AnnouncementBar />
        <Navbar />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
      </div>
      <CartDrawer />
      <Toaster
        position="top-center"
        richColors
        dir="rtl"
        toastOptions={{ style: { fontFamily: "Cairo, sans-serif" } }}
      />
    </QueryClientProvider>
  );
}

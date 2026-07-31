import { useEffect } from "react";

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

const SITE_URL = "https://hydora.dz";

export function useSeoMeta(meta: SeoMeta) {
  useEffect(() => {
    if (meta.title) {
      document.title = meta.title;
    }

    const updateOrCreate = (selector: string, attrs: Record<string, string>) => {
      let el = document.querySelector(selector) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        for (const [key, value] of Object.entries(attrs)) {
          el.setAttribute(key, value);
        }
        document.head.appendChild(el);
      } else {
        for (const [key, value] of Object.entries(attrs)) {
          el.setAttribute(key, value);
        }
      }
    };

    if (meta.description) {
      updateOrCreate('meta[name="description"]', { content: meta.description });
    }

    if (meta.ogTitle) {
      updateOrCreate('meta[property="og:title"]', { content: meta.ogTitle });
    }

    if (meta.ogDescription) {
      updateOrCreate('meta[property="og:description"]', {
        content: meta.ogDescription,
      });
    }

    if (meta.ogImage) {
      updateOrCreate('meta[property="og:image"]', { content: meta.ogImage });
    }

    if (meta.ogUrl) {
      updateOrCreate('meta[property="og:url"]', { content: meta.ogUrl });
    }

    if (meta.ogType) {
      updateOrCreate('meta[property="og:type"]', { content: meta.ogType });
    }

    if (meta.twitterCard) {
      updateOrCreate('meta[name="twitter:card"]', {
        content: meta.twitterCard,
      });
    }

    if (meta.twitterTitle) {
      updateOrCreate('meta[name="twitter:title"]', {
        content: meta.twitterTitle,
      });
    }

    if (meta.twitterDescription) {
      updateOrCreate('meta[name="twitter:description"]', {
        content: meta.twitterDescription,
      });
    }

    if (meta.twitterImage) {
      updateOrCreate('meta[name="twitter:image"]', {
        content: meta.twitterImage,
      });
    }

    return () => {};
  }, [meta]);
}

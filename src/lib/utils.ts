const STRAPI_URL = import.meta.env.VITE_STRAPI_URL || "http://localhost:1337";

export function getStrapiMedia(url: string | null | undefined) {
  if (!url) return "/logo.webp";

  if (url.startsWith("http") || url.startsWith("//")) {
    return url;
  }

  return `${STRAPI_URL}${url}`;
}

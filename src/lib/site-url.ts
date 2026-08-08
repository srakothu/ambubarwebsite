const fallbackSiteUrl = "https://ambubar.vercel.app";
const developmentLoopbackHosts = new Set(["localhost", "127.0.0.1", "[::1]"]);

function normalizeSiteUrl(value: string | undefined) {
  if (!value?.trim()) {
    return fallbackSiteUrl;
  }

  try {
    const url = new URL(value.trim());

    if (url.protocol === "https:") {
      return url.origin;
    }

    if (
      process.env.NODE_ENV === "development" &&
      url.protocol === "http:" &&
      developmentLoopbackHosts.has(url.hostname)
    ) {
      return url.origin;
    }
  } catch {
    // Fall back to the verified deployment URL when configuration is incomplete.
  }

  return fallbackSiteUrl;
}

export const siteUrl = normalizeSiteUrl(process.env.NEXT_PUBLIC_SITE_URL);

export function absoluteUrl(path: `/${string}` = "/") {
  return new URL(path, `${siteUrl}/`).toString();
}

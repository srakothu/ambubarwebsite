const fallbackSiteUrl = "https://ambubar.vercel.app";

function normalizeSiteUrl(value: string | undefined) {
  if (!value?.trim()) {
    return fallbackSiteUrl;
  }

  try {
    const url = new URL(value.trim());

    if (url.protocol === "https:" || url.protocol === "http:") {
      return url.origin;
    }
  } catch {
    // Fall back to the verified deployment URL when configuration is incomplete.
  }

  return fallbackSiteUrl;
}

export const siteUrl = normalizeSiteUrl(process.env.NEXT_PUBLIC_SITE_URL);

import type { InquiryValues } from "./inquiry";

function escapeHtml(value: string) {
  return value.replace(
    /[&<>"']/g,
    (character) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;",
      })[character] ?? character,
  );
}

function safeSubjectValue(value: string) {
  return value.replace(/[\r\n]+/g, " ").trim();
}

export function buildInquiryEmailContent(values: InquiryValues) {
  const fields = [
    ["Name", values.name],
    ["Email", values.email],
    ["Phone", values.phone],
    ["Event date", values.eventDate],
    ["Venue or event area", values.venue],
    ["Estimated guest count", values.guestCount],
  ] as const;

  const subject = `New Ambu Bar event inquiry — ${safeSubjectValue(values.name)}`;
  const text = [
    "New Ambu Bar event inquiry",
    "",
    ...fields.map(([label, value]) => `${label}: ${value}`),
    "",
    "Beverage needs:",
    values.message,
  ].join("\n");
  const rows = fields
    .map(
      ([label, value]) =>
        `<tr><th style="padding:8px 12px;text-align:left;vertical-align:top;color:#122f5b;border-bottom:1px solid #c7dbff">${escapeHtml(label)}</th><td style="padding:8px 12px;color:#243a5c;border-bottom:1px solid #c7dbff">${escapeHtml(value)}</td></tr>`,
    )
    .join("");
  const html = `<!doctype html><html><body style="margin:0;background:#eff6ff;font-family:Arial,sans-serif;color:#243a5c"><div style="max-width:680px;margin:0 auto;padding:24px"><div style="border-radius:8px;overflow:hidden;background:#fff;border:1px solid #c7dbff"><div style="padding:24px;background:#243a5c;color:#fff"><p style="margin:0 0 8px;color:#fff4b3;font-size:12px;font-weight:700;letter-spacing:.12em;text-transform:uppercase">Ambu Bar Website</p><h1 style="margin:0;font-size:24px">New event inquiry</h1></div><div style="padding:24px"><table style="width:100%;border-collapse:collapse">${rows}</table><h2 style="margin:24px 0 8px;color:#122f5b;font-size:18px">Beverage needs</h2><p style="margin:0;white-space:pre-wrap;line-height:1.6">${escapeHtml(values.message)}</p></div></div></div></body></html>`;

  return { subject, text, html };
}

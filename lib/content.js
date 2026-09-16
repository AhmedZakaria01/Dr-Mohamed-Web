import fs from "node:fs";
import path from "node:path";

const CONTENT_DIR = path.join(process.cwd(), "content");

/** Read a locale-scoped top-level content file, e.g. getPageContent("ar", "home"). */
export function getPageContent(locale, page) {
  const filePath = path.join(CONTENT_DIR, locale, `${page}.json`);
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

/** Read one service detail file, e.g. getServiceContent("en", "hemorrhoid-surgery"). */
export function getServiceContent(locale, slug) {
  const filePath = path.join(CONTENT_DIR, locale, "services", `${slug}.json`);
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

/** The 6-item services teaser/index list for a locale. */
export function getServicesIndex(locale) {
  const filePath = path.join(CONTENT_DIR, locale, "services", "index.json");
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

/** Real shared contact facts (WhatsApp, phone, socials, the 4 clinics) — locale-agnostic except name/address. */
export function getContactInfo() {
  const filePath = path.join(CONTENT_DIR, "shared", "contact-info.json");
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

export const SERVICE_SLUGS = [
  "anal-fissure-surgery",
  "hemorrhoid-surgery",
  "ingrown-toenail-surgery",
  "laparoscopic-surgeries",
  "minimally-invasive-surgeries",
  "colon-surgeries",
];

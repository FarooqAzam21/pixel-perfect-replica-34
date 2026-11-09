export function pageMeta(title: string, description: string) {
  return { meta: [
    { title: `${title} | AA Shipping & Logistics` },
    { name: "description", content: description },
    { property: "og:title", content: `${title} | AA Shipping & Logistics` },
    { property: "og:description", content: description },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] };
}

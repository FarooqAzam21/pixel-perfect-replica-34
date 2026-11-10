export const company = {
  name: "AA Shipping & Logistics",
  slogan: "Connecting businesses across borders",
  tagline: "Your global logistics partner",
  proprietor: "Saud Ul Hassan",
  phones: [
    { display: "+92 332 2528366", whatsapp: "923322528366" },
    { display: "+92 313 2289399", whatsapp: "923132289399" },
    { display: "+92 309 2744740", whatsapp: "923092744740" },
  ],
  email: "saud@aashipping-logistics.com",
  address: [
    "Office No 1, Mezzanine Floor,",
    "Aslam Motiwala Palace,",
    "Bohri Road, Opp. Custom House,",
    "Karachi - Pakistan",
  ],
} as const;

export function whatsappUrl(number: string) {
  return `https://wa.me/${number}`;
}

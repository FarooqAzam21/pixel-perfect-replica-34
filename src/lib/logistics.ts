export const quoteSteps = ["Shipment", "Contact", "Review"] as const;

export type QuoteDetails = {
  mode: string;
  originCountry: string;
  originCity: string;
  destinationCountry: string;
  destinationCity: string;
  cargo: string;
  weight: string;
  dimensions: string;
  packages: string;
  container: string;
  fullName: string;
  company: string;
  email: string;
  phone: string;
  message: string;
};

export const emptyQuote: QuoteDetails = {
  mode: "Ocean",
  originCountry: "",
  originCity: "",
  destinationCountry: "",
  destinationCity: "",
  cargo: "",
  weight: "",
  dimensions: "",
  packages: "",
  container: "",
  fullName: "",
  company: "",
  email: "",
  phone: "",
  message: "",
};

export function validateShipment(details: QuoteDetails): string | null {
  if (
    ![
      details.originCountry,
      details.originCity,
      details.destinationCountry,
      details.destinationCity,
      details.cargo,
      details.weight,
      details.packages,
    ].every((value) => value.trim())
  ) {
    return "Complete all required shipment details to continue.";
  }
  if (!Number.isFinite(Number(details.weight)) || Number(details.weight) <= 0)
    return "Enter a valid cargo weight.";
  if (!Number.isInteger(Number(details.packages)) || Number(details.packages) < 1)
    return "Enter a valid number of packages.";
  return null;
}

export function validateContact(details: QuoteDetails): string | null {
  if (
    ![details.fullName, details.company, details.email, details.phone].every((value) =>
      value.trim(),
    )
  ) {
    return "Complete your contact details to continue.";
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(details.email.trim()))
    return "Enter a valid business email address.";
  return null;
}

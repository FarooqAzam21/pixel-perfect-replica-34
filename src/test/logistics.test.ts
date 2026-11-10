import { describe, expect, it } from "vitest";
import { emptyQuote, validateContact, validateShipment } from "@/lib/logistics";

describe("quote form validation", () => {
  it("requires shipment fields before proceeding", () => {
    expect(validateShipment(emptyQuote)).toContain("required shipment details");
  });
  it("accepts positive weight and whole package counts once details are present", () => {
    expect(
      validateShipment({
        ...emptyQuote,
        originCountry: "Japan",
        originCity: "Osaka",
        destinationCountry: "Canada",
        destinationCity: "Toronto",
        cargo: "Parts",
        weight: "42",
        packages: "3",
      }),
    ).toBeNull();
  });
  it("rejects non-positive weights and fractional package counts", () => {
    const shipment = {
      ...emptyQuote,
      originCountry: "Japan",
      originCity: "Osaka",
      destinationCountry: "Canada",
      destinationCity: "Toronto",
      cargo: "Parts",
      weight: "0",
      packages: "1.5",
    };

    expect(validateShipment(shipment)).toBe("Enter a valid cargo weight.");
    expect(validateShipment({ ...shipment, weight: "42" })).toBe(
      "Enter a valid number of packages.",
    );
    expect(validateShipment({ ...shipment, weight: "Infinity", packages: "2" })).toBe(
      "Enter a valid cargo weight.",
    );
  });
  it("requires a valid email and complete contact details", () => {
    expect(
      validateContact({
        ...emptyQuote,
        fullName: "Alex",
        company: "Example Co",
        email: "not-an-email",
        phone: "555",
      }),
    ).toContain("valid business email");
    expect(
      validateContact({
        ...emptyQuote,
        fullName: "Alex",
        company: "Example Co",
        email: "alex@example.com",
        phone: "",
      }),
    ).toContain("contact details");
  });
  it("accepts a business email with surrounding whitespace", () => {
    expect(
      validateContact({
        ...emptyQuote,
        fullName: "Alex",
        company: "Example Co",
        email: " alex@example.com ",
        phone: "555",
      }),
    ).toBeNull();
  });
});

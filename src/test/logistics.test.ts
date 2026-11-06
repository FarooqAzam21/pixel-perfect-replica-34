import { describe, expect, it } from "vitest";
import { demoTrackingCode, lookupTracking, emptyQuote, validateContact, validateShipment } from "@/lib/logistics";

describe("shipment tracking demonstration", () => {
  it("returns only the explicitly labeled sample for its sample code", () => {
    expect(lookupTracking(demoTrackingCode)?.updated).toContain("not live shipment data");
  });
  it("does not invent results for unknown identifiers", () => {
    expect(lookupTracking("REAL-CARRIER-CODE")).toBeNull();
  });
});

describe("quote form validation", () => {
  it("requires shipment fields before proceeding", () => {
    expect(validateShipment(emptyQuote)).toContain("required shipment details");
  });
  it("accepts positive weight and whole package counts once details are present", () => {
    expect(validateShipment({ ...emptyQuote, originCountry: "Japan", originCity: "Osaka", destinationCountry: "Canada", destinationCity: "Toronto", cargo: "Parts", weight: "42", packages: "3" })).toBeNull();
  });
  it("requires a valid email and complete contact details", () => {
    expect(validateContact({ ...emptyQuote, fullName: "Alex", company: "Example Co", email: "not-an-email", phone: "555" })).toContain("valid business email");
  });
});

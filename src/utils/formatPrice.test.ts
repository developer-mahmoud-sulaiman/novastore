import { describe, expect, it } from "vitest";
import { formatPrice } from "./formatPrice";

describe("formatPrice", () => {
  it("formats a whole number with  decimals", () => {
    expect(formatPrice(100)).toBe("$100.00");
  });

  it("formats a decimal numbers", () => {
    expect(formatPrice(109.95)).toBe("$109.95");
  });

  it("formats large numbers with commas", () => {
    expect(formatPrice(1234.5)).toBe("$1,234.50");
  });

  it("formats zero correctly", () => {
    expect(formatPrice(0)).toBe("$0.00");
  });

  it("formats negative numbers", () => {
    expect(formatPrice(-50)).toBe("-$50.00");
  });
});

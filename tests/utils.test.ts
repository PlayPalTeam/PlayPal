import { isValidEmail, isValidPassword } from "@/utils";
import { describe, expect, it } from "vitest";

describe("Email Validation", () => {
  it("should return true for a valid email", () => {
    expect(isValidEmail("test@example.com")).toBe(true);
    expect(isValidEmail("john.doe@gmail.com")).toBe(true);
  });

  it("should return false for an invalid email", () => {
    expect(isValidEmail("invalid-email")).toBe(false);
    expect(isValidEmail("12345")).toBe(false);
    expect(isValidEmail("")).toBe(false);
  });
});

describe("Password Validation", () => {
  it("should return true for a valid password", () => {
    expect(isValidPassword("StrongPassword123")).toBe(true);
    expect(isValidPassword("AnotherValidPassword")).toBe(true);
  });

  it("should return false for an invalid password", () => {
    expect(isValidPassword("short")).toBe(false);
    expect(isValidPassword("")).toBe(false);
    expect(isValidPassword("Weak")).toBe(false);
  });
});

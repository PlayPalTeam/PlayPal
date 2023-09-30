import { z } from "zod";

/**
 * Validates an email address.
 *
 * @param email - The email address to validate.
 * @returns `true` if the email is valid, `false` otherwise.
 */
export function isValidEmail(email: string): boolean {
  try {
    // Create a schema for email validation
    const emailSchema = z.string().email("Invalid email address");

    // Attempt to parse the email using the schema
    emailSchema.parse(email);

    // If parsing is successful, the email is valid
    return true;
  } catch (error) {
    // If parsing fails, the email is invalid
    return false;
  }
}

/**
 * Validates a password for length constraints.
 *
 * @param password - The password to validate.
 * @returns `true` if the password is valid, `false` otherwise.
 */
export function isValidPassword(password: string): boolean {
  try {
    // Create a schema for password validation with length constraints
    const passwordSchema = z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .max(32, "Password must be at most 32 characters long");

    // Attempt to parse the password using the schema
    passwordSchema.parse(password);

    // If parsing is successful, the password is valid
    return true;
  } catch (error) {
    // If parsing fails, the password is invalid
    return false;
  }
}

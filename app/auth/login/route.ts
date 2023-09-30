import { isValidEmail, isValidPassword } from "@/utils";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

/**
 * Handles user authentication by signing in with email and password.
 *
 * @param {Request} request - The incoming HTTP request object.
 * @returns {NextResponse} - A Next.js response object.
 */
export const POST = async (request: Request): Promise<NextResponse> => {
  try {
    // Parse the request URL
    const reqUrl = new URL(request.url);

    // Extract email and password from the form data
    const formData = await request.formData();
    const email = String(formData.get("email"));
    const password = String(formData.get("password"));

    // Valiadate email and password
    if (!isValidEmail(email) || !isValidPassword(password)) {
      const errorMessage = encodeURIComponent(
        "Invalid email or password",
      );

      return NextResponse.redirect(
        `${reqUrl.origin}/login?error=${errorMessage}`,
        { status: 301 },
      );
    }

    // Initialize Supabase client for authentication with cookies
    const supabase = createRouteHandlerClient({ cookies });

    // Sign in with email and password
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      // If authentication fails, redirect to the login page with an error message
      const errorMessage = encodeURIComponent("Invalid login credentials");
      return NextResponse.redirect(
        `${reqUrl.origin}/login?error=${errorMessage}`,
        {
          status: 301,
        },
      );
    } else {
      // If authentication is successful, redirect to the home page
      return NextResponse.redirect(reqUrl.origin, { status: 301 });
    }
  } catch (error) {
    // Handle any unexpected errors and log them
    console.error("Error during authentication:", error);

    // Return a generic error response
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};

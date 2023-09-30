import { isValidEmail, isValidPassword } from "@/utils";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const reqUrl = new URL(request.url);

    // Parse form data
    const formData = await request.formData();
    const email = String(formData.get("email"));
    const password = String(formData.get("password"));

    // Validate email and password
    if (!isValidEmail(email) || !isValidPassword(password)) {
      const errorMessage = encodeURIComponent("Invalid email or password");
      return NextResponse.redirect(
        `${reqUrl.origin}/login?error=${errorMessage}`,
        { status: 301 }
      );
    }

    // Create a Supabase client for authentication
    const supabase = createRouteHandlerClient({ cookies });

    // Sign up the user with Supabase
    await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${reqUrl.origin}/auth/callback`,
      },
    });

    // Redirect to the homepage after successful registration
    return NextResponse.redirect(reqUrl.origin, { status: 301 });
  } catch (error) {
    console.error("Error during user registration:", error);
    // Handle and log any unexpected errors
    return new Response("Internal Server Error", { status: 500 });
  }
}

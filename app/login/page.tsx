import Messages from "./Message";

const LoginPage = () => {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-secondary to-primary w-full flex-col items-center justify-center gap-y-10">
      <Messages />
      <form
        action="/auth/login"
        method="post"
        className="flex border px-8 bg-secondary text-white py-4 border-secondary shadow-pricing-card-shadow rounded-lg w-[90%] max-w-md flex-col space-y-5"
      >
        <div className="flex flex-col gap-y-1">
          <label htmlFor="email" className="font-margarine font-medium">
            Email
          </label>
          <input
            type="text"
            name="email"
            id="email"
            placeholder="Enter your email"
            className="rounded-md text-secondary"
            required
          />
        </div>
        <div className="flex flex-col gap-y-1">
          <label htmlFor="password" className="font-margarine font-medium">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Enter your password"
            className="rounded-md text-secondary"
            required
          />
          <p className="text-sm text-gray-400">
            Password should contain at least 8 characters, including:
            <br />
            - At least one uppercase letter
            <br />
            - At least one lowercase letter
            <br />
            - At least one digit
            <br />- At least one special character (e.g., !@#$%^&*()_+{})
          </p>
        </div>
        <div className="flex flex-col gap-y-4">
          <button
            type="submit"
            className="rounded-md px-4 py-2 bg-primary/90 hover:bg-primary transition text-white hover:shadow"
          >
            Log in
          </button>
          <button
            formAction="/auth/signup"
            className="rounded-md border border-black px-4 py-2 bg-white text-secondary transition hover:bg-secondary hover:border-white hover:text-white"
          >
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;

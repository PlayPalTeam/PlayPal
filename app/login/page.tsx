import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import Messages from "./Message";

const LoginPage = () => {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center gap-y-10 bg-gradient-to-br from-secondary to-primary">
      <Messages />
      <form
        action="/auth/login"
        method="post"
        className="flex  w-[90%] max-w-md flex-col space-y-5 rounded-lg border border-secondary bg-secondary px-8 py-4 text-white shadow-pricing-card-shadow"
      >
        <div className="flex flex-col gap-y-1">
          <Label htmlFor="email" text="Email" />
          <Input
            type="email"
            name="email"
            id="email"
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="flex flex-col gap-y-1">
          <Label htmlFor="password" text="Password" />
          <Input
            type="password"
            name="password"
            id="password"
            placeholder="Enter your password"
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
          <Button
            type="submit"
            className="bg-primary/90 text-white hover:bg-primary"
            text="Log In"
          />
          <Button
            formAction="/auth/sign-up"
            className="border border-black bg-white text-secondary hover:border-white hover:bg-secondary hover:text-white"
            text="Sign Up"
            type="submit"
          />
        </div>
      </form>
    </div>
  );
};

export default LoginPage;

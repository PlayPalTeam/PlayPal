"use client";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { useSearchParams } from "next/navigation";

const UserDetailsForm = () => {
  const searchParams = useSearchParams();
  const role = searchParams.get("role");

  return (
    <form className="flex w-full flex-row items-start gap-x-10" method="POST">
      <div className="flex flex-1 flex-col gap-y-5">
        <div className="flex flex-col gap-y-1">
          <Label htmlFor="first_name" text="First Name" />
          <Input id="first_name" name="first_name" required />
        </div>
        <div className="flex flex-col gap-y-1">
          <Label htmlFor="last_name" text="Last Name" />
          <Input id="last_name" name="last_name" required />
        </div>
        <div className="flex flex-col gap-y-1">
          <Label htmlFor="date_of_birth" text="Date of birth (Optional)" />
          <Input type="date" id="date_of_birth" name="date_of_birth" />
        </div>

        {role === "owner" ? (
          <>
            <div className="flex flex-col gap-y-1">
              <Label htmlFor="business_name" text="Company Name" />
              <Input name="business_name" id="business_name" required />
            </div>
            <div className="flex flex-col gap-y-1">
              <Label htmlFor="business_address" text="Company Address" />
              <Input name="business_address" id="business_address" required />
            </div>
            <div className="flex flex-1 flex-col gap-y-1">
              <Label htmlFor="company_description" text="Company Description" />
              <textarea
                rows={8}
                id="company_description"
                name="company_description"
                className="resize-none rounded-md"
              />
            </div>
          </>
        ) : (
          <div className="flex flex-1 flex-col gap-y-1">
            <Label htmlFor="bio" text="Bio (optional)" />
            <textarea
              rows={8}
              id="bio"
              name="bio"
              className="resize-none rounded-md"
            />
          </div>
        )}
        <div>
          <Button
            text="Submit"
            type="submit"
            className="w-full bg-secondary/80 text-white transition hover:bg-secondary"
          />
        </div>
      </div>
      <div className="flex-shrink cursor-pointer space-y-1">
        <Label htmlFor="profile" text="Profile Picture (Optional)" />
        <div className="flex h-[200px] w-[200px] items-center justify-center rounded-md bg-gray-400 text-white transition hover:bg-gray-500">
          Pick a profile picture
        </div>
      </div>
    </form>
  );
};

export default UserDetailsForm;

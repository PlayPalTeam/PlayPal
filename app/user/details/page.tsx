import UserDetailsForm from "./components/UserDetailsForm";

const page = () => {
  return (
    <div className="my-9 flex min-h-screen w-full flex-col items-center justify-center gap-y-10">
      <h1 className="font-margarine text-4xl">User Details</h1>
      <div className="w-[90%] max-w-3xl">
        <UserDetailsForm />
      </div>
    </div>
  );
};

export default page;

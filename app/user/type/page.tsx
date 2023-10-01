import { type Metadata } from "next";
import UserCard from "../components/UserCard";

export const metadata: Metadata = {
  title: "User Details",
};

const page: React.FC = () => {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center gap-y-10">
      <div className="flex flex-row gap-10">
        <UserCard
          role="owner"
          description="A Turf Owner can manage and maintain turf-related activities."
          userType="Turf Owner"
          imageSrc="/turf_owner.png" // Replace with the actual image source
        />
        <UserCard
          role="user"
          description="A Regular User can access and use the platform for various activities."
          userType="Regular User"
          imageSrc="/normal_user.jpg" // Replace with the actual image source
        />
      </div>
    </div>
  );
};

export default page;

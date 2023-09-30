import Image from "next/image";
import Link from "next/link";

type UserCardProps = {
  userType: string;
  imageSrc: string;
  description: string;
  role: string;
};

const UserCard: React.FC<UserCardProps> = ({
  userType,
  imageSrc,
  description,
  role,
}) => {
  return (
    <Link
      href={{
        pathname: "/user/details",
        query: { role: role },
      }}
    >
      <div className="p-4 border border-gray-300 rounded-lg cursor-pointer hover:shadow hover:border-secondary hover:bg-secondary/10 transition">
        <div className="flex flex-col items-center">
          <div className="relative w-[300px] h-[300px] rounded-full overflow-hidden">
            <Image src={imageSrc} alt={userType} fill objectFit="cover" />
          </div>
          <h2 className="text-2xl font-semibold mt-3">{userType}</h2>
          <p className="mt-2 text-gray-600">{description}</p>
        </div>
      </div>
    </Link>
  );
};

export default UserCard;

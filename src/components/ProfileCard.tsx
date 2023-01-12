import { useUserProfile } from "../context/UserProfileContext";
import Avatar from "./Avatar";

const ProfileCard = () => {
	const { userProfile } = useUserProfile();

	const { username, full_name } = userProfile;

	return (
		<div className="flex items-center max-md:flex-col max-md:justify-center">
			{/* <Avatar navs={false} /> */}
			<div>
				<h4>Username: {username}</h4>
				<h4>Full Name: {full_name}</h4>
			</div>
		</div>
	);
};

export default ProfileCard;

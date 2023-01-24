import { useUserProfile } from "../context/UserProfileContext";
import Avatar from "./Avatar";

const ProfileCard = () => {
	const { userProfile } = useUserProfile();


	return (
		<div className="flex">
			<Avatar />
			<div>
				<h4>Username: {userProfile.username}</h4>
				<h4>Full Name: {userProfile.full_name}</h4>
			</div>
		</div>
	);
};

export default ProfileCard;

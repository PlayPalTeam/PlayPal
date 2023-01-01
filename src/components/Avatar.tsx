import { useUserProfile } from "../context/UserProfileContext";

const Avatar = () => {
	const { userProfile } = useUserProfile();

	const { avatar_url } = userProfile;

	return <div>Avatar</div>;
};

export default Avatar;

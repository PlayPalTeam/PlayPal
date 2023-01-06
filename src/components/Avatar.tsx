import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { ChangeEventHandler, useEffect, useMemo, useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { useUserProfile } from "../context/UserProfileContext";
import { Database } from "../types/database.types";
import Image from "next/image";

type Profiles = Database["public"]["Tables"]["profiles"]["Row"];

const Avatar = ({ navs = false }: { navs?: boolean }) => {
	const [url, setUrl] = useState<Profiles["avatar_url"]>("");
	const [uploading, setUploading] = useState<boolean>(false);

	const { userProfile } = useUserProfile();

	const supabase = useSupabaseClient<Profiles>();

	const { avatar_url, id } = userProfile;

	const downloadImage = useMemo(() => {
		return async (path: string) => {
			const { data, error } = await supabase.storage
				.from("avatars")
				.download(path);

			if (error) {
				toast.error(error.message);
			}

			if (data) {
				const url = URL.createObjectURL(data);
				setUrl(url);
			}
		};
	}, [supabase.storage]);

	useEffect(() => {
		if (avatar_url) {
			downloadImage(avatar_url);
		}
	}, [avatar_url, downloadImage]);

	const uploadAvatar: ChangeEventHandler<HTMLInputElement> = async (event) => {
		try {
			setUploading(true);

			if (!event.target.files || event.target.files.length === 0) {
				toast.error("You must select an image to upload");
			}

			const file = event.target.files[0];
			const fileExt = file.name.split(".").pop();
			const fileName = `${id}.${fileExt}`;
			const filePath = `${fileName}`;

			const { error } = await supabase.storage
				.from("avatars")
				.upload(filePath, file, { upsert: true });

			if (error) {
				toast.error(error.message);
			}

			await supabase
				.from("profiles")
				.update({
					avatar_url: filePath,
					updated_at: new Date().toUTCString(),
				})
				.eq("id", id);
		} catch (error) {
			toast.error(error);
		} finally {
			setUploading(false);
		}
	};

	return (
		<div className="flex items-center gap-x-10">
			<Toaster />
			{url ? (
				<Image src={url} alt="" width={100} height={100} />
			) : (
				<div className="h-24 w-24 animate-pulse rounded-full bg-gray-500" />
			)}
			{navs && (
				<div className="cursor-pointer rounded-md border px-4 py-2">
					<label htmlFor="single">
						{uploading ? "Uploading..." : "Upload"}
					</label>
					<input
						className="absolute hidden"
						type="file"
						name="single"
						id="single"
						accept="image/*"
						onChange={uploadAvatar}
						disabled={uploading}
					/>
				</div>
			)}
		</div>
	);
};

export default Avatar;

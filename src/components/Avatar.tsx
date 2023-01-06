import Image from "next/image";
import { ChangeEventHandler, useEffect, useState } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { Database } from "../types/database.types";
import { useUserProfile } from "../context/UserProfileContext";
type Profiles = Database["public"]["Tables"]["profiles"]["Row"];

export default function Avatar({ navs }: { navs: boolean }) {
	const supabase = useSupabaseClient<Database>();
	const [avatarUrl, setAvatarUrl] = useState<Profiles["avatar_url"]>("");
	const [uploading, setUploading] = useState(false);

	const { userProfile } = useUserProfile();

	const { avatar_url, id } = userProfile;

	useEffect(() => {
		const downloadImage = async (path: string) => {
			try {
				const { data, error } = await supabase.storage
					.from("avatars")
					.download(path);
				if (error) {
					throw error;
				}
				const url = URL.createObjectURL(data);
				setAvatarUrl(url);
			} catch (error) {
				console.log("Error downloading image: ", error);
			}
		};
		if (avatar_url) downloadImage(avatar_url);
	}, [avatarUrl, avatar_url, supabase.storage]);

	const uploadAvatar: ChangeEventHandler<HTMLInputElement> = async (event) => {
		try {
			setUploading(true);

			if (!event.target.files || event.target.files.length === 0) {
				throw new Error("You must select an image to upload.");
			}

			const file = event.target.files[0];
			const fileExt = file.name.split(".").pop();
			const fileName = `${id}.${fileExt}`;
			const filePath = `${fileName}`;

			let { error: uploadError } = await supabase.storage
				.from("avatars")
				.upload(filePath, file, { upsert: true });

			if (uploadError) {
				alert(uploadError.message);
			}

			await supabase
				.from("profiles")
				.update({
					avatar_url: filePath,
					updated_at: new Date().toISOString(),
				})
				.eq("id", id);
		} catch (error) {
			alert("Error uploading avatar!");
			console.log(error);
		} finally {
			setUploading(false);
		}
	};

	return (
		<div className="flex w-full items-center justify-evenly p-10">
			{avatarUrl ? (
				<Image
					className="rounded-md border border-green-500"
					src={avatarUrl}
					alt="Avatar"
					width={100}
					height={100}
				/>
			) : (
				<div
					className="rounded-full border"
					style={{ height: 100, width: 100 }}
				/>
			)}
			{navs && (
				<div style={{ width: 100 }}>
					<label
						className="cursor-pointer rounded-md border border-green-500 p-2 duration-300 ease-in-out hover:border-transparent hover:bg-green-500 hover:text-white"
						htmlFor="single"
					>
						{uploading ? "Uploading ..." : "Upload"}
					</label>
					<input
						style={{
							visibility: "hidden",
							position: "absolute",
						}}
						type="file"
						id="single"
						accept="image/*"
						onChange={uploadAvatar}
						disabled={uploading}
					/>
				</div>
			)}
		</div>
	);
}

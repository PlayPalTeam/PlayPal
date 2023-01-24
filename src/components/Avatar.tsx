import Image from "next/image";
import { ChangeEventHandler, useEffect, useReducer } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { Database } from "../types/database.types";
import { useUserProfile } from "../context/UserProfileContext";
import { imageConvert } from "upload-images-converter";

interface State {
	avatarUrl: string;
	uploading: boolean;
	error: string;
}

interface Action {
	type: "SET_AVATAR_URL" | "SET_UPLOADING" | "SET_ERROR";
	avatarUrl?: string;
	uploading?: boolean;
	error?: string;
}


const initialState: State = {
	avatarUrl: "",
	uploading: false,
	error: ""
};

const reducer = (state: State, action: Action): State => {
	switch (action.type) {
		case "SET_AVATAR_URL":
			return { ...state, avatarUrl: action.avatarUrl };
		case "SET_UPLOADING":
			return { ...state, uploading: action.uploading };
		case "SET_ERROR":
			return { ...state, error: action.error };
		default:
			return state;
	}
};

export default function Avatar({ navs = false }: { navs?: boolean }) {
	const supabase = useSupabaseClient<Database>();
	const { userProfile } = useUserProfile();
	const [state, dispatch] = useReducer(reducer, initialState);

	const { avatarUrl, uploading } = state;

	useEffect(() => {
		if (userProfile) {
			const downloadImage = async (path: string) => {
				try {
					const { data, error } = await supabase.storage
						.from("avatars")
						.download(path);
					if (error) {
						throw error;
					}
					const url = URL.createObjectURL(data);
					dispatch({ type: "SET_AVATAR_URL", avatarUrl: url });
				} catch (error) {
					console.log("Error downloading image: ", error);
					dispatch({ type: "SET_ERROR", error: error.message });
				}
			}
			if (userProfile?.avatar_url) downloadImage(userProfile?.avatar_url);
		}
	}, [supabase, userProfile]);

	const uploadAvatar: ChangeEventHandler<HTMLInputElement> = async event => {
		try {
			dispatch({ type: "SET_UPLOADING", uploading: true });

			const file = event.target.files[0];
			const fileExt = file.name.split(".").pop();
			const fileName = `${userProfile.id}.${fileExt}`;
			const filePath = `${fileName}`;

			const convertedFile = await imageConvert(event.target.files, 400, 400, "image/webp", true);

			const { error: uploadError } = await supabase.storage
				.from("avatars")
				.upload(filePath, convertedFile[0], { upsert: true });

			if (uploadError) {
				alert(uploadError.message);
			}

			await supabase
				.from("profiles")
				.upsert({
					id: userProfile?.id,
					avatar_url: filePath,
				})
				.eq("id", userProfile?.id);
		} catch (error) {
			alert("Error uploading avatar!");
			console.log(error);
			dispatch({ type: "SET_ERROR", error: error.message });
		} finally {
			dispatch({ type: "SET_UPLOADING", uploading: false });
		}
	};

	return (
		<div className="">
			{avatarUrl ? (
				<Image
					className=""
					src={avatarUrl}
					alt="Avatar"
					width={100}
					height={100}
				/>
			) : (
				<div
					className=""
					style={{ height: 100, width: 100 }}
				/>
			)}
			{navs && (
				<div>
					<label
						className=""
						htmlFor="single"
					>
						{uploading ? "Uploading..." : "Change Avatar"}
						<input
							type="file"
							id="single"
							onChange={uploadAvatar}
							style={{ display: "none" }}
						/>
					</label>
				</div>
			)}
		</div>
	);
}
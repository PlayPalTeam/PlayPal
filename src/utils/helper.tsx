import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { useBookContext } from "../context/BookingContext";
import { useRequestContext } from "../context/RequestContext";
import { useUserProfile } from "../context/UserProfileContext";
import { Database } from "../types/database.types";
import {
	SignInData,
	SignUpData,
	ResetData,
	ForgotPasswordData,
} from "../types/types";

type Request = Database["public"]["Tables"]["requests"]["Row"];
type Book = Database["public"]["Tables"]["bookings"]["Row"];

const useHelper = () => {
	const { userProfile } = useUserProfile();
	const { requests } = useRequestContext();
	const { books } = useBookContext();

	const router = useRouter();

	const supabase = useSupabaseClient();

	const createMappedData = (
		requestsArray: Request[],
		booksArray: Book[],
		filterCondition: (req: Request) => boolean
	) => {
		return requestsArray.filter(filterCondition).map((req) => {
			const matchingBooks = booksArray.filter(
				(book) => book.turf_id === req.turf_id && book.date === req.game_date
			);
			return {
				id: req.id,
				game: req.game,
				player_needed: req.player_needed,
				profile_id: req.profile_id,
				date: req.game_date,
				book: matchingBooks.map((book) => ({
					start_time: book.start_time,
					end_time: book.end_time,
					turfs: {
						turf_name: book.turfs.turf_name,
						location: book.turfs.location,
					},
				})),
			};
		});
	};

	const cardsData = createMappedData(
		requests,
		books,
		(req) => !userProfile.request?.some((id) => id === req.id.toString())
	);

	const requestDashboard = createMappedData(requests, books, (req) =>
		userProfile.request?.some((id) => id === req.id.toString())
	);

	const onSignUpSubmit: SubmitHandler<SignUpData> = async (data) => {
		const { error } = await supabase.auth.signUp({
			email: data.email,
			password: data.password,
			options: {
				data: {
					username: data.username,
					role: data.role,
				},
				emailRedirectTo: "http://localhost:3000/auth/signin",
			},
		});

		if (error) {
			toast.error(error.message, {
				duration: 5000,
				style: {
					border: "1px solid red",
				},
			});
		} else {
			toast.success("Check your email", { duration: 5000 });
		}
	};

	const onSignInSubmit: SubmitHandler<SignInData> = async (data) => {
		const {
			error,
			data: { session },
		} = await supabase.auth.signInWithPassword({
			email: data.email,
			password: data.password,
		});

		if (error) {
			toast.error(error.message, {
				duration: 5000,
				style: {
					border: "1px solid red",
					color: "red",
				},
			});
		}

		if (session?.user.user_metadata) {
			router.push(`/${session.user.user_metadata.role}`);
		}
	};

	const onResetSubmit: SubmitHandler<ResetData> = async (email) => {
		const { error } = await supabase.auth.resetPasswordForEmail(email.email, {
			redirectTo: "http://localhost:3000/auth/forgot",
		});

		if (error) {
			toast.error(error.message, { duration: 5000 });
		}

		toast.success("Check your email", { duration: 5000 });
	};

	const onPasswordSubmit: SubmitHandler<ForgotPasswordData> = async ({
		password,
		confirmPassword,
	}) => {
		console.log(password);
		console.log(confirmPassword);

		if (password !== confirmPassword) {
			toast.error("Passwords must match");
			return;
		}

		const { error } = await supabase.auth.updateUser({
			password: password,
		});

		if (error) {
			toast.error(error.message, {
				duration: 5000,
				style: {
					border: "1px solid red",
					color: "red",
				},
			});
		}

		toast.success("Password reset successful!", {
			duration: 5000,
			style: {
				border: "1px solid green",
				color: "green",
			},
		});

		router.push("/auth/signin");
	};

	return {
		cardsData,
		requestDashboard,
		onSignUpSubmit,
		onSignInSubmit,
		onResetSubmit,
		onPasswordSubmit,
	};
};

export default useHelper;

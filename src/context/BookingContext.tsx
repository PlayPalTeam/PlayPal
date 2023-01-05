import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import {
	createContext,
	Dispatch,
	ReactNode,
	SetStateAction,
	useContext,
	useEffect,
	useMemo,
	useState,
} from "react";
import { toast } from "react-hot-toast";
import { Database } from "../types/database.types";

type Booking = Database["public"]["Tables"]["bookings"]["Row"];

type BookingInsert = Database["public"]["Tables"]["bookings"]["Insert"];

interface BookingContexType {
	books: Booking[];
	setBooks: Dispatch<SetStateAction<Booking[]>>;
	addBooks: (id: string, booking: BookingInsert) => Promise<void>;
}

export const BookingContext = createContext<BookingContexType>({
	books: [],
	setBooks: () => {},
	addBooks: () => Promise.resolve(),
});

export const BookingProvider = ({ children }: { children: ReactNode }) => {
	const [books, setBooks] = useState<Booking[]>([]);

	const supabase = useSupabaseClient<Database>();

	const user = useUser();

	const getBookings = useMemo(() => {
		return async () => {
			const { data, error } = await supabase.from("bookings").select("*");

			if (error) {
				toast.error(error.message, {
					duration: 5000,
					style: {
						border: "1px solid red",
						color: "red",
					},
				});
			}

			if (data) {
				setBooks(data);
			}
		};
	}, [supabase]);

	useEffect(() => {
		if (user) {
			getBookings();
		}
	}, [getBookings, user]);

	const addBooks = async (turf_id: string, book: BookingInsert) => {
		await supabase
			.from("turfs")
			.insert({ ...book, profile_id: user.id, turf_id: turf_id });
	};

	return (
		<BookingContext.Provider value={{ books, setBooks, addBooks }}>
			{children}
		</BookingContext.Provider>
	);
};

export const useBookContext = () => {
	return useContext<BookingContexType>(BookingContext);
};

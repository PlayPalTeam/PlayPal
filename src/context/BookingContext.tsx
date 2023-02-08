import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react';
import { toast } from 'react-hot-toast';
import { Database } from '../types/database.types';

export type Booking = {
  booking_id: string;
  turf_id: string;
  date: string;
  start_time: string;
  end_time: string;
  times?: string[];
  selectedsport?: string;
  turfs:
    | { turf_name: string; location: string }
    | { turf_name: string; location: string }[];
};

type BookingInsert = Database['public']['Tables']['bookings']['Insert'];

interface BookingContexType {
  books: Booking[];
  addBooking: (id: string, booking: BookingInsert) => Promise<void>;
  deleteBooking: (id: string) => Promise<void>;
}

const BookingContext = createContext<BookingContexType>({
  books: [],
  addBooking: () => Promise.resolve(),
  deleteBooking: () => Promise.resolve()
});

export const BookingProvider = ({ children }: { children: ReactNode }) => {
  const [books, setBooks] = useState<Booking[]>([]);

  const supabase = useSupabaseClient<Database>();

  const user = useUser();

  const getBookings = useMemo(() => {
    return async () => {
      const { data, error } = await supabase
        .from('bookings')
        .select(
          'booking_id, turf_id, date, end_time, start_time ,times, turfs(turf_name, location)'
        )
        .eq('profile_id', user.id);

      if (error) {
        toast.error(error.message);
      }

      if (data) {
        setBooks(data);
      }
    };
  }, [supabase, user?.id]);

  useEffect(() => {
    if (user) {
      getBookings();
    }
  }, [getBookings, user]);

  const addBooking = async (turf_id: string, book: BookingInsert) => {
    await supabase
      .from('bookings')
      .insert({ ...book, profile_id: user.id, turf_id: turf_id });

    getBookings();
  };

  const deleteBooking = async (id: string) => {
    await supabase.from('bookings').delete().eq('booking_id', id);
    getBookings();
  };

  return (
    <BookingContext.Provider value={{ books, addBooking, deleteBooking }}>
      {children}
    </BookingContext.Provider>
  );
};

export const useBookContext = () => {
  return useContext<BookingContexType>(BookingContext);
};

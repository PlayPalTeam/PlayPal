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
  turfs:
    | { turf_name: string; location: string }
    | { turf_name: string; location: string }[];
};

type BookingInsert = Database['public']['Tables']['bookings']['Insert'];

interface BookingContexType {
  books: Booking[];
  addBooks: (id: string, booking: BookingInsert) => Promise<void>;
  deleteBooking: (id: string) => Promise<void>;
}

export const BookingContext = createContext<BookingContexType>({
  books: [],
  addBooks: () => Promise.resolve(),
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
          'booking_id, turf_id, date, end_time, start_time, turfs(turf_name, location)'
        )
        .eq('profile_id', user.id);

      if (error) {
        toast.error(error.message, {
          duration: 5000,
          style: {
            border: '1px solid red',
            color: 'red'
          }
        });
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

  const addBooks = async (turf_id: string, book: BookingInsert) => {
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
    <BookingContext.Provider value={{ books, addBooks, deleteBooking }}>
      {children}
    </BookingContext.Provider>
  );
};

export const useBookContext = () => {
  return useContext<BookingContexType>(BookingContext);
};

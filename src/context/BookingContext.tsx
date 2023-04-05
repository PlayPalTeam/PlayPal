import { supabase } from '@lib/supabase';
import { useUser } from '@supabase/auth-helpers-react';
import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { Book } from 'src/types/types';
import { Database } from '../types/database.types';

export type Booking = Book & {
  turfs:
    | { turf_name: string; address: string; price: number; turf_image: string }
    | { turf_name: string; address: string; price: number; turf_image: string }[];
};

type BookingInsert = Database['public']['Tables']['bookings']['Insert'];

interface BookingContextType {
  books: Booking[];
  listerbooks: Booking[];
  addBooking: (id: string, booking: BookingInsert) => Promise<void>;
  deleteBooking: (booking_id: string) => Promise<void>;
}

const BookingContext = createContext<BookingContextType>({
  books: [],
  listerbooks: [],
  addBooking: () => Promise.resolve(),
  deleteBooking: () => Promise.resolve()
});

export const BookingProvider = ({ children }: { children: ReactNode }) => {
  const [books, setBooks] = useState<Booking[]>([]);
  const [listerbooks, setListerBooks] = useState<Booking[]>([]);
  const user = useUser();

  const getBookings = useCallback(async () => {
    const { data, error } = await supabase
      .from('bookings')
      .select('*, turfs(turf_name, address, price, turf_image,turf_image)')
      .eq('profile_id', user?.id);

    if (error) {
      toast.error(error.message);
    }

    if (data) {
      setBooks(data);
    }
  }, [user?.id]);

  const Bookings = useCallback(async () => {
    const { data, error } = await supabase
      .from('bookings')
      .select('*, turfs(turf_name, address, price, turf_image,turf_image)');

    if (error) {
      toast.error(error.message);
    }

    if (data) {
      setListerBooks(data);
    }
  }, []);

  useEffect(() => {
    const role = user?.user_metadata.role;
    if (user) {
      role === 'lister' ? Bookings() : getBookings();
    }
  }, [Bookings, getBookings, user]);

  const addBooking = async (turf_id: string, book: BookingInsert) => {
    const { error, status } = await supabase
      .from('bookings')
      .insert({ ...book, profile_id: user?.id, turf_id: turf_id });
    if (error) {
      toast.error(error.message);
    }

    if (status === 201) {
      toast.success('Booking Done');
    }
  };

  const deleteBooking = async (booking_id: string) => {
    const { error } = await supabase.from('bookings').delete().eq('booking_id', booking_id);

    if (error) {
      toast.error(error.message);
    }
    getBookings();
  };

  return (
    <BookingContext.Provider value={{ books, listerbooks, addBooking, deleteBooking }}>
      {children}
    </BookingContext.Provider>
  );
};

export const useBookContext = () => {
  return useContext<BookingContextType>(BookingContext);
};

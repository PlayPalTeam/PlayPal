import { supabase } from '@lib/supabase';
import { useUser } from '@supabase/auth-helpers-react';
import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { Database } from '../types/database.types';
import { useUserProfile } from './UserProfileContext';

export type Booking = {
  booking_id: string;
  turf_id: string;
  date: string;
  start_time: string;
  end_time: string;
  times?: string[];
  selectedsport?: string;
  turfs: { turf_name: string; address: string } | { turf_name: string; address: string }[];
};

type Book = Database['public']['Tables']['bookings']['Row'];
type BookingInsert = Database['public']['Tables']['bookings']['Insert'];

interface BookingContexType {
  books: Booking[];
  listerbooks: Book[];
  addBooking: (id: string, booking: BookingInsert) => Promise<void>;
  deleteBooking: (id: string) => Promise<void>;
}

const BookingContext = createContext<BookingContexType>({
  books: [],
  listerbooks: [],
  addBooking: () => Promise.resolve(),
  deleteBooking: () => Promise.resolve()
});

export const BookingProvider = ({ children }: { children: ReactNode }) => {
  const [books, setBooks] = useState<Booking[]>([]);
  const [listerbooks, setListerBooks] = useState<Book[]>([]);
  const { userProfile } = useUserProfile();
  const user = useUser();

  const getBookings = useCallback(async () => {
    const { data, error } = await supabase.from('bookings').select('*, turfs(turf_name, address)').eq('profile_id', user?.id);

    if (error) {
      toast.error(error.message);
    }

    if (data) {
      setBooks(data);
    }
  }, [user?.id]);

  const Bookings = useCallback(async () => {
    const { data, error } = await supabase.from('bookings').select('*, turfs(turf_name, address)');

    if (error) {
      toast.error(error.message);
    }

    if (data) {
      setListerBooks(data);
    }
  }, []);

  useEffect(() => {
    if (user) {
      getBookings();
    }

    if (user) {
      Bookings();
    }
  }, [Bookings, getBookings, user, userProfile?.role]);

  const addBooking = async (turf_id: string, book: BookingInsert) => {
    const { error, status } = await supabase.from('bookings').insert({ ...book, profile_id: user?.id, turf_id: turf_id });
    if (error) {
      toast.error(error.message);
    }

    if (status === 201) {
      toast.success('Booking Done');
    } else {
      getBookings();
    }
  };

  const deleteBooking = async (id: string) => {
    await supabase.from('bookings').delete().eq('booking_id', id);
    getBookings();
  };

  return <BookingContext.Provider value={{ books, listerbooks, addBooking, deleteBooking }}>{children}</BookingContext.Provider>;
};

export const useBookContext = () => {
  return useContext<BookingContexType>(BookingContext);
};

import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment, { Moment } from 'moment';
import { utcToZonedTime } from 'date-fns-tz';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import toast from 'react-hot-toast';
import { supabase } from '@lib/supabase';

interface FormattedBooking {
  start: string;
  end: string;
  title: string;
}

interface ShowBookingsProps {
  item: {
    date: string;
    times: FormattedBooking[];
  };
}

const localizer = momentLocalizer(moment);

export const getServerSideProps: GetServerSideProps<ShowBookingsProps> = async (context: GetServerSidePropsContext) => {
  const { data, error } = await supabase.from('bookings').select('date, times').eq('turf_id', context.params?.id).single();

  if (error) {
    toast.error(error.message);
    return {
      notFound: true
    };
  }

  const date = new Date(data?.date as string);
  const timeZone = 'Asia/Kolkata';
  const zonedDate = utcToZonedTime(date, timeZone);

  const formatTime = data?.times?.map((time) => {
    const [start, end] = time.split('-');
    const startDateFormat = moment(zonedDate)
      .set({ hour: Number(start.split(':')[0]), minute: Number(start.split(':')[1]) })
      .toISOString();
    const endDateFormat = moment(zonedDate)
      .set({ hour: Number(end.split(':')[0]), minute: Number(end.split(':')[1]) })
      .toISOString();

    return { start: startDateFormat, end: endDateFormat, title: time };
  });

  return {
    props: {
      item: { date: zonedDate.toISOString(), times: formatTime ?? [] }
    }
  };
};

const ShowBookings = ({ item }: ShowBookingsProps) => {
  return (
    <div style={{ height: 500 }}>
      <Calendar localizer={localizer} events={item.times} startAccessor="start" endAccessor="end" />
    </div>
  );
};

export default ShowBookings;

import { Booking, useBookContext } from '@context/BookingContext';
import { BsCalendarDate } from 'react-icons/bs';
import { BiTime } from 'react-icons/bi';
import { ImLocation } from 'react-icons/im';
import { toast } from 'react-hot-toast';

const BookingCard = ({
  date,
  end_time,
  start_time,
  turfs,
  booking_id
}: Booking) => {
  const { deleteBooking } = useBookContext();

  const handleDelete = () => {
    toast.promise(deleteBooking(booking_id), {
      loading: 'Deleting...',
      success: 'Deleted',
      error: 'Something went wrong'
    });
  };

  return (
    <div className="rounded-lg bg-white p-4">
      <div className="flex items-center gap-x-4 text-lg font-medium">
        <BsCalendarDate />
        {date}
      </div>
      <div className="flex items-center gap-x-4 text-gray-600">
        <BiTime />
        {start_time} - {end_time}
      </div>
      <div className="mt-4">
        {Array.isArray(turfs) ? (
          turfs.map((turf) => (
            <div key={turf.turf_name} className="text-gray-800">
              {turf.turf_name} - <ImLocation /> {turf.location}
            </div>
          ))
        ) : (
          <div className="flex items-center gap-x-4 text-gray-800">
            {turfs.turf_name} - <ImLocation /> {turfs.location}
          </div>
        )}
        <hr className="my-5 border-emerald-500" />
        <button
          onClick={handleDelete}
          type="button"
          className="rounded-lg bg-red-500 p-2 text-white"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default BookingCard;

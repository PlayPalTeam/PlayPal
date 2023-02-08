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
    <div className="card bg-neutral text-neutral-content">
      <div className="card-body">
        <div className="flex items-center gap-x-4 text-lg font-medium">
          <BsCalendarDate />
          {date}
        </div>
        <div className="flex items-center gap-x-4">
          <BiTime />
          {start_time} - {end_time}
        </div>
        <div className="mt-4">
          {Array.isArray(turfs) ? (
            turfs.map((turf) => (
              <div key={turf.turf_name} className="">
                {turf.turf_name} - <ImLocation /> {turf.location}
              </div>
            ))
          ) : (
            <div className="flex items-center gap-x-4">
              {turfs.turf_name} - <ImLocation /> {turfs.location}
            </div>
          )}
          <hr className="my-5" />
          <button
            onClick={handleDelete}
            type="button"
            className="btn-outline btn-primary btn"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingCard;

import { Booking, useBookContext } from '@context/BookingContext';
import { BsCalendarDate } from 'react-icons/bs';
import { BiTime } from 'react-icons/bi';
import { ImLocation } from 'react-icons/im';

const BookingCard = ({ date, turfs, times, booking_id }: Booking) => {
  const { deleteBooking } = useBookContext();

  const handleDelete = () => {
    deleteBooking(booking_id);
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
          {times}
        </div>
        <div className="mt-4">
          {Array.isArray(turfs) ? (
            turfs.map((turf) => (
              <div key={turf?.turf_name} className="">
                {turf?.turf_name} - <ImLocation /> {turf?.address}
              </div>
            ))
          ) : (
            <div className="flex items-center gap-x-4">
              {turfs?.turf_name} - <ImLocation /> {turfs?.address}
            </div>
          )}
          <hr className="my-5" />
          <button onClick={handleDelete} type="button" className="btn-outline btn-error btn">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingCard;

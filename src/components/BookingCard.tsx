import { Booking, useBookContext } from '@context/BookingContext';
import { BsCalendarDate } from 'react-icons/bs';
import { BiTime } from 'react-icons/bi';
import { ImLocation } from 'react-icons/im';
import { memo } from 'react';

const BookingCard = ({ date, turfs, times, booking_id }: Booking) => {
  const { deleteBooking } = useBookContext();

  const handleDelete = () => {
    deleteBooking(booking_id);
  };

  // Calculate the total cost of the booking
  const totalCost = Array.isArray(turfs) ? turfs.reduce((total, turf) => total + turf.price * times.length, 0) : turfs.price * times.length;

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
          <div className="mt-4 text-lg font-medium">Total cost: ${totalCost}</div>
          <hr className="my-5" />
          <button onClick={handleDelete} type="button" className="btn-outline btn-error btn">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default memo(BookingCard);

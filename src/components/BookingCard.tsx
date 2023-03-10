import { Booking, useBookContext } from '@context/BookingContext';
import { BsCalendarDate } from 'react-icons/bs';
import { BiTime } from 'react-icons/bi';
import { ImLocation } from 'react-icons/im';
import { memo, useCallback } from 'react';
import { useUserProfile } from '@context/UserProfileContext';
import Delete from './Delete';

type BookingCardProps = Booking & {
  show?: boolean;
};

const BookingCard = ({ date, turfs, times, booking_id, cost, show = false }: BookingCardProps) => {
  const { deleteBooking } = useBookContext();
  const { userProfile } = useUserProfile();

  const handleDelete = () => {
    deleteBooking(booking_id);
  };

  const turfList = useCallback(() => (Array.isArray(turfs) ? turfs : [turfs]), [turfs]);

  return (
    <div className="card mb-5 bg-neutral text-neutral-content">
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
          {turfList().map((turf) => (
            <div key={turf?.turf_name} className="flex items-center">
              {turf?.turf_name} <ImLocation className="ml-4 mr-2" />
              {turf?.address}
            </div>
          ))}

          <div className="mt-4 text-lg font-medium">Total cost: &#8377;{cost}</div>
          {userProfile?.role === 'user' && show && (
            <>
              <hr className="my-5" />
              <Delete
                error
                buttonText="Cancel Booking"
                title="Confirm Turf Booking Deletion"
                description="Are you sure you want to delete this turf booking? This action cannot be undone. Please confirm below if you wish to proceed with the deletion."
                onClick={handleDelete}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default memo(BookingCard);

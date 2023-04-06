import { Booking, useBookContext } from '@context/BookingContext';
import { BsCalendarDate } from 'react-icons/bs';
import { BiTime } from 'react-icons/bi';
import { ImLocation } from 'react-icons/im';
import { memo, useCallback } from 'react';
import { useUserProfile } from '@context/UserProfileContext';
import Delete from './Delete';
import useDialog from '@hooks/useDialog';
import { supabase } from '@lib/supabase';
import toast from 'react-hot-toast';
import Ava from './Ava';

type BookingCardProps = Booking & {
  show?: boolean;
};

const BookingCard = ({ date, turfs, times, booking_id, cost, show = false }: BookingCardProps) => {
  const { closeDialog, isOpen, openDialog } = useDialog();

  const { deleteBooking } = useBookContext();
  const { userProfile } = useUserProfile();

  const handleDelete = async () => {
    await deleteBooking(booking_id);
    closeDialog();
  };

  const turfList = useCallback(() => (Array.isArray(turfs) ? turfs : [turfs]), [turfs]);

  return (
    <div className=" bg-gray  card mb-5 border-2 border-gray-800  text-white shadow-2xl  lg:card-side ">
      {turfList().map((turf) => (
        <>
          <figure className=''>
            <Ava src={turf?.turf_image} className="sm:h-[250px] sm:w-[370px]  h-[200px] w-[300px] mt-2  sm:mt-0" />
          </figure>
          <div className=" sm:ml-[30px] sm:mt-[20px] sm:mr-12 m-3 ">
            <h2 className="sm:mb-3 sm:text-2xl font-semibold sm:tracking-wider text-lg mb-2">{turf?.turf_name}</h2>
            <p className="sm:text-lg sm:font-normal sm:tracking-normal text-md font-medium sm:w-[640px]">{turf?.address}</p>
            <div className="sm:mt-4 sm:mr-12 sm:flex sm:justify-between mt-2 sm:text-lg text-sm">
              <p>Date : {date}</p>
              <p className='mt-1 sm:mt-0 sm:ml-44 sm:w-[230px]' >Slot : {times}</p>
            </div>
            <div className="sm:mt-4  mt-2 sm:text-lg text-sm">Total Cost: &#8377;{cost}</div>
            <div className=" mt-3 sm:mt-4">
              {userProfile?.role === 'user' && show && (
                <>
                  <Delete
                    isOpen={isOpen}
                    handleOpen={openDialog}
                    handleClose={closeDialog}
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
        </>
      ))}
    </div>
  );
};

export default memo(BookingCard);

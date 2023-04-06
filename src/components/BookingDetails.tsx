import { Booking, useBookContext } from '@context/BookingContext';
import { memo} from 'react';

type BookingCardProps = Booking

const BookingDetails = ({ date,  times, cost, }: BookingCardProps) => {
  return (  
    <div>
     <div className='flex justify-around border sm:p-4 p-2 border-black shadow-xl hover:bg-slate-600 text-lg gap-5'>
        <h3 className='sm:flex-1 flex justify-center'>{date}</h3>
        <h3 className=' w-[300px] flex-1 flex justify-center'>{times}</h3>
        <h3 className='sm:flex-1  justify-center flex '>{cost}</h3>
     </div>
    </div>

  );
};

export default memo(BookingDetails);

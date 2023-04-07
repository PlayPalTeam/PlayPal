import BookingDetails from '@components/BookingDetails';
import { useBookContext } from '@context/BookingContext';
import { useTurfContext } from '@context/TurfContext';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { memo, useState } from 'react';

const BookingCard = dynamic(() => import('@components/BookingCard'));
const TurfInfo = dynamic(() => import('@components/TurfInfo'));

const Turf = () => {
  const { query } = useRouter();
  const { id } = query;
  const { turfs } = useTurfContext();
  const { listerbooks } = useBookContext();
  


  const turf = turfs.find((c) => c.turf_id === id);
  const books = listerbooks.filter((c) => c.turf_id === id);
  
  const BookingCards = books.length>0?books.map((book) => <BookingDetails key={book.booking_id} {...book} />):
  (<div className='flex justify-around border p-4 border-black shadow-xl text-xl'>No Bookings Availabel</div>);

  const pastbooks = listerbooks.filter((c)=>{
    const curdate = new Date().getMonth()
    const limonth = new Date(c.date)  
    const mont= limonth.getMonth()
    return curdate>mont && c.turf_id === id
  })

  const PastBookingCards = pastbooks.length>0?pastbooks.map((book) => <BookingDetails key={book.booking_id} {...book} />):
  (<div className='flex justify-around border p-4 border-black shadow-xl text-xl'>No Bookings Availabel</div>);

  const currentbooks = listerbooks.filter((c)=>{
    const curmonth = new Date().getMonth()
    const limonth = new Date(c.date)  
    const mont= limonth.getMonth()
    return curmonth===mont && c.turf_id === id
  });

  const CurrentBookingCards = currentbooks.length>0?currentbooks.map((book) => <BookingDetails key={book.booking_id} {...book} />):(<div className='flex justify-around border p-4 border-black shadow-xl text-xl'>No Bookings Availabel</div>);


  const [selectedOption, setSelectedOption] = useState('all');


  return (
    <TurfInfo turf={turf}>
      <section>
        <h2>Bookings Detial </h2>
        <div className="sm:mt-16 mb-4 flex justify-between sm:mr-32  mr-2 mt-10">
          <select
            name="choice"
            id="choice"
            onChange={(e) => {
              setSelectedOption(e.target.value);
            }}
            onClick={() => {
              
            }}
            className="select-primary select sm:w-full sm:max-w-xs"
          >
            <option value="all">ALL</option>
            <option value="current">Current Month</option>
            <option value="past">Past Months</option>
          </select>
        </div>
        <div className=' mb-28 mt-5 border-black shadow-xl border text-lg'>
          <div className='flex justify-around  p-4 '>
             <h3>DATE</h3>
             <h3>Slots</h3>
             <h3 className=''>COST</h3>
          </div>
          {
            selectedOption==="all" && (
              <div className="mt-5 space-y-5">{BookingCards}</div>
            )
          }
          {
            selectedOption==="past" &&(
              <div className="mt-5 space-y-5">{PastBookingCards}</div>
            )
          }
          {
            selectedOption==="current" && (
              <div className="mt-5 space-y-5">{CurrentBookingCards}</div>
            )
          }
          
            </div>
          
      </section>
    </TurfInfo>
  );
};

export default memo(Turf);

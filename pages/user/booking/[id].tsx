import Layout from '@components/Layout';
import { useBookContext } from '@context/BookingContext';
import { useTurfContext } from '@context/TurfContext';
import { useUser } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/router';
import { userAgent } from 'next/server';
import { ChangeEvent, useReducer, useState } from 'react';
import { toast } from 'react-hot-toast';
import { supabase } from 'src/lib/supabase';

interface DateProps {
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

interface TimeProps {
  value: string;
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
}

interface StateProps {
  date: string;
  startTime: string | undefined;
  endTime: string | undefined;
}

interface ActionProps {
  type: 'updateDate' | 'updateStartTime' | 'updateEndTime';
  value: string;
}

const initialState = {
  date: new Date().toISOString().split('T')[0],
  startTime: undefined,
  endTime: undefined
};

const reducer = (state: StateProps, action: ActionProps) => {
  switch (action.type) {
    case 'updateDate':
      return { ...state, date: action.value };
    case 'updateStartTime':
      return { ...state, startTime: action.value };
    case 'updateEndTime':
      return { ...state, endTime: action.value };
    default:
      return state;
  }
};

const DateInput = ({ value, onChange }: DateProps) => {
  return (
    <input type="date" value={value} className="inputCss" onChange={onChange} />
  );
};

const TimeSelect = ({ value, onChange }: TimeProps) => {
  // const times1=[
  //   {
  //     time:"9-10"
  //     isused:false
  //   }
  //   {

  //   }
  // ]
  const times = [
    'Select Time',
    '9:00 AM',
    '10:00 AM',
    '11:00 AM',
    '12:00 PM',
    '1:00 PM',
    '2:00 PM',
    '3:00 PM',
    '4:00 PM',
    '5:00 PM'
  ];

  return (
    <select className="inputCss form-select" value={value} onChange={onChange}>
      {times.map((time) => (
        <option key={time} value={time}>
          {time}
        </option>
      ))}
    </select>
  );
};



const Booking = () => {
  const [state, dispatch] = useReducer(reducer, initialState);


  const router = useRouter();
  const user = useUser();

  const { turfs } = useTurfContext();

  const { id } = router.query;

  const turf = turfs.find((t) => t.turf_id === id);

  const handleDateChnage = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'updateDate', value: event.target.value });
  };

  const handleStartTimeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    dispatch({ type: 'updateStartTime', value: event.target.value });
  };

  const handleEndTimeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    dispatch({ type: 'updateEndTime', value: event.target.value });
  };

  const { addBooks ,books } = useBookContext()

  const slots = books.map((book) => {
    return{
      date:book.date,
      start_time:book.start_time,
      end_time:book.end_time
    }
  });
  console.log(slots)

  

const onSlotSubmit = ()=>{

  
  // const enterData = async () => {
  //   await supabase 
  //   .from("bookings")
  //   .insert({start_time:state.startTime,end_time:state.endTime,date:state.date,profile_id:user.id, turf_id:turf.turf_id})
  // }
  const bookslotss = slots.find(
    (slot)=>{
      slot.start_time === state.startTime && slot.end_time === state.endTime && slot.date === state.date
    }
  )
  console.log(bookslotss)

  if(bookslotss){
    toast("These Time Slot already Booked ")
  }
  else{
  addBooks(turf?.turf_id,{
    start_time:state.startTime,
    end_time:state.endTime,
    date:state.date,
    profile_id:user.id
  })
  }


  // enterData()

}

  return (
    <Layout title={turf?.turf_name}>
      <main className="w-full px-10">
        <form className="formCss" onSubmit={onSlotSubmit}>
          <div>
            <label htmlFor="date">Date</label>
            <DateInput value={state.date} onChange={handleDateChnage} />
          </div>
          <div>
            <label htmlFor="start_date">Start Time</label>
            <TimeSelect
              value={state.startTime}
              onChange={handleStartTimeChange}
            />
          </div>
          <div>
            <label htmlFor="end_time">End Time</label>
            <TimeSelect value={state.endTime} onChange={handleEndTimeChange} />
          </div>
            <button >Submit</button>  
        </form>
      </main>
    </Layout>
  );
};

export default Booking;
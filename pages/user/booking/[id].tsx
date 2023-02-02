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
  // const times = [
  //   'Select Time',
  //   '9:00:00',
  //   '10:00:00',
  //   '11:00:00',
  //   '12:00:00',
  //   '13:00:00',
  //   '14:00:00',
  //   '15:00:00',
  //   '16:00:00',
  //   '17:00:00'
  // ];
  const times = [
    {
      label: 'Select Time',
      value: ''
    },
    {
      label: '9:00 AM - 10:00',
      value: '9:00:00'
    },
    {
      label: '10:00 AM',
      value: '10:00:00'
    },
    {
      label: '11:00 AM',
      value: '11:00:00'
    },
    {
      label: '12:00 PM',
      value: '12:00:00'
    },
    {
      label: '1:00 PM',
      value: '13:00:00'
    },
    {
      label: '2:00 PM',
      value: '14:00:00'
    },
    {
      label: '3:00 PM',
      value: '15:00:00'
    },
    {
      label: '4:00 AM',
      value: '16:00:00'
    },
    {
      label: '5:00 AM',
      value: '17:00:00'
    },
    {
      label: '6:00 AM',
      value: '18:00:00'
    }
  ];

  return (
    <select className="inputCss form-select" value={value} onChange={onChange}>
      {times.map((time) => (
        <option key={time.value} value={time.value} disabled>
          {time.label}

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

  const { addBooks, books } = useBookContext();

  const slots = books.map((book) => {
    return {
      date: book.date,
      start_time: book.start_time,
      end_time: book.end_time
    };
  });

  console.log(state.startTime);

  const onSlotSubmit = (e) => {
    e.preventDefault();
    const bookslotss = slots.find(
      (slot) =>
        slot.start_time === state.startTime &&
        slot.end_time === state.endTime &&
        slot.date === state.date
    );

   
      const sameValue = state.startTime === state.endTime 
      const differnceValue = state.startTime < state.endTime
    

    if (bookslotss ) {
      toast('These Time Slot already Booked ');
    } 
    if (sameValue){
      toast.error("Same Start And  End Time Selected ")
    }
    if(differnceValue){
      toast.error("End Time Should Be Higher Than Start Time")
    }

      addBooks(turf?.turf_id, {
        start_time: state.startTime,
        end_time: state.endTime,
        date: state.date,
        profile_id: user.id
      });
    
  };

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
          <button>Submit</button>
        </form>
      </main>
    </Layout>
  );
};

export default Booking;

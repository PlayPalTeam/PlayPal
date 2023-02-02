import Layout from '@components/Layout';
import { useTurfContext } from '@context/TurfContext';
import { useRouter } from 'next/router';
import { ChangeEvent, useReducer } from 'react';

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
  console.log(state);

  const router = useRouter();

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

  return (
    <Layout title={turf?.turf_name}>
      <main className="w-full px-10">
        <form className="formCss">
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
        </form>
      </main>
    </Layout>
  );
};

export default Booking;

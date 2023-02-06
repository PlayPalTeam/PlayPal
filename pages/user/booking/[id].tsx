import CardDisclosure from '@components/CardDisclosure';
import DialogBox from '@components/Dialog';
import Layout from '@components/Layout';
import VenueRules from '@components/VenueRules';
import { useBookContext } from '@context/BookingContext';
import { useTurfContext } from '@context/TurfContext';
import { useUser } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/router';
import { ChangeEvent, useReducer, useState } from 'react';
import { BsArrowRight, BsStarFill } from 'react-icons/bs';

interface DateProps {
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

interface Slot {
  time: string[];
}

interface TimeProps {
  value: string;
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  slots: Slot[];
}

interface Time {
  label: string;
  value: string;
  disble?: boolean;
}

interface StateProps {
  date: string;
  startTime: string | undefined;
}

interface ActionProps {
  type: 'updateDate' | 'updateStartTime';
  value: string;
}

const initialState = {
  date: new Date().toISOString().split('T')[0],
  startTime: undefined
};

const reducer = (state: StateProps, action: ActionProps) => {
  switch (action.type) {
    case 'updateDate':
      return { ...state, date: action.value };
    case 'updateStartTime':
      return { ...state, startTime: action.value };
    default:
      return state;
  }
};

const DateInput = ({ value, onChange }: DateProps) => {
  return (
    <input type="date" value={value} className="inputCss" onChange={onChange} />
  );
};

const TimeSelect = ({ value, onChange, slots }: TimeProps) => {
  const times: Time[] = [
    {
      label: 'Select Time',
      value: ''
    },
    {
      label: '9:00 AM - 10:00 AM',
      value: '9:00 - 10:00'
    },
    {
      label: '10:00 AM -11:00 AM',
      value: '10:00 - 11:00'
    },
    {
      label: '11:00 AM - 12:00 PM',
      value: '11:00 - 12:00'
    },
    {
      label: '12:00 PM - 1:00 PM',
      value: '12:00 - 13:00'
    },
    {
      label: '1:00 PM - 2:00 PM',
      value: '13:00 - 14:00'
    },
    {
      label: '2:00 PM - 3:00 PM',
      value: '14:00 - 15:00'
    },
    {
      label: '3:00 PM - 4:00 PM',
      value: '15:00 -16:00'
    },
    {
      label: '4:00 PM - 5:00 PM',
      value: '16:00 - 17:00'
    },
    {
      label: '5:00 PM - 6:00 PM',
      value: '17:00 - 18:00'
    },
    {
      label: '6:00 PM - 7:00 PM',
      value: '18:00 - 19:00'
    }
  ];

  times.forEach((time) => {
    slots.forEach((slot) => {
      if (slot.time.includes(time.value)) {
        time.disble = true;
      }
    });
  });

  return (
    <div className="form-control">
      <label htmlFor="slotTime">Select Your Slot</label>
      <select className="select" id="" value={value} onChange={onChange}>
        {times.map((time) => {
          return (
            <option key={time.value} value={time.value} disabled={time.disble}>
              {time.label}
            </option>
          );
        })}
      </select>
    </div>
  );
};

const Booking = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectSports, setSelectSports] = useState<string>('');

  const { addBooking, books } = useBookContext();

  const router = useRouter();

  const user = useUser();

  const { turfs } = useTurfContext();

  const { id } = router.query;

  const turf = turfs.find((t) => t.turf_id === id);

  const showRules = <VenueRules />;

  const handleDateChnage = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'updateDate', value: event.target.value });
  };

  const handleStartTimeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    dispatch({ type: 'updateStartTime', value: event.target.value });
  };

  const filteredSlots = books
    .filter((book) => book.date === state.date)
    .map((book) => ({ time: book.times }));

  const onSlotSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (turf && user) {
      addBooking(turf.turf_id, {
        times: [state.startTime],
        date: state.date,
        profile_id: user.id,
        selectedsport: selectSports
      });

      setIsOpen(false);
    }
  };

  return (
    <Layout title={turf?.turf_name}>
      <div className="mt-6 flex w-full justify-center sm:mt-14 ">
        <div className="m-4 sm:w-[58%]">
          <div className="mb-4 p-4 sm:p-6">
            {/* <Image
              src="/exampleturfimage.webp"
              className="h-[330px] rounded-md bg-contain"
              alt="fuck off"
              width={750}
              height={750} */}
            {/* /> */}
          </div>
          <div className="flex justify-between p-6">
            <div>
              <div className="font-bold tracking-widest">
                {' '}
                {turf?.turf_name}
              </div>
              <div className="pt-2 text-sm">
                {turf?.price_per_hour}/- onwards . {turf?.opening_hours} -{' '}
                {turf?.ending_hours}
              </div>
            </div>
            <div className="flex items-center justify-between p-4 pt-0 ">
              {' '}
              <BsStarFill color="green" className="mr-3" />
              3.4
            </div>
          </div>
          <div className="p-6">
            <h3 className="pb-4 font-bold tracking-widest">Location</h3>
            <span className="w-[300px] text-sm tracking-wider">
              {turf?.location}
            </span>
          </div>
          <div className="p-6">
            <div className="pb-4 font-bold tracking-widest">Ameninties</div>
            <div className="flex justify-between p-4">
              <div>Artificial Turf</div>
              <div>Logo</div>
            </div>
          </div>
          <div className="flex justify-between">
            <CardDisclosure title={'Venue Rules'} element={showRules} />
          </div>
          <div className="p-6 shadow">
            <div className="">
              <div className="pb-4 font-bold tracking-widest">
                Availabel Sports (Choose){' '}
              </div>
              <div>
                <div className="">
                  {turf?.sports.map((s) => (
                    <p key={s} className="flex items-center ">
                      <input
                        type="radio"
                        name={'select'}
                        value={s}
                        onChange={() => setSelectSports(s)}
                      />
                      <span className="pl-3">{s}</span>
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(true)}
            className="group  mt-8 flex  items-center gap-x-1 rounded-md bg-emerald-300 px-4 py-2 hover:bg-emerald-400 active:bg-emerald-500"
          >
            Book Slot{' '}
            <BsArrowRight className="duration-300 group-hover:translate-x-1" />
          </button>
          <DialogBox title={'Book Slot'} isOpen={isOpen} setIsOpen={setIsOpen}>
            {/* this is the popu up section */}
            <main className="w-full px-10">
              <form className="form-control" onSubmit={onSlotSubmit}>
                <div>
                  <label htmlFor="date">Date</label>
                  <DateInput value={state.date} onChange={handleDateChnage} />
                </div>

                <TimeSelect
                  value={state.startTime}
                  onChange={handleStartTimeChange}
                  slots={filteredSlots}
                />
                <button>Submit</button>
              </form>
            </main>
          </DialogBox>
        </div>
      </div>
    </Layout>
  );
};

export default Booking;

import Button from '@components/Button';
import CardDisclosure from '@components/CardDisclosure';
import DialogBox from '@components/Dialog';
import Layout from '@components/Layout';
import VenueRules from '@components/VenueRules';
import { useBookContext } from '@context/BookingContext';
import { useTurfContext } from '@context/TurfContext';
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/router';
import { userAgent } from 'next/server';
import { ChangeEvent, useReducer, useState } from 'react';
import { toast } from 'react-hot-toast';
import { BsArrowRight, BsStarFill } from 'react-icons/bs';
import { supabase } from 'src/lib/supabase';
import { Database } from 'src/types/database.types';

interface DateProps {
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

interface TimeProps {
  value: string;
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  slots?: { boll: any; time: any }[];
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
  const times = [
    {
      label: 'Select Time',
      value: '',
      disble: false
    },
    {
      label: '9:00 AM - 10:00 AM',
      value: '9:00 - 10:00',
      disble: false
    },
    {
      label: '10:00 AM -11:00 AM',
      value: '10:00 - 11:00',
      disble: false
    },
    {
      label: '11:00 AM - 12:00 PM',
      value: '11:00 - 12:00',
      disble: false
    },
    {
      label: '12:00 PM - 1:00 PM',
      value: '12:00 - 13:00',
      disble: false
    },
    {
      label: '1:00 PM - 2:00 PM',
      value: '13:00 - 14:00',
      disble: false
    },
    {
      label: '2:00 PM',
      value: '14:00:00',
      disble: false
    },
    {
      label: '3:00 PM',
      value: '15:00:00',
      disble: false
    },
    {
      label: '4:00 AM',
      value: '16:00:00',
      disble: false
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

  times.map((time) => {
    return slots.map((slot) => {
      return;
      [];
    });
  });

  return (
    <select className="inputCss form-select" value={value} onChange={onChange}>
      {times.map((time) => {
        return (
          <option key={time.value} value={time.value}>
            {time.label}
          </option>
        );
      })}
    </select>
  );
};

const Booking = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [isOpen, setIsOpen] = useState<boolean>(false);

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

  const avail = turfs.map((turf) => {
    return turf.sports.map((t) => {
      return t;
    });
  });

  console.log(avail);

  const { addBooking, books } = useBookContext();

  const slots = books.map((book) => {
    return {
      date: book.date
    };
  });

  // const filterByDate = slots.filter((slot) => slot.date === state.date);

  // const checkExists = filterByDate.map((times) => {
  //   return {
  //     boll: times.time.includes(state.startTime),
  //     time: times.time
  //   };
  // });

  // console.log(checkExists);

  const onSlotSubmit = (e) => {
    e.preventDefault();

    addBooking(turf?.turf_id, {
      times: [state.startTime],
      date: state.date,
      profile_id: user.id
    });

    setIsOpen(false);
  };

  // const { addBooking, books } = useBookContext();

  // const slots = books.map((book) => {
  //   return {
  //     date: book.date,
  //     start_time: book.start_time,
  //     end_time: book.end_time
  //   };
  // });
  // console.log(slots);

  // const onSlotSubmit = () => {
  //   // const enterData = async () => {
  //   //   await supabase
  //   //   .from("bookings")
  //   //   .insert({start_time:state.startTime,end_time:state.endTime,date:state.date,profile_id:user.id, turf_id:turf.turf_id})
  //   // }
  //   const bookslotss = slots.find((slot) => {
  //     slot.start_time === state.startTime &&
  //       slot.end_time === state.endTime &&
  //       slot.date === state.date;
  //   });
  //   console.log(bookslotss);

  //   if (bookslotss) {
  //     toast('These Time Slot already Booked ');
  //   } else {
  //     addBooks(turf?.turf_id, {
  //       date: state.date,
  //       profile_id: user.id
  //     });
  //   }

  //   // enterData()
  // };

  return (
    <Layout title={turf?.turf_name}>
      <div className="mt-6 flex w-full justify-center sm:mt-14 ">
        <div className="m-4 sm:w-[58%]">
          <div className="mb-4 p-4  shadow sm:p-6">
            {/* <Image
              src="/exampleturfimage.webp"
              className="h-[330px] rounded-md bg-contain"
              alt="fuck off"
              width={750}
              height={750} */}
            {/* /> */}
          </div>
          <div className="flex justify-between p-6  shadow ">
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
          <div className="p-6 shadow">
            <div className="">
              <div className="pb-4 font-bold tracking-widest">Location</div>
              <span className="w-[300px] text-sm tracking-wider">
                {turf?.location}
              </span>
            </div>
          </div>
          <div className="p-6 shadow">
            <div className="pb-4 font-bold tracking-widest">
              Availabel Sports
            </div>
            <div className="flex">
              <div>Box Cricket</div>
              <div className="ml-6"> Football</div>
            </div>
          </div>
          <div className="p-6 shadow">
            <div className="pb-4 font-bold tracking-widest">Ameninties</div>
            <div className="flex justify-between p-4">
              <div>Artificial Turf</div>
              <div>Logo</div>
            </div>
          </div>
          <div className="p-6 shadow">
            <div className="flex justify-between">
              <div>
                <div className="pb-4 font-bold tracking-widest">
                  Venue Rules
                </div>
                <div className="text-sm">
                  Arrive 10 mins before booking time
                </div>
                <div className=" pt-4">
                  <CardDisclosure title={'More'} element={showRules} />
                </div>
              </div>
              <div className="mt-3"></div>
            </div>
          </div>
          <div className="p-6">
            <div className="p-8">
              <div>Choose the Sport</div>
              <div>{}</div>
            </div>
            <Button
              isSubmitting={false}
              text={'Select a Sport to Proceed'}
              type={'button'}
            />
          </div>
          <button
            onClick={() => setIsOpen(true)}
            className="group ml-6 flex items-center gap-x-1 rounded-md bg-emerald-300 px-4 py-2 hover:bg-emerald-400 active:bg-emerald-500"
          >
            Book Slot{' '}
            <BsArrowRight className="duration-300 group-hover:translate-x-1" />
          </button>
          <DialogBox title={'Book Slot'} isOpen={isOpen} setIsOpen={setIsOpen}>
            {/* this is the popu up section */}
            <main className="w-full px-10">
              <form
                className="formCss"
                onSubmit={onSlotSubmit}
              >
                <div>
                  <label htmlFor="date">Date</label>
                  <DateInput value={state.date} onChange={handleDateChnage} />
                </div>
                <div>
                  <label htmlFor="start_date">Start Time</label>
                  <TimeSelect
                    value={state.startTime}
                    onChange={handleStartTimeChange}
                    // slots={checkExists}
                  />
                </div>
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
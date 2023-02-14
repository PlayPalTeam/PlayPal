import { useRouter } from 'next/router';
import { ChangeEvent, useReducer, useState } from 'react';
import { BsArrowRight } from 'react-icons/bs';
import { useBookContext } from '@context/BookingContext';
import { useTurfContext } from '@context/TurfContext';
import useHelper from '@hooks/useHelper';
import dynamic from 'next/dynamic';
import { useUser } from '@supabase/auth-helpers-react';

interface StateProps {
  date: string;
  slotTime: string;
}

interface ActionProps {
  type: 'updateDate' | 'updateSlotTime';
  value: string;
}

const initialState = {
  date: new Date().toISOString().split('T')[0],
  slotTime: ''
};

const reducer = (state: StateProps, action: ActionProps) => {
  switch (action.type) {
    case 'updateDate':
      return { ...state, date: action.value };
    case 'updateSlotTime':
      return { ...state, slotTime: action.value };
    default:
      return state;
  }
};

const TimeSelect = dynamic(() => import('@components/TimeSelect'));
const DialogBox = dynamic(() => import('@components/Dialog'));
const DateInput = dynamic(() => import('@components/DateInput'));

const Booking = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectSports, setSelectSports] = useState<string>('');
  const { addBooking, books } = useBookContext();
  const { ErrorMessage } = useHelper();
  const { turfs } = useTurfContext();
  const { query } = useRouter();
  const user = useUser();

  const { id } = query;

  const turf = turfs.find((t) => t.turf_id === id);

  const handleDateChnage = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'updateDate', value: event.target.value });
  };

  const handleSlotTimeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    dispatch({ type: 'updateSlotTime', value: event.target.value });
  };

  function handleBookSlot() {
    if (selectSports?.length > 0) {
      setIsOpen(true);
    } else {
      ErrorMessage({ message: 'Select a sport' });
    }
  }

  const filteredSlots = books.filter((book) => book.date === state.date).map((book) => ({ time: book.times }));

  const onSlotSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (state.slotTime?.length > 0) {
      addBooking(turf.turf_id, {
        times: [state.slotTime],
        date: state.date,
        profile_id: user?.id,
        selectedsport: selectSports
      });

      setIsOpen(false);
    } else {
      ErrorMessage({ message: 'Select time slot' });
    }
  };

  return (
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
            <div className="font-bold tracking-widest"> {turf?.turf_name}</div>
            <div className="pt-2 text-sm">
              {turf?.price}/- onwards . {turf?.open_hour} - {turf?.close_hour}
            </div>
          </div>
        </div>
        <div className="p-6">
          <h3 className="pb-4 font-bold tracking-widest">address</h3>
          <span className="w-[300px] text-sm tracking-wider">{turf?.address}</span>
        </div>
        <div className="p-6">
          <div className="pb-4 font-bold tracking-widest">Ameninties</div>
          <div className="flex justify-between p-4">
            <div>Artificial Turf</div>
            <div>Logo</div>
          </div>
        </div>
        <div className="form-control p-6">
          <p className="pb-4 font-bold tracking-widest">Availabel Sports (Choose) </p>
          {turf?.sports.map((s) => (
            <div key={s} className="">
              <label className="label cursor-pointer">
                <input type="radio" name={'select'} value={s} className={`radio-primary radio`} onChange={() => setSelectSports(s)} />
                <span className="label-text">{s.toUpperCase()}</span>
              </label>
            </div>
          ))}
          <button onClick={handleBookSlot} className="group btn-primary btn mt-5 gap-2">
            Book Slot <BsArrowRight className="duration-300 group-hover:translate-x-1" />
          </button>
        </div>
        <DialogBox title={'Book Slot'} isOpen={isOpen} setIsOpen={setIsOpen}>
          <form className="w-full space-y-5 px-10" onSubmit={onSlotSubmit}>
            <DateInput value={state.date} onChange={handleDateChnage} />
            <TimeSelect value={state.slotTime} onChange={handleSlotTimeChange} slots={filteredSlots} />
            <button className="btn-primary btn-block btn" type="submit">
              Submit
            </button>
          </form>
        </DialogBox>
      </div>
    </div>
  );
};

export default Booking;

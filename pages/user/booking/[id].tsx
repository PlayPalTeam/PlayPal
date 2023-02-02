import { useRouter } from 'next/router';
import { useTurfContext } from '../../../src/context/TurfContext';
import Link from 'next/link';
import { BookingForm } from '../../../src/content/contents';
import { SubmitHandler } from 'react-hook-form';
import { BookingType } from '../../../src/types/types';
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import { Database } from '../../../src/types/database.types';
import { toast } from 'react-hot-toast';
import Image from 'next/image';
import { BsStarFill } from 'react-icons/bs';
import VenueRules from '../../../src/components/VenueRules';
import Button from '@components/Button';
import CardDisclosure from '@components/CardDisclosure';
import Form from '@components/FormComponent';
import FormTitle from '@components/FormTitle';
import Layout from '@components/Layout';
import Calendar from 'react-calendar';
import { useState } from 'react';
import 'react-calendar/dist/Calendar.css';
import ReactTimeslotCalendar from 'react-timeslot-calendar';
import moment from 'moment';
import DayTimePicker from '@mooncake-dev/react-day-time-picker';
import TimeRangePicker from '@wojtekmaj/react-timerange-picker/dist/entry.nostyle';
import Timeit from 'react-timeit';
import { useEffect } from 'react';

const Book = () => {
  const router = useRouter();

  const supabase = useSupabaseClient<Database>();

  const user = useUser();

  const { turfs } = useTurfContext();

  const { id } = router.query;

  const turf = turfs.find((t) => t.turf_id === id);

  const onSubmit: SubmitHandler<BookingType> = async (data) => {
    const { error } = await supabase
      .from('bookings')
      .insert({ ...data, profile_id: user.id, turf_id: id as string });

    if (error) {
      toast.error(error.message, { duration: 5000 });
    }

    toast.success('Your place is booked');
  };

  const showRules = <VenueRules />;
  const [value, setchangeValue] = useState(new Date());

  const consoleit = () => {
    console.log(value);
  };

  const handleScheduled = async (dateTime) => {
    console.log('scheduled: ', dateTime);
    setchangeValue(dateTime);
    console.log(value.getHours());
    let date = dateTime;
    let starttime = dateTime.getHours();

    const { error } = await supabase
      .from('bookings_duplicate')
      .insert({
        starttimes: starttime,
        date: date,
        profile_id: user.id,
        turf_id: id as string
      });

    if (error) {
      toast.error(error.message, { duration: 5000 });
    } else {
      toast.success('Your place is booked');
    }
  };
  const [timedata, settimedata] = useState([]);

  const gettimedata = async () => {
    const { data } = await supabase
      .from('bookings_duplicate')
      .select();

    if (data) {
      settimedata(data);
    }
  };

  useEffect(() => {
  gettimedata()
  console.log(timedata)
  }, [])
  
  // for(let i=0;i<timedata.length;i++){
  //   const toDeleteTime = new Date(
  //     // slotTime.getFullYear(),
  //     timedata[i].date.getFullYear(),
  //     // slotTime.getMonth(),
  //     timedata[1].date.getMonth(),
  //     // slotTime.getDate(),
  //     timedata[i].date.getDate(),
  //     timedata[i].starttimes,
  //     0,
  //     0
  //   );
    
  // }
  
  function timeSlotValidator(slotTime) {
    const eveningTime = new Date(
      // slotTime.getFullYear(),
      value.getFullYear(),
      // slotTime.getMonth(),
      value.getMonth(),
      // slotTime.getDate(),
      value.getDate(),
      value.getHours(),
      0,
      0
    );

    const isValid = slotTime.getTime() == eveningTime.getTime() ? false : true;
    return isValid;
  }
  const [valueTime, onTimeChange] = useState(['10:00', '11:00']);

  return (
    <Layout title={turf?.turf_name}>
      <div className="mt-24 flex w-full justify-center ">
        <div className="">
          <div className="">
            <Image
              src="/exampleturfimage.webp"
              className="h-[330px] rounded-md bg-contain"
              alt="fuck off"
              width={600}
              height={600}
            />
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
            <Button
              isSubmitting={false}
              text={'Select a Sport to Proceed'}
              type={'button'}
            />
          </div>
        </div>

        <main className="flex h-screen items-center justify-center">
          <div className="flex w-full max-w-2xl items-center border">
            <section className="px-20">
              <h1>Booking for {turf?.turf_name}</h1>
              <p>Location: {turf?.location}</p>
              <p>Size: {turf?.capacity}</p>
              <p>Price: {turf?.price_per_hour}/hour</p>
            </section>
            <section className="p-5">
              <FormTitle title="Book" />
              <Form
                formFields={BookingForm}
                onSubmit={onSubmit}
                form={'Booking'}
                buttonType={'submit'}
                buttonText={'Book Now'}
              />
              <Link href="/user/booking">Back to turf list</Link>
            </section>
          </div>
        </main>
      </div>
      <div className=" mt-5  mb-12">
        {/* <Calendar value={value} onChange={setchangeValue}/>  */}
        {/* <TimeRangePicker onChange={onTimeChange} value={valueTime} /> */}
        {/* <ReactTimeslotCalendar
        // initialDate={moment([2017, 3, 24]).format()}

          timeslots={[
            ["8", "9"], // 1:00 AM - 2:00 AM
            ["9", "10"], 
            ["10", "11"], 
            ["11", "12"],
            ["12", "13"],
            ["13", "14"],
            ["14", "15"],
            ["15", "16"],
            ["16", "17"],
            ["17", "18"],
            ["18", "19"]
          ]}

          maxTimeslots={2}
        
          disabledTimeslots = {[
          {
              startDate: 'Feb 2th 2023, 1 PM',
              format: 'MMMM Do YYYY, h A',
          },
          {
              startDate: 'May 1st 2017, 3:00:00 PM',
              format: 'MMMM Do YYYY, h:mm:ss A',
          },
          {
              startDate: 'May 5th 2017, 6:00:00 PM',
              format: 'MMMM Do YYYY, h:mm:ss A',
          },
        ]}

    

      

      /> */}
        <DayTimePicker
          timeSlotSizeMinutes={60}
          onConfirm={handleScheduled}
          timeSlotValidator={timeSlotValidator}
        />
        ;<button onClick={consoleit}>Get Date</button>
      </div>
    </Layout>
  );
};

export default Book;

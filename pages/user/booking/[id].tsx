import { useState, memo } from 'react';
import { useTurfContext } from '@context/TurfContext';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { BookTurfSchema, BookTurfType } from 'src/types/types';
import useHelper from '@hooks/useHelper';
import { useBookContext } from '@context/BookingContext';
import { format } from 'date-fns';

const DialogBox = dynamic(() => import('@components/Dialog'));
const FormInput = dynamic(() => import('@components/FormElement').then((mod) => mod.FormInput));
const MultiSlect = dynamic(() => import('@components/FormElement').then((mod) => mod.FormMultiSelect));
const Button = dynamic(() => import('@components/Button'));

const Booking = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { query } = useRouter();
  const { id } = query;

  const method = useForm<BookTurfType>({ resolver: yupResolver(BookTurfSchema) });
  const {
    handleSubmit,
    formState: { isSubmitting },
    getValues,
    reset,
    watch
  } = method;

  const date = watch('date');

  const { convertTime, createOneHourSlot } = useHelper();

  const { allTurfs } = useTurfContext();
  const { addBooking, books } = useBookContext();

  const turf = allTurfs.find((turf) => turf.turf_id === id);

  if (!turf) {
    return (
      <main className="mx-auto my-10 max-w-4xl text-center">
        <p>Sorry, the requested turf could not be found.</p>
      </main>
    );
  }

  const filterSlot = books.filter((book) => book?.date === date?.toString()).flatMap((book) => book?.times);

  const onSubmit: SubmitHandler<BookTurfType> = async (data) => {
    const slot = getValues('slot').map((t) => t.value);
    const sport = getValues('sport.value');
    await addBooking(turf?.turf_id, { date: format(data.date, 'yyyy-mM-dd'), times: slot, selectedsport: sport });
    reset();
  };

  return (
    <main className="mx-auto my-10 w-[90%] max-w-4xl">
      <div className="space-y-5">
        <section>
          <p>Name:{turf?.turf_name.toUpperCase()}</p>
          <p>Address:{turf?.address}</p>
        </section>
        <section>
          <p>Pricing:{turf.price}</p>
          <p>Capacity:{turf.capacity}</p>
        </section>
        <section>
          <p>Timing</p>
          <p>
            {convertTime(turf?.open_hour)} - {convertTime(turf?.close_hour)}
          </p>
        </section>
        <section>
          <p>Description</p>
          <p>{turf.description}</p>
        </section>
        <section>
          <p>Amenities Available</p>
          {turf?.amenities.map((am, index) => (
            <p key={index}>
              {am
                .split('-')
                .map((word) => word.charAt(0).toUpperCase() + word.substring(1))
                .join(' ')}
            </p>
          ))}
        </section>
        <Button text="Book SLot" type="button" onClick={() => setIsOpen(!isOpen)} />
        <DialogBox title={'Book Slot'} isOpen={isOpen} setIsOpen={setIsOpen}>
          <div className="space-y-5">
            <FormProvider {...method}>
              <FormInput name="date" label="Date" type={'date'} />
              <MultiSlect
                options={createOneHourSlot(turf?.open_hour, turf?.close_hour, filterSlot)}
                name={'slot'}
                label={'Pick the timing'}
                isMulti={true}
              />
              <MultiSlect
                options={turf?.sports.map((item) => ({ value: item, label: item }))}
                name={'sport'}
                label={'Pick a Sport'}
                isMulti={false}
              />
              <Button disabled={isSubmitting} text="Book" type="submit" onClick={handleSubmit(onSubmit)} />
            </FormProvider>
          </div>
        </DialogBox>
      </div>
    </main>
  );
};

export default memo(Booking);

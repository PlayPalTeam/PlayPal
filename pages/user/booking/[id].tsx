import { memo } from 'react';
import { useTurfContext } from '@context/TurfContext';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { BookTurfSchema, BookTurfType } from 'src/types/types';
import useHelper from '@hooks/useHelper';
import { useBookContext } from '@context/BookingContext';

const DialogBox = dynamic(() => import('@components/Dialog'));
const FormInput = dynamic(() => import('@components/FormElement').then((mod) => mod.FormInput));
const FormSelect = dynamic(() => import('@components/FormElement').then((mod) => mod.FormSelect));
const Button = dynamic(() => import('@components/Button'));
const TurfInfo = dynamic(() => import('@components/TurfInfo'));

const Booking = () => {
  const { query } = useRouter();
  const { id } = query;

  const method = useForm<BookTurfType>({ resolver: yupResolver(BookTurfSchema) });

  const date = method.watch('date');

  const { createOneHourSlot, convertTime, DatetoString } = useHelper();

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
    const slot = method.getValues('slot').map((t) => t.value);
    const sport = method.getValues('sport.value');
    await addBooking(turf?.turf_id, { date: DatetoString(data.date), times: slot, selectedsport: sport });
    method.reset();
  };

  return (
    <TurfInfo turf={turf}>
      <div className="mb-5">
        <DialogBox buttonText="Book Slot" dialogId="bookSlot" className="btn-primary btn w-full">
          <FormProvider {...method}>
            <form className="space-y-5">
              <FormInput name="date" label="Date" type={'date'} />
              <FormSelect
                options={createOneHourSlot(convertTime(turf?.open_hour), convertTime(turf?.close_hour), filterSlot)}
                name={'slot'}
                label={'Pick the timing'}
                isMulti={true}
              />
              <FormSelect
                options={turf?.sports.map((item) => ({ value: item, label: item }))}
                name={'sport'}
                label={'Pick a Sport'}
                isMulti={false}
              />
              <Button disabled={method.formState.isSubmitting} text="Book" type="submit" onClick={method.handleSubmit(onSubmit)} />
            </form>
          </FormProvider>
        </DialogBox>
      </div>
    </TurfInfo>
  );
};

export default memo(Booking);

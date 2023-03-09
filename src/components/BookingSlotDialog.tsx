import { useBookContext } from '@context/BookingContext';
import { yupResolver } from '@hookform/resolvers/yup';
import useHelper from '@hooks/useHelper';
import dynamic from 'next/dynamic';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { BookTurfSchema, BookTurfType } from 'src/types/types';

const DialogBox = dynamic(() => import('@components/Dialog'));
const FormInput = dynamic(() => import('@components/FormElement').then((mod) => mod.FormInput));
const FormSelect = dynamic(() => import('@components/FormElement').then((mod) => mod.FormSelect));
const Button = dynamic(() => import('@components/Button'));

interface BookingSlotDialogProps {
  turf_id: string;
  price: number;
  open_hour: string;
  close_hour: string;
  sports: string[];
}

const BookingSlotDialog = ({ close_hour, open_hour, price, sports, turf_id }: BookingSlotDialogProps) => {
  const method = useForm<BookTurfType>({ resolver: yupResolver(BookTurfSchema) });
  const { createOneHourSlot, convertTime, dateToString } = useHelper();
  const { addBooking, books } = useBookContext();

  const date = method.watch('date');

  const filterSlot = books.filter((book) => book?.date === date?.toString()).flatMap((book) => book?.times);

  const onSubmit: SubmitHandler<BookTurfType> = async (data) => {
    const { date, slot, sport } = data;
    const turfId = turf_id;
    const cost = turfId ? price * slot.length : 0;
    addBooking(turfId, { date: dateToString(date), cost, times: slot.map((t) => t.value), selectedsport: sport.value });

    method.reset();
  };

  return (
    <DialogBox buttonText="Book Slot" dialogId="bookSlot" className="btn-primary btn w-full">
      <FormProvider {...method}>
        <form className="space-y-5">
          <FormInput name="date" label="Date" type={'date'} />
          <FormSelect
            options={createOneHourSlot(convertTime(open_hour), convertTime(close_hour), filterSlot)}
            name={'slot'}
            label={'Pick the timing'}
            isMulti={true}
          />
          <FormSelect options={sports?.map((item) => ({ value: item, label: item }))} name={'sport'} label={'Pick a Sport'} isMulti={false} />
          <Button disabled={method.formState.isSubmitting} text="Book" type="submit" onClick={method.handleSubmit(onSubmit)} />
        </form>
      </FormProvider>
    </DialogBox>
  );
};

export default BookingSlotDialog;

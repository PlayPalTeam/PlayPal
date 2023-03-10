import { useBookContext } from '@context/BookingContext';
import { useRequestContext } from '@context/RequestContext';
import { yupResolver } from '@hookform/resolvers/yup';
import { memo, useMemo } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { RequestSchema, RequestType } from 'src/types/types';
import Button from './Button';
import Dialog from './Dialog';
import { FormInput, FormSelect } from './FormElement';

const RequestForm = () => {
  const method = useForm<RequestType>({ resolver: yupResolver(RequestSchema) });
  const { addRequest } = useRequestContext();
  const { books } = useBookContext();
  const { requests } = useRequestContext();

  const id = method.watch('turf_id');

  const names_of_turf = useMemo(() => {
    const uniqueIds = Array.from(new Set(books.map((book) => book.turf_id)));
    return uniqueIds.reduce((acc, id) => {
      const turf = books.find((book) => book.turf_id === id);
      if (Array.isArray(turf.turfs)) {
        return [
          ...acc,
          ...turf.turfs.map((t) => {
            return { value: id, label: t.turf_name };
          })
        ];
      } else {
        return [...acc, { value: id, label: turf.turfs.turf_name }];
      }
    }, []);
  }, [books]);

  const dates = useMemo(() => {
    const today = new Date();
    return books
      .filter((book) => book?.turf_id === id?.value && new Date(book?.date) >= today)
      .map((book) => ({ value: book?.date, label: book?.date }));
  }, [books, id?.value]);

  const onSubmit: SubmitHandler<RequestType> = async (formData) => {
    const checkIfExist = requests.find((req) => req.game_date === formData.game_date && req.turf_id === formData.turf_id);

    if (checkIfExist) {
      toast.error(`Request aleady exsist for ${formData.game_date} `);
    } else {
      addRequest({ ...formData, turf_id: method.getValues('turf_id').value, game_date: method.getValues('game_date').value });
      method.reset();
    }
  };

  return (
    <Dialog buttonText="Create Request" title="Create Request for Players" className="btn-primary btn" dialogId="createRequest">
      <FormProvider {...method}>
        <form className="space-y-5">
          <FormSelect options={names_of_turf} label={'Turf'} name={'turf_id'} />
          <FormSelect options={dates} name={'game_date'} label={'Date'} />
          <FormInput label="Player Need" name="player_needed" />
          <FormInput label="Game" name="game" />
          <Button type="submit" text="Submit" onClick={method.handleSubmit(onSubmit)} disabled={method.formState.isSubmitting} />
        </form>
      </FormProvider>
    </Dialog>
  );
};

export default memo(RequestForm);

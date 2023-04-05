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
import useDialog from '@hooks/useDialog';
import useHelper from '@hooks/useHelper';

const RequestForm = () => {
  const { closeDialog, isOpen, openDialog } = useDialog();
  const { dateToString } = useHelper();

  const method = useForm<RequestType>({ resolver: yupResolver(RequestSchema) });
  const { addRequest } = useRequestContext();
  const { books } = useBookContext();
  const { requests } = useRequestContext();

  const id = method.watch('turf_id');
  console.log(id);

  const today = dateToString(new Date());

  const names_of_turf = useMemo(() => {
    const validBookings = books.filter((book) => book.date >= today && book.turfs);
    const turfList = validBookings.flatMap(({ turf_id, turfs }) => {
      if (Array.isArray(turfs)) {
        return turfs.map((turf) => ({ value: turf_id, label: turf.turf_name }));
      } else {
        return [{ value: turf_id, label: turfs.turf_name }];
      }
    });
    const uniqueTurfs = Array.from(new Set(turfList.map((turf) => turf.label)));
    return uniqueTurfs.map((turf) => turfList.find(({ label }) => label === turf));
  }, [books, today]);

  const dates = useMemo(() => {
    return books
      .filter((book) => book?.turf_id === id?.value && book.date >= today)
      .map((book) => ({ value: book?.date, label: book?.date }));
  }, [books, id?.value, today]);

  const onSubmit: SubmitHandler<RequestType> = async (formData) => {
    const checkIfExist = requests.find(
      (req) => req.game_date === formData.game_date && req.turf_id === formData.turf_id
    );

    if (checkIfExist) {
      toast.error(`Request aleady exsist for ${formData.game_date} `);
    } else {
      addRequest({
        ...formData,
        turf_id: method.getValues('turf_id').value,
        game_date: method.getValues('game_date').value
      });
      method.reset();
      closeDialog();
    }
  };

  return (
    <Dialog
      handleClose={closeDialog}
      handleOpen={openDialog}
      isOpen={isOpen}
      buttonText="Create Request"
      title="Create Request for Players"
      className="btn-primary btn"
      dialogId="createRequest"
    >
      <FormProvider {...method}>
        <form className="space-y-5">
          <FormSelect options={names_of_turf} label={'Turf'} name={'turf_id'} />
          <FormSelect options={dates} name={'game_date'} label={'Date'} />
          <FormInput label="Player Need" name="player_needed" />
          <FormInput label="Game" name="game" />
          <Button
            type="submit"
            text="Submit"
            onClick={method.handleSubmit(onSubmit)}
            disabled={method.formState.isSubmitting}
          />
        </form>
      </FormProvider>
    </Dialog>
  );
};

export default memo(RequestForm);

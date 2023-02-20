import { SetStateAction, useMemo } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { RequestFormProps, RequestData, RequestSchema } from '../types/types';
import { useRequestContext } from '../context/RequestContext';
import { useBookContext } from '../context/BookingContext';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-hot-toast';
import DialogBox from './Dialog';
import Button from './Button';
import useHelper from '@hooks/useHelper';

interface Props {
  isOpen: boolean;
  setIsOpen: (value: SetStateAction<boolean>) => void;
}

const RequestForm = ({ setIsOpen, isOpen }: Props) => {
  const { addRequest } = useRequestContext();
  const { books } = useBookContext();
  const { requests } = useRequestContext();

  const {
    reset,
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    watch
  } = useForm<RequestData>({
    resolver: zodResolver(RequestSchema)
  });

  const turf_id = watch('turf_id');

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
    const filteredBooks = books.filter((book) => book.turf_id === turf_id);
    return filteredBooks.map((book) => {
      return { value: book.date, label: book.date };
    });
  }, [books, turf_id]);

  const createRequestFormContent = (turfs: RequestFormProps['options'], dates: RequestFormProps['options']): RequestFormProps[] => {
    return [
      {
        label: 'Turf',
        name: 'turf_id',
        type: 'select',
        options: [{ value: '', label: 'Select a turf' }, ...turfs]
      },
      {
        label: 'Date',
        name: 'game_date',
        type: 'select',
        options: [{ value: '', label: 'Select a date' }, ...dates]
      },
      {
        label: 'Player Needed',
        type: 'text',
        name: 'player_needed',
        valueAsNumber: true
      },
      {
        label: 'Sports type',
        type: 'text',
        name: 'game'
      }
    ];
  };

  const RequestFormContent = useMemo(() => createRequestFormContent(names_of_turf, dates), [dates, names_of_turf]);

  const onSubmit: SubmitHandler<RequestData> = async (formData) => {
    const checkIfExist = requests.find((req) => req.game_date === formData.game_date && req.turf_id === formData.turf_id);

    if (checkIfExist) {
      toast.error(`Request aleady exsist for ${formData.game_date} `);
    } else {
      addRequest(formData);
    }
  };

  return (
    <DialogBox title={'Request For Players'} isOpen={isOpen} setIsOpen={setIsOpen}>
      <div className="mt-2">
        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
          {RequestFormContent.map((field, index) => (
            <div key={index} className="form-group">
              <label className="label" htmlFor={field.name}>
                <span className="label-text">{field.label}</span>
              </label>
              {field.type === 'select' ? (
                <select className="select-bordered select-primary select w-full" id={field.name} name={field.name} {...register(field.name)}>
                  {field.options?.map((option, index) => (
                    <option key={index} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              ) : (
                <>
                  <input
                    type={field.type}
                    className={`${errors[field.name] ? 'input-error' : ''} input-bordered input-primary input w-full`}
                    id={field.name}
                    name={field.name}
                    {...register(field.name, {
                      valueAsNumber: field.valueAsNumber
                    })}
                  />
                  {errors[field.name] && <p className="text-xs text-red-500">{errors[field.name].message}</p>}
                </>
              )}
            </div>
          ))}
          <Button type="submit" text="Submit" disabled={isSubmitting} />
        </form>
      </div>
    </DialogBox>
  );
};

export default RequestForm;

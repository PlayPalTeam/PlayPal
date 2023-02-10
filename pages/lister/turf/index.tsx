import { object, string, number, date, InferType, array } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import Layout from '@components/Layout';
import FormTitle from '@components/FormTitle';
import Button from '@components/Button';
import { ChangeEvent } from 'react';
import { useTurfContext } from '@context/TurfContext';

const AddTurfSchema = object().shape({
  turf_name: string().required().trim(),
  open_hour: string()
    .matches(/^([0-1][0-9]|2[0-3]):[0-5][0-9]$/, { excludeEmptyString: true })
    .required(),
  close_hour: string()
    .matches(/^([0-1][0-9]|2[0-3]):[0-5][0-9]$/, { excludeEmptyString: true })
    .required(),
  price: number().required().positive().integer(),
  capacity: number().required().positive().integer(),
  address: string().trim().required(),
  description: string().trim().required(),
  amenities: array().of(string()).required(),
  sports: array().of(string()).required()
});

type AddTurfType = InferType<typeof AddTurfSchema>;

const Amentitiesoptions = [
  { value: 'Free WiFi', label: 'Free WiFi' },
  { value: 'Pool', label: 'Pool' }
];

const SportsOption = [
  { value: 'boxcricket', label: 'BoxCricket' },
  { value: 'badminton', label: 'BadMinton' },
  { value: 'tennis', label: 'Tennis' }
];

const Turf = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    getValues,
    reset
  } = useForm<AddTurfType>({ resolver: yupResolver(AddTurfSchema) });

  const { addTurf, turfs } = useTurfContext();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const values = getValues().amenities;
    const currentValue = event.target.value;

    if (values.includes(currentValue)) {
      setValue(
        'amenities',
        values.filter((value) => value !== currentValue)
      );
    } else {
      setValue('amenities', [...values, currentValue]);
    }
  };

  const onSubmit = async (data: AddTurfType) => {
    addTurf(data);
    reset();
  };

  return (
    <Layout title="Add Turf">
      <main className="mx-auto mt-10 w-[90%] max-w-2xl">
        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
          <FormTitle title="Add Your Tuf Details" />
          <div>
            <label className="label" htmlFor="name">
              <span>Name</span>
            </label>
            <input
              className={`input w-full ${errors.turf_name ? 'input-error' : 'input-primary'}`}
              type="text"
              id="name"
              {...register('turf_name')}
            />
            {errors.turf_name && <span>{errors.turf_name.message}</span>}
          </div>
          <div className="flex items-center gap-x-5">
            <div className="w-full">
              <label className="label" htmlFor="time">
                <span>Open Time</span>
              </label>
              <input
                className={`input w-full ${errors.turf_name ? 'input-error' : 'input-primary'}`}
                type="time"
                id="open_hour"
                {...register('open_hour')}
              />
              {errors.open_hour && <span>{errors.open_hour.message}</span>}
            </div>
            <div className="w-full">
              <label className="label" htmlFor="time">
                <span>Close Time</span>
              </label>
              <input
                className={`input w-full ${errors.turf_name ? 'input-error' : 'input-primary'}`}
                type="time"
                id="close_hour"
                {...register('close_hour')}
              />
              {errors.close_hour && <span>{errors.close_hour.message}</span>}
            </div>
          </div>
          <div className="flex items-center justify-between gap-x-5">
            <div className="w-full">
              <label htmlFor="price">
                <span>Pricing(per hour)</span>
              </label>
              <input
                className={`input w-full ${errors.turf_name ? 'input-error' : 'input-primary'}`}
                type="string"
                id="price"
                {...register('price')}
              />
              {errors.price && <span>{errors.price.message}</span>}
            </div>
            <div className="w-full">
              <label htmlFor="capacity">
                <span>Capacity</span>
              </label>
              <input
                className={`input w-full ${errors.turf_name ? 'input-error' : 'input-primary'}`}
                type="string"
                id="capacity"
                {...register('capacity')}
              />
              {errors.capacity && <span>{errors.capacity.message}</span>}
            </div>
          </div>
          <div>
            <label htmlFor="address" className="label">
              <span className="label-text">Address</span>
            </label>
            <textarea
              id="address"
              className={`textarea-bordered textarea w-full resize-none ${errors.address ? 'textarea-error' : 'textarea-primary'}`}
              {...register('address')}
            />
            {errors.address && <span>{errors.address.message}</span>}
          </div>
          <div>
            <label htmlFor="description" className="label">
              <span className="label-text">description</span>
            </label>
            <textarea
              id="description"
              className={`textarea-bordered textarea w-full resize-y ${errors.description ? 'textarea-error' : 'textarea-primary'}`}
              {...register('description')}
            />
            {errors.description && <span>{errors.description.message}</span>}
          </div>
          <div>
            <label htmlFor="amenities" className="label">
              <span className="label-text">Amenities</span>
            </label>
            <div>
              {Amentitiesoptions.map((option) => (
                <label key={option.value} className="label cursor-pointer">
                  <input
                    type="checkbox"
                    value={option.value}
                    name="amenities"
                    onChange={handleChange}
                    className="checkbox"
                    {...register('amenities')}
                  />
                  <span className="label-text">{option.label}</span>
                </label>
              ))}
            </div>
          </div>
          <div>
            <label htmlFor="sports" className="label">
              <span className="label-text">Sports</span>
            </label>
            <div>
              {SportsOption.map((option) => (
                <label key={option.value} className="label cursor-pointer">
                  <input type="checkbox" value={option.value} name="sports" onChange={handleChange} className="checkbox" {...register('sports')} />
                  <span className="label-text">{option.label}</span>
                </label>
              ))}
            </div>
          </div>
          <Button type="submit" isSubmitting={isSubmitting} text="Add" />
        </form>
      </main>
    </Layout>
  );
};

export default Turf;

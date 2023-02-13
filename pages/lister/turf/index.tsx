import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';
import dynamic from 'next/dynamic';
import { AddTurfSchema, TurfFormValues } from 'src/types/types';
import { NextPage } from 'next';

const Amenitiesoptions = [
  { value: 'Free WiFi', label: 'Free WiFi' },
  { value: 'Pool', label: 'Pool' }
];

const SportsOption = [
  { value: 'boxcricket', label: 'BoxCricket' },
  { value: 'badminton', label: 'BadMinton' },
  { value: 'tennis', label: 'Tennis' }
];

const FormTitle = dynamic(() => import('@components/FormTitle'), { ssr: false });
const FormInput = dynamic(() => import('@components/FormElement').then((mod) => mod.FormInput), { ssr: false });
const FormSelect = dynamic(() => import('@components/FormElement').then((mod) => mod.FormSelect), { ssr: false });
const FormTextarea = dynamic(() => import('@components/FormElement').then((mod) => mod.FormTextarea), { ssr: false });
const Button = dynamic(() => import('@components/Button'), { ssr: false });

const Turf: NextPage = () => {
  const methods = useForm<TurfFormValues>({ resolver: yupResolver(AddTurfSchema) });
  const {
    handleSubmit,
    formState: { isSubmitting }
  } = methods;

  const onSubmit = async (data: TurfFormValues) => {
    console.log(data, null, 2);
  };

  return (
    <main className="mx-auto mt-10 w-[90%] max-w-2xl pb-10">
      <FormProvider {...methods}>
        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
          <FormTitle title="Add Your Turf" />
          <FormInput label="Name" name="turf_name" />
          <div className="flex items-center justify-between gap-x-5 max-md:flex-col max-md:gap-y-5">
            <FormInput label="Opening Time" name="open_hour" type="time" />
            <FormInput label="Closing Time Time" name="close_hour" type="time" />
          </div>
          <div className="flex items-center justify-between gap-x-5 max-md:flex-col max-md:gap-y-5">
            <FormInput label="Price" name="price" type={'string'} />
            <FormInput label="Capacity" name="capacity" type={'string'} />
          </div>
          <FormTextarea label="Address" name="address" />
          <FormTextarea label="Description" name="description" />
          <FormSelect isMulti={true} options={Amenitiesoptions} name={'amenities'} label={'Amenities'} />
          <FormSelect isMulti={true} options={SportsOption} name={'sports'} label={'Sports'} />
          <FormInput label="Upload Your Turf Image" name="turf_image" type={'file'} />
          <Button type="submit" isSubmitting={isSubmitting} text="Add" />
        </form>
      </FormProvider>
    </main>
  );
};

export default Turf;

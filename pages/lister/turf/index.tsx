import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';
import dynamic from 'next/dynamic';
import { AddTurfSchema, TurfFormValues } from 'src/types/types';
import { NextPage } from 'next';
import { useState } from 'react';

const FormTitle = dynamic(() => import('@components/FormTitle'), { ssr: false });
const FormInput = dynamic(() => import('@components/FormElement').then((mod) => mod.FormInput), { ssr: false });
const FormTextarea = dynamic(() => import('@components/FormElement').then((mod) => mod.FormTextarea), { ssr: false });
const Button = dynamic(() => import('@components/Button'), { ssr: false });

const Turf: NextPage = () => {
  const [step, setStep] = useState(1);
  const methods = useForm<TurfFormValues>({ resolver: yupResolver(AddTurfSchema) });
  const {
    handleSubmit,
    formState: { isSubmitting }
  } = methods;

  const handleNextStep = async () => {
    setStep(step + 1); // move to next step
  };

  const handlePreviousStep = () => {
    setStep(step - 1);
  };

  const onSubmit = async (data: TurfFormValues) => {
    console.log(data, null, 2);
  };

  return (
    <main className="mx-auto mt-10 w-[90%] max-w-2xl pb-10">
      <FormProvider {...methods}>
        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
          {step === 1 && (
            <>
              <FormTitle title="Basic Information" />
              <FormInput label="Name" name="turf_name" />
              <div className="flex items-center justify-between gap-x-5 max-md:flex-col max-md:gap-y-5">
                <FormInput label="Price" name="price" type={'string'} />
                <FormInput label="Capacity" name="capacity" type={'string'} />
              </div>
              <Button type="button" onClick={handleNextStep} text="Next" />
            </>
          )}
          {step === 2 && (
            <>
              <FormTitle title="Basic Information" />
              <FormTextarea label="Description" name="description" />
              <FormTextarea label="Address" name="address" />

              <Button type="button" onClick={handleNextStep} text="Next" />
              <Button type="button" onClick={handlePreviousStep} text="Previous" />
            </>
          )}
          {step === 3 && (
            <>
              <FormTitle title="Basic Information" />
              <div className="flex items-center justify-between gap-x-5 max-md:flex-col max-md:gap-y-5">
                <FormInput label="Opening Time" name="open_hour" type="time" />
                <FormInput label="Closing Time Time" name="close_hour" type="time" />
              </div>
              <FormInput label="Upload Your Turf Image" name="turf_image" type={'file'} />
              <Button type="submit" isSubmitting={isSubmitting} text="Add" />
              <Button type="button" onClick={handlePreviousStep} text="Previous" />
            </>
          )}
        </form>
      </FormProvider>
    </main>
  );
};

export default Turf;

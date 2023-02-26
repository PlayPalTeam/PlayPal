import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';
import { AddTurfSchema, TurfFormValues } from 'src/types/types';
import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useTurfContext } from '@context/TurfContext';
import dynamic from 'next/dynamic';

const FormTitle = dynamic(() => import('@components/FormElement').then((mod) => mod.FormTitle));
const FormInput = dynamic(() => import('@components/FormElement').then((mod) => mod.FormInput));
const FormMultiSelect = dynamic(() => import('@components/FormElement').then((mod) => mod.FormMultiSelect));
const FormTextarea = dynamic(() => import('@components/FormElement').then((mod) => mod.FormTextarea));
const Button = dynamic(() => import('@components/Button'));

const amenities = [
  { label: 'Swimming pool', value: 'swimming-pool' },
  { label: 'Fitness center', value: 'fitness-center' },
  { label: 'Free Wi-Fi', value: 'free-wifi' }
];

const sports = [
  { label: 'Football', value: 'football' },
  { label: 'Basketball', value: 'basketball' },
  { label: 'Tennis', value: 'tennis' }
];

const formSteps = [
  {
    Component: () => (
      <>
        <FormInput label="Name" name="turf_name" placeholder="Enter your turf name..." />
        <FormInput label="Price(hour)" name="price" placeholder='Enter your price' />
        <FormInput label="Capacity" name="capacity" placeholder='Enter your turf capacity' />
      </>
    )
  },
  {
    Component: () => (
      <>
        <FormTextarea label="Description" name="description" />
        <FormTextarea label="Address" name="address" />
      </>
    )
  },
  {
    Component: () => (
      <>
        <FormInput label="Opening Time" name="open_hour" type="time" />
        <FormInput label="Closing Time" name="close_hour" type="time" />
      </>
    )
  },
  {
    Component: () => (
      <>
        <FormMultiSelect label="Amenities" name="amenities" options={amenities} />
        <FormMultiSelect label="Sports" name="sports" options={sports} />
      </>
    )
  }
];

const Turf: NextPage = () => {
  const [step, setStep] = useState(() => {
    const stepFromCookie = Cookies.get('step');
    return stepFromCookie ? parseInt(stepFromCookie) : 1;
  });

  const methods = useForm<TurfFormValues>({ resolver: yupResolver(AddTurfSchema) });

  const {
    handleSubmit,
    formState: { isSubmitting },
    trigger,
    getValues,
    reset
  } = methods;

  const { addTurf } = useTurfContext();

  // Update cookies whenever the step value changes
  useEffect(() => {
    Cookies.set('step', step.toString());
  }, [step]);

  const handleNextStep = async () => {
    if (isSubmitting) {
      return; // do nothing when the form is submitting
    }

    const fieldsToValidate = {
      1: ['turf_name', 'price', 'capacity'],
      2: ['description', 'address'],
      3: ['open_hour', 'close_hour'],
      4: ['amenities', 'sports']
    };

    const valid = await trigger(fieldsToValidate[step]);

    if (valid) {
      setStep(step + 1); // move to next step
    }
  };

  const handlePreviousStep = () => {
    setStep(step - 1);
  };

  const onSubmit = async (data: TurfFormValues) => {
    const amenities = getValues('amenities').map((am) => am.value);
    const sports = getValues('sports').map((spo) => spo.value);
    addTurf({ ...data, amenities: amenities, sports: sports });
    setStep(1);
    reset()
  };

  return (
    <main className="mx-auto mt-10 w-[90%] max-w-2xl pb-10">
      <FormProvider {...methods}>
        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
          <FormTitle title="Basic Information" />
          {formSteps[step - 1].Component()}
          {step !== 1 && <Button type="button" onClick={handlePreviousStep} text="Previous" />}
          {step !== formSteps.length && <Button type="button" onClick={handleNextStep} text="Next" />}
          {step === formSteps.length && <Button type="submit" disabled={isSubmitting} text="Add" />}
        </form>
      </FormProvider>
    </main>
  );
};

export default Turf;

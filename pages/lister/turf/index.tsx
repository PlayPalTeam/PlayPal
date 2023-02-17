import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';
import { AddTurfSchema, TurfFormValues } from 'src/types/types';
import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import Button from '@components/Button';
import { FormInput, FormMultiSelect, FormTextarea } from '@components/FormElement';
import Cookies from 'js-cookie';
import { useTurfContext } from '@context/TurfContext';

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

const Turf: NextPage = () => {
  const [step, setStep] = useState(() => {
    // Get the step value from cookies or default to 1
    return parseInt(Cookies.get('step')) || 1;
  });
  const methods = useForm<TurfFormValues>({ resolver: yupResolver(AddTurfSchema) });
  const {
    handleSubmit,
    formState: { isSubmitting },
    trigger,
    getValues
  } = methods;

  const { addTurf } = useTurfContext();

  // Update cookies whenever the step value changes
  useEffect(() => {
    Cookies.set('step', step.toString());
  }, [step]);

  const handleNextStep = async () => {
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
    const amenities = getValues().amenities.map((am) => am.value);
    addTurf({
      amenities: amenities
    });
  };

  return (
    <main className="mx-auto mt-10 w-[90%] max-w-2xl pb-10">
      <FormProvider {...methods}>
        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
          {step === 1 && (
            <>
              <FormInput label="Name" name="turf_name" />
              <FormInput label="Price" name="price" type={'string'} />
              <FormInput label="Capacity" name="capacity" type={'string'} />
              <Button type="button" onClick={handleNextStep} text="Next" />
            </>
          )}
          {step === 2 && (
            <>
              <FormTextarea label="Description" name="description" />
              <FormTextarea label="Address" name="address" />
              <Button type="button" onClick={handleNextStep} text="Next" />
              <Button type="button" onClick={handlePreviousStep} text="Previous" />
            </>
          )}
          {step === 3 && (
            <>
              <FormInput label="Opening Time" name="open_hour" type="time" />
              <FormInput label="Closing Time" name="close_hour" type="time" />
              <Button type="button" onClick={handleNextStep} text="Next" />
              <Button type="button" onClick={handlePreviousStep} text="Previous" />
            </>
          )}
          {step === 4 && (
            <>
              <FormMultiSelect label="Amenities" name="amenities" options={amenities} />
              <FormMultiSelect label="Sports" name="sports" options={sports} />
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

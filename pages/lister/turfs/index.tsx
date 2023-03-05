import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { AddTurfSchema, TurfFormValues } from 'src/types/types';
import { NextPage } from 'next';
import { useTurfContext } from '@context/TurfContext';
import dynamic from 'next/dynamic';
import { useState } from 'react';

const Button = dynamic(() => import('@components/Button'));
const Step1 = dynamic(() => import('@components/AddTurfForm').then((mod) => mod.Step1));
const Step2 = dynamic(() => import('@components/AddTurfForm').then((mod) => mod.Step2));
const Step3 = dynamic(() => import('@components/AddTurfForm').then((mod) => mod.Step3));
const Step4 = dynamic(() => import('@components/AddTurfForm').then((mod) => mod.Step4));
const Step5 = dynamic(() => import('@components/AddTurfForm').then((mod) => mod.Step5));

const Turf: NextPage = () => {
  const [step, setStep] = useState(1);

  const methods = useForm<TurfFormValues>({ resolver: yupResolver(AddTurfSchema) });

  const {
    handleSubmit,
    formState: { isSubmitting },
    trigger,
    getValues,
    reset
  } = methods;

  const { addTurf } = useTurfContext();

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

  const onSubmit: SubmitHandler<TurfFormValues> = async (data) => {
    const amenities = getValues('amenities').map((am) => am.value);
    const sports = getValues('sports').map((spo) => spo.value);
    addTurf({ ...data, amenities: amenities, sports: sports });
    setStep(1);
    reset();
  };

  const formSteps = [Step1, Step2, Step3, Step4, Step5];
  const CurrentStep = formSteps[step - 1];

  return (
    <main className="mx-auto mt-10 w-[90%] max-w-2xl pb-10">
      <FormProvider {...methods}>
        <form className="space-y-5">
          {step !== 5 ? <CurrentStep /> : <Step5 folder="/turf" id={getValues('turf_name')?.toLowerCase()} />}
          {step !== 1 && <Button type="button" onClick={handlePreviousStep} text="Previous" />}
          {step !== formSteps.length && <Button type="button" onClick={handleNextStep} text="Next" />}
          {step === formSteps.length && <Button type="submit" disabled={isSubmitting} onClick={handleSubmit(onSubmit)} text="Add" />}
        </form>
      </FormProvider>
    </main>
  );
};

export default Turf;

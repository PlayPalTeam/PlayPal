import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { AddTurfSchema, TurfFormValues } from 'src/types/types';
import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import { supabase } from '@lib/supabase';
import { useUser } from '@supabase/auth-helpers-react';
import { toast } from 'react-hot-toast';
import Head from 'next/head';
import Progress from '@components/Progress';

const Button = dynamic(() => import('@components/Button'));
const Step1 = dynamic(() => import('@components/AddTurfForm').then((mod) => mod.Step1));
const Step2 = dynamic(() => import('@components/AddTurfForm').then((mod) => mod.Step2));
const Step3 = dynamic(() => import('@components/AddTurfForm').then((mod) => mod.Step3));
const Step4 = dynamic(() => import('@components/AddTurfForm').then((mod) => mod.Step4));
const Step5 = dynamic(() => import('@components/AddTurfForm').then((mod) => mod.Step5));

const Turf: NextPage = () => {
  const [step, setStep] = useState(1);
  const [isValidating, setIsValidating] = useState<boolean>(false);
  const [turfId, setTurfId] = useState<string>();
  const methods = useForm<TurfFormValues>({ resolver: yupResolver(AddTurfSchema) });
  const user = useUser();

  const {
    handleSubmit,
    formState: { isSubmitting },
    trigger,
    getValues
  } = methods;

  const handleNextStep = async () => {
    const fieldsToValidate = {
      1: ['turf_name', 'price', 'capacity'],
      2: ['description', 'address'],
      3: ['open_hour', 'close_hour'],
      4: ['amenities', 'sports']
    };

    try {
      // set loading state while validation is running
      setIsValidating(true);

      const isValid = await trigger(fieldsToValidate[step]);

      if (isValid) {
        setStep((prevStep) => prevStep + 1);
      }
    } catch (error) {
      // handle validation errors
      console.error(error);
      toast.error('An error occurred while validating the form. Please try again.');
    } finally {
      // unset loading state after validation completes
      setIsValidating(false);
    }
  };

  const handlePreviousStep = () => {
    setStep(step - 1);
  };

  const onSubmit: SubmitHandler<TurfFormValues> = async (info) => {
    const amenities = getValues('amenities').map((am) => am.value);
    const sports = getValues('sports').map((spo) => spo.value);

    const { status, error, data } = await supabase
      .from('turfs')
      .insert({ ...info, amenities: amenities, sports: sports, profile_id: user?.id })
      .select()
      .single();

    if (error) {
      toast.error(error.message);
    }

    if (status === 201) {
      toast.success(`Turf ${info.turf_name} is Added`);
      setTurfId(data.turf_id);
      setStep(step + 1);
    }
  };

  const formSteps = [Step1, Step2, Step3, Step4, Step5];
  const progressSteps = ['Step 1', 'Step 2', 'Step 3', 'Step 4', 'Step 5'];
  const CurrentStep = formSteps[step - 1];

  return (
    <>
      <Head>
        <title>Add Turf</title>
      </Head>
      <main className="mx-auto mt-10 w-[90%] max-w-2xl pb-10">
        <FormProvider {...methods}>
          <form className="space-y-5">
            <Progress labels={progressSteps} step={step} />
            {step !== 5 ? <CurrentStep /> : <Step5 id={turfId} />}
            {step !== 1 && step !== 5 && (
              <Button type="button" onClick={handlePreviousStep} text="Previous" />
            )}
            {step !== 4 && step !== 5 && (
              <Button
                type="button"
                onClick={handleNextStep}
                text={isValidating ? 'Validating...' : 'Next'}
                disabled={isValidating}
              />
            )}
            {step === 4 && (
              <Button
                type="submit"
                disabled={isSubmitting}
                onClick={handleSubmit(onSubmit)}
                text="Add"
              />
            )}
          </form>
        </FormProvider>
      </main>
    </>
  );
};

export default Turf;

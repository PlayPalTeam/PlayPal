import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { AddTurfSchema, TurfFormValues } from 'src/types/types';
import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import { supabase } from '@lib/supabase';
import { useUser } from '@supabase/auth-helpers-react';
import { toast } from 'react-hot-toast';

const Button = dynamic(() => import('@components/Button'));
const Step1 = dynamic(() => import('@components/AddTurfForm').then((mod) => mod.Step1));
const Step2 = dynamic(() => import('@components/AddTurfForm').then((mod) => mod.Step2));
const Step3 = dynamic(() => import('@components/AddTurfForm').then((mod) => mod.Step3));
const Step4 = dynamic(() => import('@components/AddTurfForm').then((mod) => mod.Step4));
const Step5 = dynamic(() => import('@components/AddTurfForm').then((mod) => mod.Step5));

const Turf: NextPage = () => {
  const [step, setStep] = useState(1);
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
    setStep(step + 1); // move to next step
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
  const CurrentStep = formSteps[step - 1];

  return (
    <main className="mx-auto mt-10 w-[90%] max-w-2xl pb-10">
      <FormProvider {...methods}>
        <form className="space-y-5">
          {step !== 5 ? <CurrentStep /> : <Step5 id={turfId} />}
          {step !== 1 && step !== 5 && <Button type="button" onClick={handlePreviousStep} text="Previous" />}
          {step !== 4 && step !== 5 && <Button type="button" onClick={handleNextStep} text="Next" />}
          {step === 4 && <Button type="submit" disabled={isSubmitting} onClick={handleSubmit(onSubmit)} text="Add" />}
        </form>
      </FormProvider>
    </main>
  );
};

export default Turf;

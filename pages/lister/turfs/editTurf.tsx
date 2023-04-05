import { useTurfContext } from '@context/TurfContext';
import { yupResolver } from '@hookform/resolvers/yup';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { AddTurfSchema, TurfFormValues } from 'src/types/types';

const Button = dynamic(() => import('@components/Button'));
const Step1 = dynamic(() => import('@components/AddTurfForm').then((mod) => mod.Step1));
const Step2 = dynamic(() => import('@components/AddTurfForm').then((mod) => mod.Step2));
const Step3 = dynamic(() => import('@components/AddTurfForm').then((mod) => mod.Step3));
const Step4 = dynamic(() => import('@components/AddTurfForm').then((mod) => mod.Step4));
const Step5 = dynamic(() => import('@components/AddTurfForm').then((mod) => mod.Step5));

const EditTurf = () => {
  const { turfs } = useTurfContext();
  const method = useForm<TurfFormValues>({ resolver: yupResolver(AddTurfSchema) });

  const router = useRouter();
  const data = router.query;
  const ids = data?.id;
  console.log(ids);

  const oneTurf = turfs.filter((turf) => turf.turf_id === ids);
  console.log(oneTurf);

  // useEffect(() => {
  //     method.reset(turfs);
  //   }, [method, turfs]);

  return (
    <>
      <div>
        <FormProvider {...method}>
          <form className="m-auto w-[800px] ">
            <Step1 />
            <Step2 />
            <Step3 />
            <Step4 />
          </form>
        </FormProvider>
      </div>
    </>
  );
};

export default EditTurf;

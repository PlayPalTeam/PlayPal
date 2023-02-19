import { FormProvider, useForm } from 'react-hook-form';

const FormWrapper = () => {
  const method = useForm();
  return <FormProvider {...method}>FormWrapper</FormProvider>;
};

export default FormWrapper;

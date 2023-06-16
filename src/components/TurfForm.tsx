import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { Step1, Step2, Step3 } from './AddTurfForm';
import Button from './Button';
import { FC, useEffect } from 'react';
import {EditTurfSchema, EditTurfType} from "@/types/types";

interface Props {
  initialValues: EditTurfType;
  onSubmit: (data: EditTurfType) => void;
}

const TurfForm: FC<Props> = ({ initialValues, onSubmit }) => {
  const method = useForm<EditTurfType>({
    resolver: yupResolver(EditTurfSchema)
  });

  useEffect(() => {
    method.reset(initialValues);
  }, [initialValues, method]);

  return (
    <FormProvider {...method}>
      <form className="space-y-6">
        <Step1 />
        <Step2 />
        <Step3 />
        <div className="flex justify-end">
          <Button
            text="Save Changes"
            type="submit"
            disabled={method.formState.isSubmitting}
            onClick={method.handleSubmit(onSubmit)}
          />
        </div>
      </form>
    </FormProvider>
  );
};

export default TurfForm;

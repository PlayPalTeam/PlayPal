import { SubmitHandler, useForm } from 'react-hook-form';
import { Button, Input, SelectInput } from '../../components';
import { Option, SignUpForm } from '../../types';

const options: Option[] = [
  {
    value: '#',
    label: 'Select your choice',
  },
  {
    value: 'user',
    label: 'Do you want to use the app?',
  },
  {
    value: 'lister',
    label: 'Do you want to list your place?',
  },
];


const SignUp = () => {
  const { register, handleSubmit } = useForm<SignUpForm>();

  const onSubmit: SubmitHandler<SignUpForm> = (data) =>  {
    console.log(JSON.stringify(data, null, 2))
  }

  return (
    <main className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input register={register} type={"text"} name="username" label="Username" />
        <Input register={register} type={"email"} name="email" label="Email" />
        <Input register={register} type={"password"} name="password" label="Password" />
        <SelectInput
          label="What you want to do?"
          options={options}
          register={register}
        />
        <button>Submit</button>
      </form>
    </main>
  );
};

export default SignUp;

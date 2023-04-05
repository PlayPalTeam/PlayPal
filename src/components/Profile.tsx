import { yupResolver } from '@hookform/resolvers/yup';
import { useUser } from '@supabase/auth-helpers-react';
import { memo, useEffect } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { ProfileSchema, ProfileType } from 'src/types/types';
import { useUserProfile } from '@context/UserProfileContext';
import Ava from './Ava';
import Button from './Button';
import { FormTitle, FormInput } from './FormElement';

const Profile = () => {
  const method = useForm<ProfileType>({ resolver: yupResolver(ProfileSchema) });
  const { userProfile, updateUserProfile } = useUserProfile();
  const user = useUser();

  useEffect(() => {
    method.reset(userProfile);
  }, [method, userProfile]);

  const onSubmit: SubmitHandler<ProfileType> = async (profileData) => {
    await updateUserProfile(profileData);
  };

  return (
    <main className="form-control mx-auto w-[90%] max-w-5xl max-md:py-20 md:py-40">
      <div className="flex max-md:flex-col max-md:gap-y-5">
        <section className="md:w-1/2">
          <Ava
            showUploadButton
            id={userProfile?.id}
            className="h-auto w-full rounded-2xl object-contain md:h-2/3 md:w-2/3"
            src={userProfile?.avatar_url}
          />
        </section>
        <section className="space-y-8 md:w-1/2">
          <FormProvider {...method}>
            <FormTitle title="User Info" />
            <div className="flex max-md:flex-col max-md:space-y-5 md:space-x-5">
              <FormInput name="email" label="Email" disabled defaultValue={user?.email} />
              <FormInput name="username" label="Username" placeholder="Enter your username..." />
            </div>
            <div className="flex max-md:flex-col max-md:space-y-5 md:space-x-5">
              <FormInput name="full_name" label="Full Name" placeholder="Enter your full name..." />
              <FormInput name="phone_number" label="Phone Number" placeholder="Enter your phone number" />
            </div>
            <Button text="Update" type="submit" disabled={method.formState.isSubmitting} onClick={method.handleSubmit(onSubmit)} />
          </FormProvider>
        </section>
      </div>
    </main>
  );
};

export default memo(Profile);

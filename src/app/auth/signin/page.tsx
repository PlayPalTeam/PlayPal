import AuthForm from '@/components/AuthForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'PlayPal | Sign In'
};

const page = () => {
  return <AuthForm />;
};

export default page;

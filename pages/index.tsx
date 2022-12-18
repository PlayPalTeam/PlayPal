import Link from 'next/link';

const Home = () => {
  return (
    <div className='flex justify-center items-center h-screen'>
      <div className='text-white bg-green-600 p-2 rounded-md'>
        <Link href={'/auth/signup'}>Sign Up</Link>
      </div>
    </div>
  );
};

export default Home;

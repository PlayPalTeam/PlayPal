import { useTurfContext } from '@/context/TurfContext';
import { useUserProfile } from '@/context/UserProfileContext';
import useHelper from '@/hooks/useHelper';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { memo, ReactNode } from 'react';
import { Turf } from '@/types/types';
import Ava from './Ava';
import Delete from './Delete';
import Link from 'next/link';
import useDialog from '@/hooks/useDialog';

interface TurfInfoProps {
  turf: Turf;
  children?: ReactNode;
}

const TurfInfo = ({ turf, children }: TurfInfoProps) => {
  const { closeDialog, isOpen, openDialog } = useDialog();
  const { push } = useRouter();
  const router = useRouter();
  const { deleteTurf } = useTurfContext();
  const { userProfile } = useUserProfile();
  const { convertTime } = useHelper();

  const DeleteTurf = async () => {
    await deleteTurf(turf?.turf_id);
    push('/lister');
  };

  const data = router.query;

  return (
    <>
      <Head>
        <title>{turf?.turf_name}</title>
      </Head>
      <main className="mx-auto mt-5 max-w-7xl px-4 sm:px-6 lg:px-8">
        <section>
          <Ava className="mx-auto mb-8 h-auto w-full rounded-2xl" src={turf?.turf_image} />
          <div className="flex items-center max-md:flex-wrap justify-between">
            <h2 className="mb-4 text-3xl font-bold">{turf?.turf_name}</h2>
            {userProfile?.role === 'lister' && (
              <div className="mb-4 justify-end w-full flex gap-6">
                <Link
                  className="btn-primary btn w-20"
                  href={{
                    pathname: '/lister/turfs/editTurf',
                    query: data
                  }}
                >
                  EDIT
                </Link>
                <Delete
                  handleClose={closeDialog}
                  handleOpen={openDialog}
                  isOpen={isOpen}
                  error
                  buttonText="Delete Turf"
                  title="Confirm Turf Deletion"
                  description="Are you sure you want to delete this turf? This action cannot be undone. All data associated with this turf will be permanently removed from the system."
                  onClick={DeleteTurf}
                />
              </div>
            )}
          </div>
          <p className="mb-4 text-lg">{turf?.description}</p>
          <div className="mb-4 flex flex-wrap">
            <p className="w-full md:w-1/3">
              <span className="mr-2 font-bold">Address:</span> {turf?.address}
            </p>
            <p className="w-full md:w-1/3">
              <span className="mr-2 font-bold">Open Hours:</span> {convertTime(turf?.open_hour)} -{' '}
              {convertTime(turf?.open_hour)}
            </p>
            <p className="w-full md:w-1/3">
              <span className="mr-2 font-bold">Price:</span> {turf?.price}{' '}
              <span>&#8377; (Per hour)</span>
            </p>
            <p className="w-full md:w-1/3">
              <span className="mr-2 font-bold">Capacity:</span> {turf?.capacity}
            </p>
          </div>
          <div className="mb-8 flex flex-wrap">
            <div className="w-full md:w-1/2">
              <p className="mb-2 font-bold">Amenities:</p>
              <ul className="list-inside list-disc">
                {turf?.amenities?.map((amenity) => (
                  <li key={amenity}>{amenity}</li>
                ))}
              </ul>
            </div>
            <div className="w-full md:w-1/2">
              <p className="mb-2 font-bold">Sports:</p>
              <ul className="list-inside list-disc">
                {turf?.sports?.map((sport) => (
                  <li key={sport}>{sport}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>
        {children}
      </main>
    </>
  );
};

export default memo(TurfInfo);

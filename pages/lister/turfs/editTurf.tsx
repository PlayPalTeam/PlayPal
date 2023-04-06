import React, { useEffect, useState } from 'react';
import { useTurfContext } from '@context/TurfContext';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { EditTurfType } from 'src/types/types';
import TurfForm from '@components/TurfForm';

const EditTurfPage = () => {
  const { turfs, updateTurf } = useTurfContext();
  const router = useRouter();
  const { id } = router.query;

  const [oneTurf, setOneTurf] = useState<EditTurfType>();

  useEffect(() => {
    const selectedTurf = turfs.find((turf) => turf.turf_id === id);
    if (selectedTurf) {
      const { turf_id, amenities, sports, turf_image, open_hour, close_hour, ...oneTurf } =
        selectedTurf;
      setOneTurf({
        ...oneTurf,
        open_hour: open_hour.slice(0, 5),
        close_hour: close_hour.slice(0, 5)
      });
    }
  }, [turfs, id]);

  const onSubmit = (data: EditTurfType) => {
    updateTurf(id as string, data);
  };

  return (
    <>
      <Head>
        <title>Edit | {oneTurf?.turf_name}</title>
      </Head>
      <div className="mx-auto max-w-4xl rounded-lg p-8 shadow-lg">
        <h1 className="mb-4 text-center text-3xl font-bold">Edit {oneTurf?.turf_name}</h1>
        <TurfForm initialValues={oneTurf} onSubmit={onSubmit} />
      </div>
    </>
  );
};

export default EditTurfPage;

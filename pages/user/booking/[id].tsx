import { useTurfContext } from '@context/TurfContext';
import moment from 'moment';
import { useRouter } from 'next/router';

const Booking = () => {
  const {
    query: { id }
  } = useRouter();

  const { allTurfs } = useTurfContext();

  const turf = allTurfs.find((turf) => turf.turf_id === id);

  if (!turf) {
    return (
      <main className="mx-auto my-10 max-w-4xl text-center">
        <p>Sorry, the requested turf could not be found.</p>
      </main>
    );
  }

  const startTime = moment(turf?.open_hour, 'HH:mm:ss').format('h:mm A');
  const endTime = moment(turf?.close_hour, 'HH:mm:ss').format('h:mm A');

  return (
    <main className="mx-auto my-10 max-w-4xl">
      <div className="space-y-5">
        <section>
          <p>Name:{turf?.turf_name.toUpperCase()}</p>
          <p>Address:{turf?.address}</p>
        </section>
        <section>
          <p>Timing</p>
          <p>
            {startTime} - {endTime}
          </p>
        </section>
        <section>
          <p>Amenities Available</p>
          {turf?.amenities.map((am, index) => (
            <p key={index}>
              {am
                .split('-')
                .map((word) => word.charAt(0).toUpperCase() + word.substring(1))
                .join(' ')}
            </p>
          ))}
        </section>
        <section className="space-y-5">
          <p>Sports Available</p>
          {turf?.sports.map((s) => (
            <div key={s} className="flex items-center gap-2">
              <input className="checkbox-primary checkbox" type="checkbox" value={s} id={s} />
              <label htmlFor={s}>{s.charAt(0).toUpperCase() + s.substring(1)}</label>
            </div>
          ))}
        </section>
      </div>
    </main>
  );
};

export default Booking;

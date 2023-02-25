import Link from 'next/link';
import Image from 'next/image';

interface TurfCardProps {
  turf_id: string;
  turf_name: string;
  address: string;
  book?: boolean;
  showBookings?: boolean;
}

const TurfCard = ({ turf_id, turf_name, address, book, showBookings }: TurfCardProps) => {
  return (
    <div className="card mx-auto mt-10 w-[90%] bg-base-100 lg:card-side">
      <figure>
        <Image src="/exampleturfimage.webp" width={200} height={200} alt="Album" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{turf_name}</h2>
        <p>{address}</p>
        <div className="card-actions justify-end">
          {book && (
            <Link href="/user/booking/[id]" as={`/user/booking/${turf_id}`} className="btn-primary btn">
              Book
            </Link>
          )}
          {showBookings && (
            <Link href="/lister/turf/[id]" as={`/lister/turf/${turf_id}`} className="btn-primary btn">
              Show Booking
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default TurfCard;

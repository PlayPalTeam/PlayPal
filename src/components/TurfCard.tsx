import Link from 'next/link';
import Image from 'next/image';
interface TurfCardProps {
  turf_id: string;
  turf_name: string;
  address: string;
  book?: boolean;
}

const TurfCard = ({ turf_id, turf_name, address, book }: TurfCardProps) => {
  return (
    <div className="card mt-10 w-[90%] mx-auto bg-base-100 shadow-xl lg:card-side">
      <figure>
        <Image
          src="/exampleturfimage.webp"
          width={1000}
          height={1000}
          alt="Album"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{turf_name}</h2>
        <p>{address}</p>
        <div className="card-actions justify-end">
          {book && (
            <Link
              href="/user/booking/[id]"
              as={`/user/booking/${turf_id}`}
              className="btn-primary btn"
            >
              Book
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default TurfCard;

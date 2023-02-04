import Link from 'next/link';
import { BsStarFill } from 'react-icons/bs';
import Image from 'next/image';
import { useState } from 'react';
interface TurfCardProps {
  turf_id: string;
  turf_name: string;
  location: string;
  book?: boolean;
}

const TurfCard = ({ turf_id, turf_name, location, book }: TurfCardProps) => {
  const [amned, setAmend] = useState({
    first: true,
    second: false,
    third: false
  });

  const timeChange = () => {
    if (amned.second === amned.third) {
      setAmend({
        ...amned,
        first: false,
        second: true
      });
    } else if (amned.first === amned.third) {
      setAmend({
        ...amned,
        second: false,
        third: true
      });
    } else if (amned.first === amned.second) {
      setAmend({
        ...amned,
        third: false,
        first: true
      });
    }
  };

  setTimeout(timeChange, 4000);

  return (
    <>
      <div className="m-2 overflow-hidden rounded-lg shadow sm:m-10">
        <div>
          <div className="flex items-center justify-between p-2 sm:p-4">
            <div>
              <div className="font-bold  sm:tracking-wider">
                {/* Greenfield Sports Turf 2.0 */}
                {turf_name}
              </div>
              <span className="text-xs sm:text-sm">
                {/* Kohinoor city road , Kurla West */}
                {location}
              </span>
            </div>

            <div className="flex ">
              <div className="f sm:items-center">
                <BsStarFill color="yellow" size={12} />
              </div>
              <span className="pl-2 text-sm font-bold ">3.4</span>
            </div>
          </div>

          <div className="relative  overflow-hidden p-2 sm:p-4  ">
            <Image
              src="/exampleturfimage.webp"
              className="h-[330px] rounded-md bg-contain"
              alt="fuck off"
              width={1000}
              height={1000}
            />
            <div className="absolute  top-8 left-8 ">
              <div className="rounded-md bg-orange-600 p-1 pl-2 pr-2 text-xs font-bold tracking-wider text-white">
                30% OFF
              </div>
            </div>
          </div>
          <div className="flex justify-between p-3 pt-3 sm:p-6 sm:pt-6 ">
            <div className=" pt-1">
              {amned.first && (
                <p className="ease-in ">Spilt Payments Availabel</p>
              )}
              {amned.second && <p>Coupon is valid</p>}
              {amned.third && <p>Box Cricket Football</p>}
            </div>
            <div>
              {book && (
                <Link
                  href="/user/booking/[id]"
                  as={`/user/booking/${turf_id}`}
                  type="button"
                  className="rounded-md bg-green-400 px-4 py-2 font-semibold hover:bg-green-500"
                >
                  Book
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TurfCard;

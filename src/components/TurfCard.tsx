import Link from "next/link";
import { BsStarFill } from "react-icons/bs";
import Image from "next/image";
import { useState } from "react";
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
		third: false,
	});

	const timeChange = () => {
		if (amned.second === amned.third) {
			setAmend({
				...amned,
				first: false,
				second: true,
			});
		} else if (amned.first === amned.third) {
			setAmend({
				...amned,
				second: false,
				third: true,
			});
		} else if (amned.first === amned.second) {
			setAmend({
				...amned,
				third: false,
				first: true,
			});
		}
	};

	setTimeout(timeChange, 4000);

	return (
		<>
			<div className="m-14">
				<div>
					<div className="flex items-center justify-between p-4 ">
						<div>
							<div className="font-bold  tracking-wider">
								{/* Greenfield Sports Turf 2.0 */}
								{turf_name}
							</div>
							<span className="text-sm">
								{/* Kohinoor city road , Kurla West */}
								{location}
							</span>
						</div>

						<div className="flex ">
							<div className="items-center">
								<BsStarFill color="yellow" size={12} />
							</div>
							<span className="pl-2 text-sm font-bold ">3.4</span>
						</div>
					</div>

					<div className="relative rounded-md overflow-hidden bg-green-600">
						<Image
							src="/exampleturfimage.webp"
							className="bg-cover"
							alt="fuck off"
							width={800}
							height={300}
						/>
						{/* <Image 
				src="/exampleturfimage.webp"
				height={300}
				width={800}
				alt="Sagar J K Rowling "
				/> */}
						<div className="absolute  top-4 left-6 ">
							<div className="rounded-md bg-orange-600 p-1 pl-2 pr-2 text-xs font-bold tracking-wider text-white">
								30% OFF
							</div>
						</div>
					</div>
					<div className="flex justify-between pt-4">
						<div>
							{amned.first && (
								<p className="ease-in ">Spilt Payments Availabel</p>
							)}
							{amned.second && <p>Coupon is valid till 1 Mar 1990</p>}
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

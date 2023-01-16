import React, { useEffect, useState } from "react";
import Image from "next/image";

const Carousel = () => {
	const data = [
		{
			img: "/exampleturfimage.webp",
		},
		{
			img: "/offer.png",
		},
		{
			img: "/meetpals",
		},
		{
			img: "/exampleturfimage.webp",
		},
	];
	const [changeImg, setChangeImg] = useState(0);

	const changeFun = () => {
		if (changeImg === data.length-1) {
			console.log("reached")
			return setChangeImg(0);
		}
		return setChangeImg(changeImg+1);
	};

	useEffect(() => {
		setInterval(changeFun,2000);
	} ,[]);
	return (
		<>
			<div className="bg-red-500">
				<div className="flex flex-nowrap overflow-hidden ">
					{data.map((item, index) => {
 						return (
							<h1 key={index} className={`w-full min-w-full flex items-center justify-center delay-1000 translate-x-[${changeImg*100}%]`}>
								<Image
									src={item.img}
									width={400}
									height={400}
									alt="Fuck Off"
								/>
							</h1>
						);
					})}
				</div>
			</div>
		</>
	);
};

export default Carousel;

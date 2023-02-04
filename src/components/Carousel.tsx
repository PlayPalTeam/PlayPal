import { useEffect, useState } from 'react';
import Image from 'next/image';

const Carousel = () => {
  // const data = [
  // 	{
  // 		img: "/exampleturfimage.webp",
  // 	},
  // 	{
  // 		img: "/offer.png",
  // 	},
  // 	{
  // 		img: "/meetpals",
  // 	},
  // 	{
  // 		img: "/exampleturfimage.webp",
  // 	},
  // ];

  const data = [
    '/exampleturfimage.webp',
    '/offer.png',
    '/exampleturfimage.webp'
  ];

  const [changeImg, setChangeImg] = useState(0);

  useEffect(() => {
    const changeFun = () => {
      if (changeImg === data.length - 1) {
        console.log('reached');
        return setChangeImg(0);
      }
      return setChangeImg(changeImg + 1);
    };
    setInterval(changeFun, 2000);
  }, [changeImg, data.length]);
  const transx = changeImg * 100;

  return (
    <>
      <div className="bg-red-500">
        <div className="flex flex-nowrap overflow-hidden ">
          {/* {data.map((item, index) => {
						return (
							<h1
								key={index}
								className={`flex w-full min-w-full items-center justify-center delay-1000 translate-x-[${ transx }%]`}
							>
								<Image src={item.img} width={400} height={400} alt="Fuck Off" />
							</h1>
						);
					})} */}
          {data.map((item, index) => {
            setInterval(() => {
              index = index + 1;
              if (index > 3) {
                index === 0;
              }
              console.log(index);
            }, 3000);

            return (
              <h1
                key={index}
                className={`flex w-full min-w-full items-center justify-center delay-1000 translate-x-[${transx}%]`}
              >
                <Image src={item[0]} width={400} height={400} alt="Fuck Off" />
              </h1>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Carousel;

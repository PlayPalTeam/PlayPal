import Image from 'next/image';
import { ChangeEvent, useState } from 'react';

const Avatar = ({ width, height }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [src, setSrc] = useState(null);

  const upLoadImage = (event: ChangeEvent<HTMLInputElement>) => {};

  if (!src) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Image
        src={src}
        alt=""
        width={width}
        height={height}
        onLoad={() => setIsLoading(false)}
        onError={() => setIsLoading(false)}
        style={{ display: isLoading ? 'none' : 'block' }}
      />
      {isLoading && <div>Loading...</div>}
    </div>
  );
};

export default Avatar;

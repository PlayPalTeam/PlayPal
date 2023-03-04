import { supabase } from '@lib/supabase';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

interface AvatarProps {
  src: string;
  className?: string;
  upload?: boolean;
}

export default function Avatar({ src, className, upload }: AvatarProps) {
  const [url, setUrl] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const downloadImage = async (path: string) => {
    setIsLoading(true);
    const { data, error } = await supabase.storage.from('avatars').download(path);
    setIsLoading(false);
    if (error) {
      toast.error(error.message);
    } else {
      const url = URL.createObjectURL(data);
      setUrl(url);
    }
  };

  useEffect(() => {
    if (src) {
      downloadImage(src);
    }
  }, [src]);

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }
    setIsLoading(true);
    const { error } = await supabase.storage.from('avatars').upload(`avatars/${file.name}`, file);
    setIsLoading(false);
    if (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      {url ? (
        <>
          <Image src={url} alt="" className={className} width={100} height={100} />
          {upload && (
            <div className="relative mt-5 text-center">
              <label className="btn-primary btn" htmlFor="single">
                {isLoading ? 'Uploading ...' : 'Upload'}
              </label>
              <input className="absolute hidden" type="file" id="single" accept="image/*" onChange={handleUpload} disabled={isLoading} />
            </div>
          )}
        </>
      ) : (
        <div className={`${className} animate-pulse bg-gray-500`} />
      )}
    </>
  );
}

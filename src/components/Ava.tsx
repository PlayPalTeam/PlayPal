import { ChangeEvent, useEffect, useState } from 'react';
import Image from 'next/image';
import { supabase } from 'src/lib/supabase';
import { useUserProfile } from 'src/context/UserProfileContext';
import { toast } from 'react-hot-toast';
import { useTurfContext } from '@context/TurfContext';

type Props = {
  src?: string;
  id?: string;
  showUploadButton?: boolean;
  className?: string;
  size?: string;
  turf_image?: boolean;
};

export default function Avatar({ showUploadButton, className, size, turf_image, src, id }: Props) {
  const [avatarUrl, setAvatarUrl] = useState<string>();
  const [uploading, setUploading] = useState(false);
  const { updateUserProfile } = useUserProfile();
  const { updateTurf } = useTurfContext();

  const downloadImage = async (path: string) => {
    const { data, error } = await supabase.storage.from('avatars').download(path);
    if (error) {
      toast.error(error.message);
    }
    const url = URL.createObjectURL(data);
    setAvatarUrl(url);
  };

  useEffect(() => {
    if (src) {
      downloadImage(src);
    }
  }, [src]);

  const uploadAvatar = async (event: ChangeEvent<HTMLInputElement>) => {
    setUploading(true);
    const file = event.target.files[0];
    const fileExt = file.name.split('.').pop();
    const fileName = `${id}.${fileExt}`;
    const filePath = `${fileName}`;

    const path = turf_image ? `turf/${filePath}` : `profile/${filePath}`;

    const { error: uploadError } = await supabase.storage.from('avatars').upload(path, file, {
      upsert: true
    });

    if (uploadError) {
      toast.error(uploadError.message);
    }

    if (turf_image) {
      console.log(path);
      updateTurf(id, { turf_image: path });
    } else {
      updateUserProfile({ avatar_url: path });
    }
    setUploading(false);
  };

  return (
    <>
      {avatarUrl ? (
        <div className="flex flex-col items-center justify-center">
          <Image src={avatarUrl} alt="Avatar" className={className} width={400} height={400} />
        </div>
      ) : (
        <div className={`animate-pulse bg-gray-500 ${className}`} />
      )}
      {showUploadButton && (
        <div className="relative mt-5 text-center">
          <label className="btn-primary btn" htmlFor="single">
            {uploading ? 'Uploading ...' : 'Upload'}
          </label>
          <input className="absolute hidden" type="file" id="single" accept="image/*" onChange={uploadAvatar} disabled={uploading} />
        </div>
      )}
    </>
  );
}

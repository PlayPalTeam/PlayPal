// import { useTurfContext } from '@/context/TurfContext';
// import { useUserProfile } from '@/context/UserProfileContext';
// import { supabase } from '@/lib/supabase';
// import Image from 'next/image';
// import { ChangeEvent, memo, useMemo, useState } from 'react';
// import { toast } from 'react-hot-toast';

type Props = {
  src?: string;
  id?: string;
  showUploadButton?: boolean;
  className?: string;
  turf_image?: boolean;
};

export default function Ava(data: Props) {
  return <div></div>;
}

// function Avatar({ showUploadButton, className, turf_image, src, id }: Props) {
//   const [avatarUrl, setAvatarUrl] = useState<string>();
//   const [uploading, setUploading] = useState(false);
//   const { updateUserProfile } = useUserProfile();
//   const { updateTurf } = useTurfContext();

//   const downloadImage = async (path: string) => {
//     const { data, error } = await supabase.storage.from('avatars').download(path);
//     if (error) {
//       toast.error(error.message);
//     }
//     const url = URL.createObjectURL(data);
//     setAvatarUrl(url);
//   };

//   useMemo(() => {
//     if (src) {
//       downloadImage(src);
//     }
//   }, [src]);

//   const uploadAvatar = async (event: ChangeEvent<HTMLInputElement>) => {
//     setUploading(true);
//     const file = event.target.files[0];
//     const fileExt = file.name.split('.').pop();
//     const fileName = `${id}.${fileExt}`;
//     const filePath = `${fileName}`;

//     const path = turf_image ? `turf/${filePath}` : `profile/${filePath}`;

//     const { error: uploadError } = await supabase.storage.from('avatars').upload(path, file, {
//       cacheControl: '3600',
//       upsert: true
//     });

//     if (uploadError) {
//       toast.error(uploadError.message);
//     }

//     if (turf_image) {
//       console.log(path);
//       updateTurf(id, { turf_image: path });
//     } else {
//       updateUserProfile({ avatar_url: path });
//     }
//     setUploading(false);
//   };

//   return (
//     <>
//       {avatarUrl ? (
//         <div className="flex flex-col items-center justify-center">
//           <Image src={avatarUrl} alt="Avatar" className={className} width={100} height={100} />
//         </div>
//       ) : (
//         <div className={`animate-pulse bg-gray-500 ${className}`} />
//       )}
//       {showUploadButton && (
//         <div className="relative mt-5 text-center">
//           <label className="btn-primary btn" htmlFor="single">
//             {uploading ? 'Uploading ...' : 'Upload'}
//           </label>
//           <input
//             className="absolute hidden"
//             type="file"
//             id="single"
//             accept="image/*"
//             onChange={uploadAvatar}
//             disabled={uploading}
//           />
//         </div>
//       )}
//     </>
//   );
// }

// export default memo(Avatar);

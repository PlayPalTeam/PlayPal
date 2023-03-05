import { supabase } from '@lib/supabase';
import Image from 'next/image';
import { ChangeEvent, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import DialogBox from './Dialog';

interface AvatarProps {
  src?: string;
  className?: string;
  upload?: boolean;
  id?: string;
  folder?: string;
}

export default function Avatar({ src, className, upload, id, folder }: AvatarProps) {
  const [url, setUrl] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState<File | undefined>(undefined);
  const [filename, setFilename] = useState<string | undefined>(undefined);
  const [filepath, setFilepath] = useState<string | undefined>(undefined);
  const [isOpen, setIsOpen] = useState(false);

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

  const uploadAvatar = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    if (!selectedFile) return;

    const { error: uploadError } = await supabase.storage.from('avatars').upload(filepath, selectedFile, {
      upsert: true
    });

    if (uploadError) {
      toast.error(uploadError.message);
    } else {
      toast.success('Avatar uploaded successfully!');
      setSelectedFile(undefined);
      setFilename(undefined);
      setFilepath(undefined);
    }
  };

  const handleFileInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const fileExt = file.name.split('.').pop();
      const fileName = `${id}.${fileExt}`;
      const filePath = `${folder}/${fileName}`;
      setSelectedFile(file);
      setFilename(fileName);
      setFilepath(filePath);

      const reader = new FileReader();
      reader.onload = () => {
        setUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      {url ? (
        <>
          <Image src={url} alt="" className={className} width={100} height={100} />
        </>
      ) : (
        <div className={`${className} animate-pulse bg-gray-500`} />
      )}
      {upload && (
        <div className="relative mt-5 text-center">
          <label className="btn-primary btn" htmlFor="single">
            Upload
          </label>
          <input className="absolute hidden" type="file" id="single" accept="image/*" onChange={handleFileInputChange} disabled={isLoading} />

          {selectedFile && (
            <DialogBox title="Confirm" isOpen={isOpen} setIsOpen={setIsOpen}>
              <p className="mt-2">
                {filename}
                {filepath}
              </p>
              <button className="btn-primary btn mt-2" onClick={uploadAvatar} disabled={isLoading}>
                {isLoading ? 'Uploading ...' : 'Confirm Upload'}
              </button>
            </DialogBox>
          )}
        </div>
      )}
    </>
  );
}

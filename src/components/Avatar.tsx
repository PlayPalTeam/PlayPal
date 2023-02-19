import {ChangeEvent, useEffect, useReducer} from 'react';
import Image from 'next/image';
import {Database} from 'src/types/database.types';
import {supabase} from 'src/lib/supabase';
import {useUserProfile} from 'src/context/UserProfileContext';
import {toast} from 'react-hot-toast';
import {useTurfContext} from '@context/TurfContext';

type Profiles = Database['public']['Tables']['profiles']['Row'];

type State = {
    avatarUrl: Profiles['avatar_url'] | null;
    uploading: boolean;
};

type Action = { type: 'SET_AVATAR_URL'; avatarUrl: Profiles['avatar_url'] } | {
    type: 'SET_UPLOADING';
    uploading: boolean
};

const initialState: State = {
    avatarUrl: null,
    uploading: false
};

function avatarReducer(state: State, action: Action): State {
    switch (action.type) {
        case 'SET_AVATAR_URL':
            return {...state, avatarUrl: action.avatarUrl};
        case 'SET_UPLOADING':
            return {...state, uploading: action.uploading};
        default:
            return state;
    }
}

type Props = {
    showUploadButton?: boolean;
    className?: string;
    size?: string;
    turf_image?: boolean;
};

export default function Avatar({showUploadButton, className, size, turf_image}: Props) {
    const [state, dispatch] = useReducer(avatarReducer, initialState);
    const {userProfile, updateUserProfile} = useUserProfile();
    const {updateTurf, turfs} = useTurfContext();

    const downloadImage = async (path: string) => {
        try {
            const {data, error} = await supabase.storage.from('avatars').download(path);
            if (error) {
                toast.error(error.message)
            }
            const url = URL.createObjectURL(data);
            dispatch({type: 'SET_AVATAR_URL', avatarUrl: url});
        } catch (error) {
            console.log('Error downloading image: ', error);
        }
    };

    useEffect(() => {
        if (userProfile?.avatar_url) {
            downloadImage(userProfile?.avatar_url);
        }
    }, [userProfile?.avatar_url]);

    const uploadAvatar = async (event: ChangeEvent<HTMLInputElement>) => {
        try {
            dispatch({type: 'SET_UPLOADING', uploading: true});

            if (!event.target.files || event.target.files.length === 0) {
                toast.error('You must select an image to upload.')
            }

            const file = event.target.files[0];
            const fileExt = file.name.split('.').pop();
            const fileName = `${userProfile?.id}.${fileExt}`;
            const filePath = `${fileName}`;

            const path = turf_image ? `turf/${filePath}` : `profile/${filePath}`;

            const {error: uploadError} = await supabase.storage.from('avatars').upload(path, file, {
                cacheControl: '3600',
                upsert: true
            });

            if (uploadError) {
                toast.error(uploadError.message);
            }

            if (turf_image) {
                updateTurf(userProfile?.id, {turf_image: path});
                downloadImage(turfs.find((x) => x.profile_id === userProfile?.id).turf_image);
            } else {
                updateUserProfile({avatar_url: path});
                downloadImage(path);
            }
        } catch (error) {
            alert('Error uploading avatar!');
            console.log(error);
        } finally {
            dispatch({type: 'SET_UPLOADING', uploading: false});
        }
    };

    return (
        <div>
            {state.avatarUrl ? (
                <Image src={state.avatarUrl} alt="Avatar" className={className} width={400} height={400}/>
            ) : (
                <div
                    className="animate-pulse overflow-hidden rounded-full bg-gray-500"
                    style={{
                        width: `${size}px`,
                        height: `${size}px`
                    }}
                />
            )}
            {showUploadButton && (
                <div className="relative mt-5 -translate-x-4 text-center">
                    <label className="btn-primary btn" htmlFor="single">
                        {state.uploading ? 'Uploading ...' : 'Upload'}
                    </label>
                    <input className="absolute hidden" type="file" id="single" accept="image/*" onChange={uploadAvatar}
                           disabled={state.uploading}/>
                </div>
            )}
        </div>
    );
}

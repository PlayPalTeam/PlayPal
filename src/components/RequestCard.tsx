import { useRequestContext } from '@context/RequestContext';
import { useUserProfile } from '@context/UserProfileContext';
import { memo, useCallback } from 'react';
import { Request } from 'src/types/types';
import Delete from './Delete';
import useDialog from '@hooks/useDialog';
import Image from 'next/image';

interface RequestProfile {
    full_name: string;
    username: string;
}

interface RequestTurf {
    turf_name: string;
    address: string;
}

export interface RequestResponse extends Request {
    profiles: RequestProfile | RequestProfile[];
    turfs: RequestTurf | RequestTurf[];
}

const RequestCard = ({
    id,
    game,
    game_date,
    player_needed,
    profiles,
    turfs,
    profile_id
}: RequestResponse) => {
    const { closeDialog, isOpen, openDialog } = useDialog();

    const { deleteRequest } = useRequestContext();
    const { userProfile, updateUserProfile } = useUserProfile();
    const { updatePlayerNeeded, requests } = useRequestContext();
    const request = requests.find((req) => req.id === id);

    const handleAccept = useCallback(async () => {
        await updatePlayerNeeded({
            id: id,
            player_needed: player_needed - 1,
            people: [...(request.people || []), userProfile?.full_name || userProfile?.username]
        });

        await updateUserProfile({ request: [...(userProfile?.request || []), id.toString()] });
    }, [
        id,
        player_needed,
        request.people,
        updatePlayerNeeded,
        updateUserProfile,
        userProfile?.full_name,
        userProfile?.request,
        userProfile?.username
    ]);

    const handleDeleteCreatedRequest = async () => {
        await deleteRequest(id);
    };

    const handleDeleteAcceptedRequest = async () => {
        await updateUserProfile({
            request: userProfile.request?.filter((request) => request !== id.toString())
        });
        await updatePlayerNeeded({
            id: id,
            player_needed: player_needed + 1,
            people: request.people?.filter((e) => e !== userProfile?.id)
        });
    };

    const profileList = useCallback(
        () => (Array.isArray(profiles) ? profiles : [profiles]),
        [profiles]
    );

    const turfList = useCallback(() => (Array.isArray(turfs) ? turfs : [turfs]), [turfs]);

    return (
        <div className="bg-gray card mb-5 border-2 overflow-hidden border-gray-800 text-white shadow-2xl lg:card-side">
            {turfList().map((turf, index) => (
                <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <Image
                        className="h-64 w-full object-cover"
                        src={`https://source.unsplash.com/random/500×300/?${request.game}`}
                        alt="soccer"
                        width={500}
                        height={300}
                    />
                    <div className="p-3">
                        <div>
                            <h2 className="mb-2 text-lg font-semibold sm:mb-3 sm:text-2xl sm:tracking-wider">
                                {turf?.turf_name}
                            </h2>
                            <p className="text-md sm:w-[640px] sm:font-normal sm:tracking-normal">
                                {turf?.address}
                            </p>
                        </div>
                        <div className="mt-2 text-sm sm:mt-3 sm:flex sm:justify-between md:text-base">
                            <p>Date: {game_date}</p>
                            <p className="mt-1 sm:ml-6 sm:w-[230px]">Players Req: {player_needed}</p>
                        </div>
                        {profileList().map((profile, index) => (
                            <div key={index} className='mt-2 text-sm sm:mt-3 sm:flex sm:justify-between md:text-base'>
                                <p>Created By: {profile.username}</p>
                                <p className="mt-1 sm:ml-6 sm:w-[230px]">Sports: {game}</p>
                            </div>
                        ))}
                        <div className="mt-3 sm:mt-4">
                            {userProfile?.id === profile_id ? (
                                <span className="tooltip tooltip-info"
                                    data-tip="Delete the request you have created">
                                    <Delete
                                        handleClose={closeDialog}
                                        handleOpen={openDialog}
                                        isOpen={isOpen}
                                        error
                                        buttonText="Delete Request"
                                        title="Confirm Request Deletion"
                                        description="Are you sure you want to delete this request? This action cannot be undone. Please confirm below if you wish to proceed with the deletion."
                                        onClick={handleDeleteCreatedRequest}
                                    />
                                </span>
                            ) : userProfile?.request?.includes(id.toString()) ? (
                                <Delete
                                    handleClose={closeDialog}
                                    handleOpen={openDialog}
                                    isOpen={isOpen}
                                    buttonText="Cancel Request"
                                    title="Confirm Request Deletion"
                                    description="Are you sure you want to delete this request? This action cannot be undone. Please confirm below if you wish to proceed with the deletion."
                                    onClick={handleDeleteAcceptedRequest}
                                />
                            ) : (
                                <button
                                    type="button"
                                    onClick={handleAccept}
                                    className="btn-primary btn max-md:w-full"
                                >
                                    Accept Request
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            ))}
        </div>

    );
};

export default memo(RequestCard);

import { useRequestContext } from '@context/RequestContext';
import { useUserProfile } from '@context/UserProfileContext';
import { memo, useCallback } from 'react';
import { Request } from 'src/types/types';
import Delete from './Delete';
import useDialog from '@hooks/useDialog';

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

  const handleAccept = useCallback(() => {
    updatePlayerNeeded({
      id: id,
      player_needed: player_needed - 1,
      people: [userProfile?.full_name]
    });
    updateUserProfile({ request: [...userProfile?.request, id.toString()] });
  }, [id, player_needed, updatePlayerNeeded, updateUserProfile, userProfile]);

  const handleDeleteCreatedRequest = async () => {
    await deleteRequest(id);
  };

  const request = requests.find((req) => req.id === id);

  const handleDeleteAcceptedRequest = () => {
    updateUserProfile({
      request: userProfile.request?.filter((request) => request !== id.toString())
    });
    updatePlayerNeeded({
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
    <div className="card mb-5 bg-neutral text-neutral-content">
      <div className="card-body">
        <h2 className="card-title">{game}</h2>
        <p>Date: {game_date}</p>
        <p>Player needed: {player_needed}</p>
        <ul>
          {profileList().map((profile) => (
            <li key={profile.full_name}>
              <span>Created By: </span>
              {profile.full_name || profile.username}
            </li>
          ))}
        </ul>
        <ul>
          {turfList().map((turf) => (
            <li key={turf.turf_name}>
              {turf.turf_name}, {turf.address}
            </li>
          ))}
        </ul>
        <div className="card-actions md:justify-end ">
          {userProfile?.id === profile_id ? (
            <span className="tooltip tooltip-info" data-tip="Delete the request you have created">
              <Delete
                handleClose={closeDialog}
                handleOpen={openDialog}
                isOpen={isOpen}
                error
                buttonText="Cancel Request"
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
            <button type="button" onClick={handleAccept} className="btn-primary btn max-md:w-full">
              Accept Request
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default memo(RequestCard);

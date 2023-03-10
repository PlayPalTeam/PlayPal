import { useRequestContext } from '@context/RequestContext';
import { useUserProfile } from '@context/UserProfileContext';
import { memo, useCallback, useState } from 'react';
import { Database } from 'src/types/database.types';

type RequestDataProps = Database['public']['Tables']['requests']['Row'];

interface RequestProfile {
  full_name: string;
}

interface RequestTurf {
  turf_name: string;
  address: string;
}

export interface RequestResponse extends RequestDataProps {
  profiles: RequestProfile | RequestProfile[];
  turfs: RequestTurf | RequestTurf[];
}

const RequestCard = ({ id, game, game_date, player_needed, profiles, turfs, profile_id }: RequestResponse) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { deleteRequest } = useRequestContext();
  const { userProfile, updateUserProfile } = useUserProfile();
  const { updatePlayerNeeded, requests } = useRequestContext();

  const handleAccept = useCallback(() => {
    updatePlayerNeeded({
      id: id,
      player_needed: player_needed - 1,
      people: [userProfile?.full_name]
    });
    updateUserProfile({ request: [id.toString()] });
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
      people: request.people.filter((e) => e !== userProfile?.id)
    });
  };

  const profileList = useCallback(() => (Array.isArray(profiles) ? profiles : [profiles]), [profiles]);

  const turfList = useCallback(() => (Array.isArray(turfs) ? turfs : [turfs]), [turfs]);

  return (
    <div className="card bg-neutral text-neutral-content">
      <div className="card-body">
        <h2 className="card-title">{game}</h2>
        <p>Date: {game_date}</p>
        <p>Player needed: {player_needed}</p>
        <ul>
          {profileList().map((profile) => (
            <li key={profile.full_name}>
              <span>Created By: </span>
              {profile.full_name}
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
              <button type="button" onClick={handleDeleteCreatedRequest} className="btn-outline btn-error btn max-md:w-full">
                Delete Your Request
              </button>
            </span>
          ) : userProfile?.request?.includes(id.toString()) ? (
            <button type="button" onClick={handleDeleteAcceptedRequest} className="btn-outline btn-error btn max-md:w-full">
              Delete Request
            </button>
          ) : (
            <button type="button" onClick={handleAccept} className="btn-primary btn max-md:w-full">
              Accept Request
            </button>
          )}
          <button className="btn" onClick={() => setIsOpen(!isOpen)}>
            Show Players
          </button>
        </div>
      </div>
    </div>
  );
};

export default memo(RequestCard);

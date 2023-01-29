import { useRequestContext } from '@context/RequestContext';
import { useUserProfile } from '@context/UserProfileContext';
import { useUser } from '@supabase/auth-helpers-react';
import { memo, useCallback, useMemo } from 'react';

interface RequestProfile {
  full_name: string;
}

interface RequestTurf {
  turf_name: string;
  location: string;
}

export interface RequestResponse {
  id: number;
  profile_id: string;
  turf_id: string;
  game: string;
  game_date: string;
  player_needed: number;
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
  const { deleteRequest } = useRequestContext();
  const { userProfile, updateUserProfile } = useUserProfile();
  const { updatePlayerNeeded } = useRequestContext();

  const user = useUser();

  const handleAccept = useCallback(() => {
    updatePlayerNeeded(
      id,
      player_needed,
      userProfile?.full_name,
      userProfile?.phone_number
    );
    updateUserProfile({ request: [id.toString()] });
  }, [id, player_needed, updatePlayerNeeded, updateUserProfile, userProfile]);

  const handleDelete = useCallback(() => {
    deleteRequest(id);
  }, [id, deleteRequest]);

  const profileList = useMemo(
    () => (Array.isArray(profiles) ? profiles : [profiles]),
    [profiles]
  );
  const turfList = useMemo(
    () => (Array.isArray(turfs) ? turfs : [turfs]),
    [turfs]
  );

  return (
    <div className="rounded-lg border max-w-fit bg-white p-6 shadow">
      <div className="text-lg font-medium">Game: {game}</div>
      <div className="text-sm text-gray-600">Game Date: {game_date}</div>
      <div className="text-sm text-gray-600">
        Player Needed: {player_needed}
      </div>
      <div className="my-4">
        {profileList.map((profile, i) => (
          <div key={i} className="text-sm text-gray-600">
            {profile.full_name}
          </div>
        ))}
      </div>
      <div className="my-4">
        {turfList.map((turf, i) => (
          <div key={i} className="text-sm text-gray-600">
            <div>Turf Name: {turf.turf_name}</div>
            <div>Location: {turf.location}</div>
          </div>
        ))}
      </div>
      <hr className="mb-5 border-black" />
      <div>
        {profile_id === user?.id ? (
          <button
            onClick={handleDelete}
            className="rounded-lg bg-red-500 p-2 text-white"
          >
            Delete
          </button>
        ) : (
          <button
            disabled={
              userProfile.request.some((id) => id === id) || player_needed === 0
                ? true
                : false
            }
            onClick={handleAccept}
            className={`rounded-lg p-2 text-white ${
              userProfile.request.some((id) => id === id) || player_needed === 0
                ? 'bg-gray-500'
                : 'bg-green-500'
            }`}
          >
            Accept
          </button>
        )}
      </div>
    </div>
  );
};

export default memo(RequestCard);

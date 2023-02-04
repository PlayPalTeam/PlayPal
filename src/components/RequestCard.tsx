import { useRequestContext } from '@context/RequestContext';
import { useUserProfile } from '@context/UserProfileContext';
import { memo, useCallback, useMemo, useState } from 'react';
import { toast } from 'react-hot-toast';
import { BsArrowRight } from 'react-icons/bs';
import { Database } from 'src/types/database.types';
import DialogBox from './Dialog';

type RequestDataProps = Database['public']['Tables']['requests']['Row'];

interface RequestProfile {
  full_name: string;
}

interface RequestTurf {
  turf_name: string;
  location: string;
}

export interface RequestResponse extends RequestDataProps {
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

  const handleDeleteCreatedRequest = useCallback(() => {
    deleteRequest(id);
  }, [id, deleteRequest]);

  const request = requests.find((req) => req.id === id);

  const handleDeleteAcceptedRequest = () => {
    toast.success('Clicked');
    updateUserProfile({
      request: userProfile.request?.filter(
        (request) => request !== id.toString()
      )
    });
    updatePlayerNeeded({
      id: id,
      player_needed: player_needed + 1,
      people: request.people.filter((e) => e !== userProfile?.id)
    });
  };

  const profileList = useMemo(
    () => (Array.isArray(profiles) ? profiles : [profiles]),
    [profiles]
  );

  const turfList = useMemo(
    () => (Array.isArray(turfs) ? turfs : [turfs]),
    [turfs]
  );

  return (
    <div className="rounded-lg border bg-white p-6 shadow">
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
      <div className="flex items-center justify-between">
        {profile_id === userProfile?.id ? (
          <button
            onClick={handleDeleteCreatedRequest}
            className="rounded-lg bg-red-500 p-2 text-white"
          >
            Delete
          </button>
        ) : (
          <button
            disabled={player_needed === 0}
            onClick={
              userProfile.request?.includes(id.toString())
                ? handleDeleteAcceptedRequest
                : handleAccept
            }
            className={`rounded-lg p-2 text-white ${
              userProfile.request?.includes(id.toString())
                ? 'bg-red-500'
                : 'bg-emerald-500'
            }`}
          >
            {userProfile?.request?.includes(id.toString()) ? 'Delete' : 'Accept'}
          </button>
        )}
        <button
          onClick={() => setIsOpen(true)}
          className="group flex items-center gap-x-1 rounded-md bg-emerald-300 px-4 py-2 hover:bg-emerald-400 active:bg-emerald-500"
        >
          Show Details{' '}
          <BsArrowRight className="duration-300 group-hover:translate-x-1" />
        </button>
        <DialogBox title={'Players'} isOpen={isOpen} setIsOpen={setIsOpen}>
          <div>{request?.people}</div>
        </DialogBox>
      </div>
    </div>
  );
};

export default memo(RequestCard);

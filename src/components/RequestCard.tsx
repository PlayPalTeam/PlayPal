import { useRequestContext } from '@context/RequestContext';
import { useUserProfile } from '@context/UserProfileContext';
import { memo, useMemo, useCallback, useState } from 'react';
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

  const profileList = useCallback(
    () => (Array.isArray(profiles) ? profiles : [profiles]),
    [profiles]
  );

  const turfList = useCallback(
    () => (Array.isArray(turfs) ? turfs : [turfs]),
    [turfs]
  );

  return (
    <div className="card w-96 bg-neutral text-neutral-content">
      <div className="card-body items-center text-center">
        <h2 className="card-title">Cookies!</h2>
        <p>We are using cookies for no reason.</p>
        <div className="card-actions justify-end">
          <button className="btn-primary btn">Accept</button>
          <button className="btn-ghost btn">Deny</button>
        </div>
      </div>
    </div>
  );
};

export default memo(RequestCard);

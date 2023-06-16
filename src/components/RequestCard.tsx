import { useRequestContext } from '@/context/RequestContext';
import { useUserProfile } from '@/context/UserProfileContext';
import { memo, useCallback } from 'react';
import { Request } from '@/types/types';
import Delete from './Delete';
import useDialog from '@/hooks/useDialog';
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

const RequestCard = ({ profiles, turfs }: Partial<RequestResponse>) => {
  // const { closeDialog, isOpen, openDialog } = useDialog();

  // const { deleteRequest } = useRequestContext();
  // const { userProfile, updateUserProfile } = useUserProfile();
  // const { updatePlayerNeeded, requests } = useRequestContext();

  // const handleAccept = useCallback(() => {
  //   updatePlayerNeeded({
  //     id: id,
  //     player_needed: player_needed - 1,
  //     people: [userProfile?.full_name || userProfile?.username]
  //   });
  //   updateUserProfile({ request: [...userProfile?.request, profiles.toString()] });
  // }, [updatePlayerNeeded, updateUserProfile, userProfile]);

  // const handleDeleteCreatedRequest = async () => {
  //   await deleteRequest(id);
  // };

  // const request = requests.find((req) => req.id === id);

  // const handleDeleteAcceptedRequest = () => {
  //   updateUserProfile({
  //     request: userProfile.request?.filter((request) => request !== id.toString())
  //   });
  //   updatePlayerNeeded({
  //     id: id,
  //     player_needed: player_needed + 1,
  //     people: request.people?.filter((e) => e !== userProfile?.id)
  //   });
  // };

  // const profileList = useCallback(
  //   () => (Array.isArray(profiles) ? profiles : [profiles]),
  //   [profiles]
  // );

  // const turfList = useCallback(() => (Array.isArray(turfs) ? turfs : [turfs]), [turfs]);

  return <div></div>;
};

export default memo(RequestCard);

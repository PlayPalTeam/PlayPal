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
      people: [userProfile?.full_name || userProfile?.username]
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
    // <div className="card mb-5 bg-neutral text-neutral-content">
    //   <div className="card-body">
    //     <h2 className="card-title">{game}</h2>
    //     <p>Date: {game_date}</p>
    //     <p>Player needed: {player_needed}</p>
    //     <ul>
    //       {profileList().map((profile) => (
    //         <li key={profile.full_name}>
    //           <span>Created By: </span>
    //           {profile.full_name || profile.username}
    //         </li>
    //       ))}
    //     </ul>
    //     <ul>
    //       {turfList().map((turf) => (
    //         <li key={turf.turf_name}>
    //           {turf.turf_name}, {turf.address}
            
    //         </li>
    //       ))}
    //     </ul>
    //     <div className="card-actions md:justify-end ">
    //       {userProfile?.id === profile_id ? (
    //         <span className="tooltip tooltip-info" data-tip="Delete the request you have created">
    //           <Delete
    //             handleClose={closeDialog}
    //             handleOpen={openDialog}
    //             isOpen={isOpen}
    //             error
    //             buttonText="Cancel Request"
    //             title="Confirm Request Deletion"
    //             description="Are you sure you want to delete this request? This action cannot be undone. Please confirm below if you wish to proceed with the deletion."
    //             onClick={handleDeleteCreatedRequest}
    //           />
    //         </span>
    //       ) : userProfile?.request?.includes(id.toString()) ? (
    //         <Delete
    //           handleClose={closeDialog}
    //           handleOpen={openDialog}
    //           isOpen={isOpen}
    //           buttonText="Cancel Request"
    //           title="Confirm Request Deletion"
    //           description="Are you sure you want to delete this request? This action cannot be undone. Please confirm below if you wish to proceed with the deletion."
    //           onClick={handleDeleteAcceptedRequest}
    //         />
    //       ) : (
    //         <button type="button" onClick={handleAccept} className="btn-primary btn max-md:w-full">
    //           Accept Request
    //         </button>
    //       )}
    //     </div>
    //   </div>
    // </div>

    <div className=" bg-gray  card mb-5 border-2 border-gray-800  text-white shadow-2xl  lg:card-side ">
    {turfList().map((turf) => (
      <>
        <figure className='h-[250px] w-[370px] '>
          {/* <Ava src={turf?.turf_image} className="sm:h-[250px] sm:w-[370px]  h-[20px] w-[300px] mt-2  sm:mt-0" /> */}
          {/* <Image src={"https://source.unsplash.com/random/900×700/?fruit"} width={100} height={100}/> */}
          {
            game === "football" && (
              <img src='https://source.unsplash.com/random/500×300/?football' ></img>
            ) || game === "tennis" && (
              <img src='https://source.unsplash.com/random/900×700/?tennis' ></img>
            ) || game === "Box Cricket" && (
              <img src='https://source.unsplash.com/random/900×700/?cricket' ></img>
            ) || game === "soccer" && (
              <img src='https://source.unsplash.com/random/900×700/?soccer' ></img>
            ) 
            
          }
        </figure>
        <div className=" sm:ml-[30px] sm:mt-[20px] sm:mr-12 m-3 ">
          <h2 className="sm:mb-3 sm:text-2xl font-semibold sm:tracking-wider text-lg mb-2">{turf?.turf_name}</h2>
          <p className="sm:text-lg sm:font-normal sm:tracking-normal text-md font-medium sm:w-[640px]">{turf?.address}</p>
          <div className="sm:mt-3 sm:mr-12 sm:flex sm:justify-between mt-2 sm:text-lg text-sm">
            <p>Date : {game_date}</p>
            <p className='mt-1 sm:mt-0 sm:ml-44 sm:w-[230px]' >Players Req : {player_needed}</p>
          </div>
          <div className="sm:mt-3 sm:mr-12 sm:flex sm:justify-between mt-2 sm:text-lg text-sm">
          {profileList().map((profile) => (
            <>
            <p>Created By : {profile.username}</p>
            <p className='mt-1 sm:mt-0 sm:ml-44 sm:w-[230px]' >Sports: {game}</p>
            </>
          ))}
        
          </div>

          
          <div className=" mt-3 sm:mt-4">
          {userProfile?.id === profile_id ? (
            <span className="tooltip tooltip-info" data-tip="Delete the request you have created">
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
            <button type="button" onClick={handleAccept} className="btn-primary btn max-md:w-full">
              Accept Request
            </button>
          )}
          </div>
        </div>
      </>
    ))}
  </div>


  );
};

export default memo(RequestCard);

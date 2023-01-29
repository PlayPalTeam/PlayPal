const VenueRules = () => {
  return (
    <>
      <div className="w-[500px]">
        <div className="text-lg font-bold tracking-widest  ">Rules</div>
        <div>
          <ul>
            <li className="m-6">
              KheloMore provides slots given by the venue and bears no
              responsibility for usage of the facility that extends past the
              Government guidelines.
            </li>
            <li className="m-6">
              KheloMore is not responsible for any direct or indirect, for any
              loss, damage or injury to property or person in connection to the
              provided services by the facility
            </li>
            <li className="m-6"> No Smoking </li>
            <li className="m-6"> No Drinking </li>
          </ul>
        </div>

        <div className="mt-6 text-lg font-bold tracking-widest ">
          Additional terms and condition
        </div>
        <div>
          <ul>
            <li className="m-6">
              Wear appropriate sports attire and shoes while playing.
            </li>
            <li className="m-6">
              Management is not responsible for loss of personal belongings or
              any injuries caused during the match.
            </li>
          </ul>
        </div>

        <div className="mt-6 text-lg font-bold tracking-widest ">
          Cancellation Policiy
        </div>
        <div>
          <ul>
            <li className="m-6">
              100% Refundable if cancellation is made 2 days before the slot
              start time
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default VenueRules;

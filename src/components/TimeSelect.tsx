interface Slot {
  time: string[];
}

interface TimeProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  slots: Slot[];
}

interface Time {
  label: string;
  value: string;
  disble?: boolean;
}

const TimeSelect = ({ value, onChange, slots }: TimeProps) => {
  const times: Time[] = [
    { label: 'Select Time', value: '' },
    { label: '9:00 AM - 10:00 AM', value: '9:00 - 10:00' },
    { label: '10:00 AM -11:00 AM', value: '10:00 - 11:00' },
    { label: '11:00 AM - 12:00 PM', value: '11:00 - 12:00' },
    { label: '12:00 PM - 1:00 PM', value: '12:00 - 13:00' },
    { label: '1:00 PM - 2:00 PM', value: '13:00 - 14:00' },
    { label: '2:00 PM - 3:00 PM', value: '14:00 - 15:00' },
    { label: '3:00 PM - 4:00 PM', value: '15:00 -16:00' },
    { label: '4:00 PM - 5:00 PM', value: '16:00 - 17:00' },
    { label: '5:00 PM - 6:00 PM', value: '17:00 - 18:00' },
    { label: '6:00 PM - 7:00 PM', value: '18:00 - 19:00' }
  ];

  times.forEach((time) => {
    slots.forEach((slot) => {
      if (slot.time.includes(time.value)) {
        time.disble = true;
      }
    });
  });

  return (
    <div className="form-control">
      <label className="label" htmlFor="slotTime">
        <span className="label-text">Select Your Slot</span>
      </label>
      <select className={`select-bordered select-primary select`} id="slotTime" value={value} onChange={onChange}>
        {times.map((time) => {
          return (
            <option key={time.value} value={time.value} disabled={time.disble}>
              {time.label}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default TimeSelect;

import { format, addHours } from 'date-fns';
import { useUserProfile } from '@context/UserProfileContext';

const useHelper = () => {
  const { userProfile } = useUserProfile();

  const getRoleHref = (route: string) => {
    const role = userProfile?.role;
    return !route ? (role === 'lister' ? '/lister' : '/user') : `/${role}/${route}`;
  };

  const convertTime = (value: string) => {
    const date = new Date(`2000-01-01T${value}`);
    return format(date, 'h:mm a');
  };
  const createOneHourSlot = (startTime: string, endTime: string, times: string[]): Array<{ value: string; label: string; disabled: boolean }> => {
    const SlotOption = [];
    const start = new Date(`2023-02-18T${startTime}`);
    const end = new Date(`2023-02-18T${endTime}`);
    let current = start;
    while (current <= end) {
      const endHour = new Date(current.getTime() + 60 * 60 * 1000).getHours();
      const label = convertTime(current.toTimeString().slice(0, 8)) + ' - ' + convertTime(endHour + ':00:00');
      const disabled = times.includes(label);
      SlotOption.push({
        value: label,
        label: label,
        isDisabled: disabled
      });
      current = new Date(current.getTime() + 60 * 60 * 1000); // add one hour
      if (current >= end) break; // break if current time is past the end time
    }
    return SlotOption;
  };

  return {
    getRoleHref,
    createOneHourSlot,
    convertTime
  };
};

export default useHelper;

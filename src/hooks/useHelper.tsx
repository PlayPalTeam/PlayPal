import { format, addHours } from 'date-fns';
import { useUserProfile } from '@context/UserProfileContext';

const useHelper = () => {
  const { userProfile } = useUserProfile();

  const getRoleHref = (route: string) => {
    const role = userProfile?.role;
    return !route ? (role === 'lister' ? '/lister' : '/user') : `/${role}/${route}`;
  };

  const createOneHourSlot = (startTime: string, endTime: string, times: string[]): Array<{ value: string; label: string; disabled: boolean }> => {
    const start = new Date(`2023-02-18T${startTime}`);
    const end = new Date(`2023-02-18T${endTime}`);

    const SlotOption = [];

    for (let current = start; current <= end; current = addHours(current, 1)) {
      const endHour = addHours(current, 1);
      const label = `${format(current, 'h:mm a')} - ${format(endHour, 'h:mm a')}`;
      const isDisabled = times.includes(label);
      SlotOption.push({
        value: label,
        label: label,
        isDisabled: isDisabled
      });
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

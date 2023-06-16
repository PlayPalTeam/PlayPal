import { useUserProfile } from '@/context/UserProfileContext';

const useHelper = () => {
  const { userProfile } = useUserProfile();

  const getRoleHref = (route: string) => {
    const role = userProfile?.role;
    return !route ? (role === 'lister' ? '/lister' : '/user') : `/${role}/${route}`;
  };

  function convertTime(time: string) {
    if (!time || typeof time !== 'string' || !time.includes(':')) {
      return 'Invalid time';
    }

    const [hourStr, minute] = time.split(':');
    const hour = parseInt(hourStr);

    const suffix = hour >= 12 ? 'PM' : 'AM';
    const formattedHour = hour % 12 || 12;

    return `${formattedHour}:${minute} ${suffix}`;
  }

  function dateToString(date: Date) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    const paddedMonth = month < 10 ? `0${month}` : month;
    const paddedDay = day < 10 ? `0${day}` : day;

    return `${year}-${paddedMonth}-${paddedDay}`;
  }

  function createOneHourSlot(startHour: string, endHour: string, times: string[]) {
    const slots = [];
    const startDate = new Date(`01/01/1970 ${startHour}`);
    const endDate = new Date(`01/01/1970 ${endHour}`);

    while (startDate <= endDate) {
      const slotStart = new Date(startDate);
      const slotEnd = new Date(startDate.setHours(startDate.getHours() + 1));
      const label = `${formatTime(slotStart)} - ${formatTime(slotEnd)}`;
      const isDisabled = times.includes(label);
      slots.push({ value: label, label: label, isDisabled: isDisabled });
    }

    return slots;
  }

  function formatTime(date: Date): string {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = (hours % 12 || 12).toString().padStart(2, '0');
    const formattedMinutes = minutes.toString().padStart(2, '0');
    return `${formattedHours}:${formattedMinutes} ${ampm}`;
  }

  return {
    getRoleHref,
    createOneHourSlot,
    convertTime,
    dateToString
  };
};

export default useHelper;

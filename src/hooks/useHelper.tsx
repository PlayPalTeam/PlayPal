import { useUserProfile } from '@context/UserProfileContext';

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
    const splitTime = time.split(':');
    const hour = parseInt(splitTime[0]);
    const minute = splitTime[1];
    const suffix = hour >= 12 ? 'PM' : 'AM';
    const formattedHour = hour % 12 || 12; // use the logical OR operator to handle the case where the remainder is 0
    return formattedHour + ':' + minute + ' ' + suffix;
  }

  function DatetoString(date: Date) {
    const year = date.getFullYear(); // get the year (YYYY)
    const month = date.getMonth() + 1; // get the month (0-11) and add 1 to convert to (1-12)
    const day = date.getDate(); // get the day of the month (1-31)

    // pad the month and day with leading zeros if they are less than 10
    const paddedMonth = month < 10 ? `0${month}` : month;
    const paddedDay = day < 10 ? `0${day}` : day;

    const dateString = `${year}-${paddedMonth}-${paddedDay}`; // concatenate the components into a string in the desired format

    return dateString;
  }

  function createOneHourSlot(startHour: string, endHour: string, times: string[]) {
    const slots = [];
    const startDate = new Date(Date.parse(`01/01/1970 ${startHour}`));
    const endDate = new Date(Date.parse(`01/01/1970 ${endHour}`));

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
    DatetoString
  };
};

export default useHelper;

import { format } from 'date-fns';
import { BLACKLIST_WORKING_DATES } from './constants';

const TODAY = new Date();
TODAY.setHours(0, 0, 0, 0);

export function getTotalWorkingDays(startDateStr: string) {
  const [day, month, year] = startDateStr.split('/').map(Number);

  let totalWorkingDays = 0;
  const workingDatesTillToday: string[] = [];

  const cycleStartDate = new Date(year, month - 1, day);
  const startMonth = cycleStartDate.getMonth();
  const cycleEndDate = new Date(year, startMonth + 1, day);
  cycleEndDate.setDate(cycleStartDate.getDate() - 1);

  for (let i = new Date(cycleStartDate); i <= cycleEndDate; i.setDate(i.getDate() + 1)) {
    const day = i.getDay();
    const dateStr = format(i, 'dd/MM/yyyy');

    if (BLACKLIST_WORKING_DATES.includes(dateStr)) continue;

    // Exclude sunday from working-days
    if (day !== 0) {
      totalWorkingDays++;
      if (i < TODAY) {
        workingDatesTillToday.push(dateStr);
      }
    }
  }

  return {
    totalWorkingDays,
    workingDatesTillToday,
    totalWorkingDaysTillToday: workingDatesTillToday.length,
  };
}

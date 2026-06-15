/**
 * Example of standup tasks
 *
 * ['', '', '', 'Daily Standup', 'Planned', 'Daily Standup Call  11/06/2026', 'High', 'Recurring', '11/06/2026', '11/06/2026', '11/06/2026', '1', '1']
 */

import { getTaskColumns } from './get-task-columns';

export function filterStandupTasks(tasks: string[][]) {
  return tasks.filter((t) => {
    const { taskType } = getTaskColumns(t);
    return taskType === 'Daily Standup';
  });
}

export function filterStartedTasks(tasks: string[][]) {
  return tasks.filter((t) => {
    const { status } = getTaskColumns(t);
    return t.length > 0 && status !== 'Not Started';
  });
}

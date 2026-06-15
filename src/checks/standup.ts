/**
 * Example of standup tasks
 *
 * ['', '', '', 'Daily Standup', 'Planned', 'Daily Standup Call  11/06/2026', 'High', 'Recurring', '11/06/2026', '11/06/2026', '11/06/2026', '1', '1']
 */

export function filterStandupTasks(tasks: string[][]) {
  return tasks.filter((t) => {
    const taskType = t[3];
    return taskType === 'Daily Standup';
  });
}

// This function should only get standup-tasks
export function checkStandupTaskColumns(tasks: string[][]) {
  return tasks.every((t) => {
    const workCategory = t[4];
    const priority = t[6];
    const status = t[7];

    return workCategory === 'Planned' && priority === 'High' && status === 'Recurring';
  });
}

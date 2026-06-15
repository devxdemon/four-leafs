export function getTaskColumns(task: string[]) {
  const project = task[0];
  const subProject = task[1];
  const appSide = task[2];
  const taskType = task[3];
  const workCategory = task[4];
  const title = task[5];
  const priority = task[6];
  const status = task[7];
  const startDate = task[8];
  const endDate = task[9];
  const actualEndDate = task[10];
  const estimatedHours = task[11];
  const actualHours = task[12];
  const taskTimebreakdown = task[14];
  const comment = task[15];

  return {
    project,
    subProject,
    appSide,
    taskType,
    workCategory,
    title,
    priority,
    status,
    startDate,
    endDate,
    actualEndDate,
    estimatedHours,
    actualHours,
    taskTimebreakdown,
    comment,
  };
}

export const calculateTotalTime = (tasks: string[][]) =>
  tasks.reduce((acc, t) => {
    const { actualHours } = getTaskColumns(t);
    return Number(actualHours) + acc;
  }, 0);

export const TaskStatus = {
    NOT_STARTED: 'NotStarted',
    IN_PROGRESS: 'InProgress',
    COMPLETED: 'Completed'
};

export const TaskStatusLabels = {
    [TaskStatus.NOT_STARTED]: 'Başlanmadı',
    [TaskStatus.IN_PROGRESS]: 'Devam Ediyor',
    [TaskStatus.COMPLETED]: 'Tamamlandı'
};

export const TaskStatusColors = {
    [TaskStatus.NOT_STARTED]: {
        bg: 'bg-gray-100',
        text: 'text-gray-800',
        hover: 'hover:bg-gray-200'
    },
    [TaskStatus.IN_PROGRESS]: {
        bg: 'bg-blue-100',
        text: 'text-blue-800',
        hover: 'hover:bg-blue-200'
    },
    [TaskStatus.COMPLETED]: {
        bg: 'bg-green-100',
        text: 'text-green-800',
        hover: 'hover:bg-green-200'
    }
};
 
import { useMemo } from 'react';
import { TaskStatus } from '../constants';

export const useTaskStats = (tasks) => {
    const stats = useMemo(() => {
        const initialStats = {
            total: tasks.length,
            notStarted: 0,
            inProgress: 0,
            completed: 0
        };

        return tasks.reduce((acc, task) => {
            switch (task.status) {
                case TaskStatus.NOT_STARTED:
                    acc.notStarted++;
                    break;
                case TaskStatus.IN_PROGRESS:
                    acc.inProgress++;
                    break;
                case TaskStatus.COMPLETED:
                    acc.completed++;
                    break;
            }
            return acc;
        }, initialStats);
    }, [tasks]);

    return stats;
};
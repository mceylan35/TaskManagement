// src/components/tasks/TaskList.jsx
import { useEffect, useState } from 'react';
import { useTasks } from '../../hooks/useTasks';
import { useAuth } from '../../hooks/useAuth';
import TaskCard from './TaskCard'; 
import { PlusIcon } from '@heroicons/react/24/outline';
import TaskForm from './TaskForm';

const TaskList = () => {
    
    //const stats = useTaskStats(tasks);
    const { tasks, loading, error, loadTasks,createTask } = useTasks();
    const { user } = useAuth();
    const [showAddModal, setShowAddModal] = useState(false); 
    
    useEffect(() => {
        loadTasks();
    }, []);
  
    useEffect(() => {
        
    }, [tasks]);

     

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center text-red-600 p-4">
                <p>Bir hata olu�tu: {error}</p>
                <button
                    onClick={loadTasks}
                    className="mt-2 text-white bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-md"
                >
                    Tekrar Dene
                </button>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4">
         

            

            {tasks.length === 0 ? (
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                    <p className="text-gray-500">Henüz görev bulunmuyor</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {tasks.map(task => (
                        <TaskCard
                            key={task.id}
                            task={task}
                            isAdmin={user.isAdmin}
                            isOwnTask={task.assignedUserId === user.id}
                        />
                    ))}
                </div>
            )}

           
        </div>
    );
};

export default TaskList;
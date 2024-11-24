// src/pages/TasksPage.jsx
import { useState } from 'react';
import { useTasks } from '../hooks/useTasks';
import { useAuth } from '../hooks/useAuth';
import TaskList from '../components/tasks/TaskList';
import TaskForm from '../components/tasks/TaskForm'; 
import { PlusIcon } from '@heroicons/react/24/outline';

const TasksPage = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const { user } = useAuth();
  const { tasks, loading, error,createTask } = useTasks();

  return (
    <div>
      <div className="mb-6">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-2xl font-semibold text-gray-900">Görevler</h1>
            <p className="mt-2 text-sm text-gray-700">
              Tüm görevlerinizi bu sayfadan yönetebilirsiniz.
            </p>
          </div>
          <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
            <button
              type="button"
              onClick={() => setShowCreateModal(true)}
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
            >
              <PlusIcon className="-ml-1 mr-2 h-5 w-5" />
              Yeni Görev
            </button>
          </div>
        </div>
      </div>

 

      {
      error && (
        <div className="rounded-md bg-red-50 p-4 mb-6">
          <div className="flex">
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">
                Bir hata oluştu
              </h3>
              <div className="mt-2 text-sm text-red-700">
                <p>{error}</p>
              </div>
            </div>
          </div>
        </div>
      )
        }
<TaskList />
       

      {showCreateModal && (
        <TaskForm
          onClose={() => setShowCreateModal(false)}
          onSubmit={async (data) => {
            await createTask(data);
            setShowAddModal(false);
        }
          
        }
        />
      )}
    </div>
  );
};

export default TasksPage;
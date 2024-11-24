// src/pages/DashboardPage.jsx
import { useEffect, useState } from 'react';
import { useTasks } from '../hooks/useTasks';
import { useAuth } from '../hooks/useAuth';
import { 
  CheckCircleIcon, 
  ClockIcon, 
  ArrowTrendingUpIcon,
  UserGroupIcon
} from '@heroicons/react/24/outline';
import { TaskStatus } from '../constants';

const DashboardPage = () => {
  const { tasks, loading } = useTasks();
  const { user } = useAuth();
  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    inProgress: 0,
    notStarted: 0,
    completionRate: 0
  });

  useEffect(() => {
    if (tasks.length > 0) {
      const total = tasks.length;
      const completed = tasks.filter(t => t.status === 2).length;
      const inProgress = tasks.filter(t => t.status === 1).length;
      const notStarted = tasks.filter(t => t.status === 0).length;
      
      setStats({
        total,
        completed,
        inProgress,
        notStarted,
        completionRate: Math.round((completed / total) * 100)
      });
    }
  }, [tasks]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">
          Hoşgeldiniz, {user.firstName}!
        </h1>
        <p className="mt-1 text-sm text-gray-600">
          Görev durumunuz ve istatistikleriniz aşağıda görüntülenmektedir.
        </p>
      </div>

      {/* İstatistik Kartları */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {/* Toplam Görevler */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <UserGroupIcon className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Toplam Görev
                  </dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">
                      {stats.total}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        {/* Tamamlanan Görevler */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <CheckCircleIcon className="h-6 w-6 text-green-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Tamamlanan
                  </dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">
                      {stats.completed}
                    </div>
                    <div className="ml-2 text-sm text-green-600">
                      (%{stats.completionRate})
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        {/* Devam Eden Görevler */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <ArrowTrendingUpIcon className="h-6 w-6 text-blue-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Devam Eden
                  </dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">
                      {stats.inProgress}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        {/* Bekleyen Görevler */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <ClockIcon className="h-6 w-6 text-yellow-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Bekleyen
                  </dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">
                      {stats.notStarted}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Son Aktiviteler */}
      <div className="mt-8">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Son Aktiviteler</h2>
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            {tasks.slice(0, 5).map((task) => (
              <li key={task.id}>
                <div className="px-4 py-4 flex items-center sm:px-6">
                  <div className="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
                    <div>
                      <div className="flex text-sm">
                        <p className="font-medium text-indigo-600 truncate">{task.title}</p>
                        <p className="ml-1 flex-shrink-0 font-normal text-gray-500">
                          {task.description}
                        </p>
                      </div>
                     
                    </div>
                    <div className="mt-4 flex-shrink-0 sm:mt-0">
                      <div
                        className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                          task.status === 2
                            ? 'bg-green-100 text-green-800'
                            : task.status === 1
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {task.status === 2
                          ? 'Tamamlandı'
                          : task.status === 1
                          ? 'Devam Ediyor'
                          : 'Bekliyor'}
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
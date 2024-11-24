
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../hooks/useAuth';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { toast } from 'react-hot-toast'; 
import userService from '../../services/authService';

const TaskStatus = {
    NOT_STARTED: 'NotStarted',
    IN_PROGRESS: 'InProgress',
    COMPLETED: 'Completed'
};

  
 
const ApiStatusMapping = {
    0: TaskStatus.NOT_STARTED,
    1: TaskStatus.IN_PROGRESS,
    2: TaskStatus.COMPLETED,
    
    [TaskStatus.NOT_STARTED]: 0,
    [TaskStatus.IN_PROGRESS]: 1,
    [TaskStatus.COMPLETED]: 2
};

const TaskStatusLabels = {
    [TaskStatus.NOT_STARTED]: 'Başlanmadı',
    [TaskStatus.IN_PROGRESS]: 'Devam Ediyor',
    [TaskStatus.COMPLETED]: 'Tamamlandı'
};
const getInitialStatus = (task) => {
    if (!task) return TaskStatus.NOT_STARTED;
    return ApiStatusMapping[task.status] || TaskStatus.NOT_STARTED;
};
const TaskForm = ({ task, onClose, onSubmit }) => {
    const { user } = useAuth();
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
   
    
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm({
        defaultValues: {
            title: task?.title || '',
            description: task?.description || '', 
            status: getInitialStatus(task) 
        }
    });
   
    

    const handleFormSubmit = async (data) => {
        setIsLoading(true);
        try {
            await onSubmit(data);
            
            onClose();
        } catch (error) {
           
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                {/* Backdrop */}
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={onClose}></div>

                {/* Modal */}
                <div className="inline-block transform overflow-hidden rounded-lg bg-white text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:align-middle">
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        {/* Header */}
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-medium text-gray-900">
                                {task ? 'Görevi Düzenle' : 'Yeni Görev Oluştur'}
                            </h3>
                            <button
                                onClick={onClose}
                                className="rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
                            >
                                <XMarkIcon className="h-6 w-6" />
                            </button>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
                            {/* Başlık */}
                            <div>
                                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                                    Başlık
                                </label>
                                <input
                                    type="text"
                                    id="title"
                                    {...register('title', {
                                        required: 'Başlık gereklidir',
                                        minLength: {
                                            value: 3,
                                            message: 'Başlık en az 3 karakter olmalıdır'
                                        }
                                    })}
                                    className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${errors.title ? 'border-red-300' : ''}`}
                                    disabled={isLoading}
                                />
                                {errors.title && (
                                    <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
                                )}
                            </div>

                            {/* Açıklama */}
                            <div>
                                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                                    Açıklama
                                </label>
                                <textarea
                                    id="description"
                                    rows={3}
                                    {...register('description', {
                                        required: 'Açıklama gereklidir',
                                        minLength: {
                                            value: 10,
                                            message: 'Açıklama en az 10 karakter olmalıdır'
                                        }
                                    })}
                                    className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${errors.description ? 'border-red-300' : ''}`}
                                    disabled={isLoading}
                                />
                                {errors.description && (
                                    <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
                                )}
                            </div>

                           

                            {/* Durum */}
                            {task && (user?.isAdmin || task.assignedUserId === user?.id) && (
                                <div>
                                    <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                                        Durum
                                    </label>
                                    <select
                                        id="status"
                                        {...register('status')}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        disabled={isLoading}
                                    >
                                        {Object.entries(TaskStatusLabels).map(([value, label]) => (
                                            <option key={value} value={value}>
                                                {label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            )}

                            {/* Buttons */}
                            <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                                >
                                    {isLoading ? 'Kaydediliyor...' : task ? 'Güncelle' : 'Oluştur'}
                                </button>
                                <button
                                    type="button"
                                    onClick={onClose}
                                    disabled={isLoading}
                                    className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:w-auto sm:text-sm"
                                >
                                    İptal
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TaskForm;
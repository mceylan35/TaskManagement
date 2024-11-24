// src/components/tasks/TaskCard.jsx
import { useState } from 'react';
import { useTasks } from "../../hooks/useTasks";
import { useAuth } from '../../hooks/useAuth';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';
import TaskForm from './TaskForm';
import { toast } from 'react-hot-toast';

const TaskCard = ({ task, isAdmin, isOwnTask }) => {
    const [showEditModal, setShowEditModal] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const { updateTask, deleteTask, updateTaskStatus } = useTasks();

    // Durum badge'i için renkler
    const getStatusColor = (status) => {
        switch (status) {
            case 0:
                return 'bg-gray-100 text-gray-800';
            case 1:
                return 'bg-blue-100 text-blue-800';
            case 2:
                return 'bg-green-100 text-green-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    // Durum metni
    const getStatusText = (status) => {
       
        switch (status) {
            case 0:
                return 'Başlanmadı';
            case 1:
                return 'Devam Ediyor';
            case 2:
                return 'Tamamlandı';
            default:
                return 'Başlanmadı';
        }
    };

    // Sonraki durumu belirle
    const getNextStatus = (currentStatus) => {
        switch (currentStatus) {
            case 1:
                return 'InProgress';
            case 2:
                return 'Completed';
            case 0:
                return 'NotStarted';
            default:
                return 'NotStarted';
        }
    };
 

    const handleDelete = async () => {
        if (!isAdmin && !isOwnTask) {
            toast.error('Bu görevi silme yetkiniz yok');
            return;
        }

        if (window.confirm('Bu görevi silmek istediğinizden emin misiniz?')) {
            setIsDeleting(true);
            try {
                await deleteTask(task.id);
            
            } catch (error) {
                console.error('Delete error:', error);
                toast.error('Görev silinirken bir hata oluştu');
            } finally {
                setIsDeleting(false);
            }
        }
    };

    return (
        <>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200">
                {/* Başlık */}
                <div className="p-4 border-b border-gray-200">
                    <div className="flex justify-between items-start">
                        <h3 className="text-lg font-semibold text-gray-900 flex-grow">
                            {task.title}
                        </h3>
                        {(isAdmin || isOwnTask) && (
                            <div className="flex space-x-2 ml-4">
                                <button
                                    onClick={() => setShowEditModal(true)}
                                    className="p-1 rounded-full hover:bg-gray-100 text-gray-500 hover:text-gray-700"
                                >
                                    <PencilIcon className="h-5 w-5" />
                                </button>
                                <button
                                    onClick={handleDelete}
                                    disabled={isDeleting}
                                    className="p-1 rounded-full hover:bg-red-100 text-red-500 hover:text-red-700"
                                >
                                    <TrashIcon className="h-5 w-5" />
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* İçerik */}
                <div className="p-4">
                    <p className="text-gray-600 text-sm mb-4">
                        {task.description}
                    </p>

                 

                    {/* Durum ve Tarih */}
                    <div className="flex justify-between items-center">
                        <button
                            
                            disabled={!isAdmin && !isOwnTask}
                            className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(task.status)} 
                                ${(isAdmin || isOwnTask) ? 'cursor-pointer hover:opacity-80' : 'cursor-not-allowed'}`}
                        >
                            {getStatusText(task.status)}
                        </button>

                        <div className="text-xs text-gray-500">
                            <div>Oluşturma: {format(new Date(task.createdDate), 'dd MMM yyyy', { locale: tr })}</div>
                            {task.modifiedDate && (
                                <div>Güncelleme: {format(new Date(task.modifiedDate), 'dd MMM yyyy', { locale: tr })}</div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Düzenleme Modal */}
            {showEditModal && (
                <TaskForm
                    task={task}
                    onClose={() => setShowEditModal(false)}
                    onSubmit={async (data) => {
                        try {
                            await updateTask(task.id, data);
                            setShowEditModal(false); 
                        } catch (error) {
                            toast.error('Görev güncellenirken bir hata oluştu');
                        }
                    }}
                />
            )}
        </>
    );
};

export default TaskCard;
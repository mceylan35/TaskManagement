import { createContext, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import taskService from '../services/taskService';
import { useAuth } from '../hooks/useAuth';

export const TaskContext = createContext(null);

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  const loadTasks = async () => {
    setLoading(true);
    try {
      const data = user?.isAdmin 
        ? await taskService.getAllTasks()
        : await taskService.getUserTasks();
      setTasks(data);
      setError(null);
    } catch (err) {
      setError(err.message || 'Görevler yüklenirken bir hata oluştu');
      toast.error('Görevler yüklenirken bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      loadTasks();
    }
  }, [user]);

  const createTask = async (taskData) => {
    try {
     
      
      const newTask = await taskService.createTask(taskData);
      setTasks(prev => [...prev, newTask]);
      toast.success('Görev başarıyla oluşturuldu');
      return newTask;
    } catch (err) {
      toast.error(err.message || 'Görev oluşturulurken bir hata oluştu');
      throw err;
    }
  };

  const updateTask = async (id, taskData) => {
    try { 
      
      const updatedTask = await taskService.updateTask(id, taskData);
      setTasks(prev => prev.map(task => 
        task.id === id ? updatedTask : task
      ));
      toast.success('Görev başarıyla güncellendi');
      return updatedTask;
    } catch (err) {
      toast.error(err.message || 'Görev güncellenirken bir hata oluştu');
      throw err;
    }
  };

  const deleteTask = async (id) => {
    try {  
      
      await taskService.deleteTask(id);
      setTasks(prev => prev.filter(task => task.id !== id));
      toast.success('Görev başarıyla silindi');
    } catch (err) {
      toast.error(err.message || 'Görev silinirken bir hata oluştu');
      throw err;
    }
  };

  const updateTaskStatus = async (id, status) => {
    try { 
      
      const updatedTask = await taskService.updateTaskStatus(id, status);
      setTasks(prev => prev.map(task => 
        task.id === id ? updatedTask : task
      ));
      toast.success('Görev durumu güncellendi');
      return updatedTask;
    } catch (err) {
      toast.error(err.message || 'Görev durumu güncellenirken bir hata oluştu');
      throw err;
    }
  };

  const value = {
    tasks,
    loading,
    error,
    loadTasks,
    createTask,
    updateTask,
    deleteTask,
    updateTaskStatus
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};
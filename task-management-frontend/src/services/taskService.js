// src/services/taskService.js
import fetchWrapper from '../utils/fetchWrapper';

class TaskService {
  async getAllTasks() {
    try {
      const response = await fetchWrapper.get('/Task');
      return response;
    } catch (error) {
      throw error;
    }
  }

  async getUserTasks() {
    try {
     
      
      const response = await fetchWrapper.get(`/Task`);
      return response;
    } catch (error) {
      throw error;
    }
  }

  async getTaskById(id) {
    try {
      const response = await fetchWrapper.get(`/Task/${id}`);
      return response;
    } catch (error) {
      throw error;
    }
  }

  async createTask(taskData) {
    try {
      const response = await fetchWrapper.post('/Task', {
        title: taskData.title,
        description: taskData.description, 
        status: taskData.status || 'NotStarted'
      });
      return response;
    } catch (error) {
      throw error;
    }
  }

  async updateTask(id, taskData) {
    try {
      const response = await fetchWrapper.put(`/Task/${id}`, {
        id,
        title: taskData.title,
        description: taskData.description, 
        status: taskData.status
      });
      return response;
    } catch (error) {
      throw error;
    }
  }

  async deleteTask(id) {
    try {
      await fetchWrapper.delete(`/Task/${id}`);
      return true;
    } catch (error) {
      throw error;
    }
  }

  async updateTaskStatus(id, status) {
    try {
      const response = await fetchWrapper.put(`/Task/${id}/status`, { status });
      return response;
    } catch (error) {
      throw error;
    }
  }
 
  async getTasksByStatus(status) {
    try {
      const response = await fetchWrapper.get(`/Task/status/${status}`);
      return response;
    } catch (error) {
      throw error;
    }
  }

  async getTaskStatistics() {
    try {
      const response = await fetchWrapper.get('/Task/statistics');
      return response;
    } catch (error) {
      throw error;
    }
  }

  async searchTasks(searchTerm) {
    try {
      const response = await fetchWrapper.get(`/Task/search?term=${encodeURIComponent(searchTerm)}`);
      return response;
    } catch (error) {
      throw error;
    }
  }

  async getTaskHistory(id) {
    try {
      const response = await fetchWrapper.get(`/Task/${id}/history`);
      return response;
    } catch (error) {
      throw error;
    }
  }

  async addTaskComment(id, comment) {
    try {
      const response = await fetchWrapper.post(`/Task/${id}/comments`, { comment });
      return response;
    } catch (error) {
      throw error;
    }
  }

  async getTaskComments(id) {
    try {
      const response = await fetchWrapper.get(`/Task/${id}/comments`);
      return response;
    } catch (error) {
      throw error;
    }
  }
}

const taskService = new TaskService();
export default taskService;
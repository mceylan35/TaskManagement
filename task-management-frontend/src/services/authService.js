// src/services/authService.js
import fetchWrapper from '../utils/fetchWrapper';

class AuthService {
  async login(email, password) {
    try {
      const response = await fetchWrapper.post('/User/login', { email, password });
      if (response.token) {
        localStorage.setItem('token', response.token);
      }
      return response;
    } catch (error) {
      throw error;
    }
  }

  async register(userData) {
    try {
      const response = await fetchWrapper.post('/User/register', userData);
      return response;
    } catch (error) {
      throw error;
    }
  }

  async getCurrentUser() {
    try {
      const response = await fetchWrapper.get('/User/me');
      return response;
    } catch (error) {
      throw error;
    }
  }

  

  async changePassword(currentPassword, newPassword) {
    try {
      const response = await fetchWrapper.post('/User/change-password', {
        currentPassword,
        newPassword
      });
      return response;
    } catch (error) {
      throw error;
    }
  }

  async forgotPassword(email) {
    try {
      const response = await fetchWrapper.post('/User/forgot-password', { email });
      return response;
    } catch (error) {
      throw error;
    }
  }

  async resetPassword(resetToken, newPassword) {
    try {
      const response = await fetchWrapper.post('/User/reset-password', {
        token: resetToken,
        newPassword
      });
      return response;
    } catch (error) {
      throw error;
    }
  }

  async refreshToken() {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No refresh token found');

      const response = await fetchWrapper.post('/User/refresh-token', {
        token
      });

      if (response.token) {
        localStorage.setItem('token', response.token);
      }
      return response;
    } catch (error) {
      throw error;
    }
  }

  logout() {
    localStorage.removeItem('token');
  }

  validateTCKN(tckn) {
    if (!/^\d{11}$/.test(tckn)) return false;

    const digits = tckn.split('').map(Number);
    let oddSum = 0;
    let evenSum = 0;
    let firstTenSum = 0;

    for (let i = 0; i < 9; i++) {
      if (i % 2 === 0) {
        oddSum += digits[i];
      } else {
        evenSum += digits[i];
      }
      firstTenSum += digits[i];
    }

    const digit10 = ((oddSum * 7) - evenSum) % 10;
    if (digit10 !== digits[9]) return false;

    firstTenSum += digits[9];
    const digit11 = firstTenSum % 10;
    if (digit11 !== digits[10]) return false;

    return true;
  }

  isAuthenticated() {
    const token = localStorage.getItem('token');
    return !!token;
  }
}

const authService = new AuthService();
export default authService;
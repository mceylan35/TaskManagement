// src/utils/fetchWrapper.js
const BASE_URL = 'https://localhost:7202/api';

const fetchWrapper = {
  get: async (url) => {
    const requestOptions = {
      method: 'GET',
      headers: authHeader(url)
    };
    return await fetchWithError(`${BASE_URL}${url}`, requestOptions);
  },

  post: async (url, body) => {
    const requestOptions = {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'text/plain',
        ...authHeader(url)
      },
      body: JSON.stringify(body)
    };
    return await fetchWithError(`${BASE_URL}${url}`, requestOptions);
  },

  put: async (url, body) => {
    const requestOptions = {
      method: 'PUT',
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'text/plain',
        ...authHeader(url)
      },
      body: JSON.stringify(body)
    };
    return await fetchWithError(`${BASE_URL}${url}`, requestOptions);
  },

  delete: async (url) => {
    const requestOptions = {
      method: 'DELETE',
      headers: authHeader(url)
    };
    return await fetchWithError(`${BASE_URL}${url}`, requestOptions);
  }
};

function authHeader(url) {
  const token = localStorage.getItem('token');
  const isLoggedIn = token ? true : false;
  if (isLoggedIn) {
    return { 
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      'Accept': 'text/plain'
    };
  } else {
    return {};
  }
}

async function fetchWithError(url, options) {
  try {
    const response = await fetch(url, options);
    
    if (!response.ok) {
      if (response.status === 401) {
        // Auto logout if 401 response returned from api
        localStorage.removeItem('token');
        location.reload();
      }

      const errorData = await response.json();
      throw {
        message: errorData.message || 'Bir hata oluşt1u',
        status: response.status
      };
    }

    const data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof TypeError) {
      throw {
        message: 'Sunucuya ulaşılamıyor',
        status: 503
      };
    }
    throw error;
  }
}

export default fetchWrapper;
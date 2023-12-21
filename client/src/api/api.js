// api code for making requests to the server
//
const API_URL = 'http://localhost:8081/api';

export const api = {
  request: async (method, url, token, data = null) => {
    const options = {
      method,
      headers: {},
    };
    if (token) {
      options.headers['Authorization'] = `Bearer ${token}`;
    }
    if (data) {
      options.headers['Content-Type'] = 'application/json';
      options.body = JSON.stringify(data);
    }
    const response = await fetch(`${API_URL}/${url}`, options);
    const responseData = await response.json();
    return responseData;
  },
  // make a get request to the server
  get: (url, token) => api.request('GET', url, token),

  // make a post request to the server
  post: (url, token, data) => api.request('POST', url, token, data),

  // make a post request to the server for user signup
  signup: (url, body) => api.request('POST', url, null, body),

  // make a post request to the server for user login
  login: (url, credentials) => api.request('POST', url, null, credentials),

  // make a post request to the server for user logout
  logout: async (token) => {
    const response = await fetch(`${API_URL}/user/logout`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return data;
  },
  // make a put request to the server
  put: async (url, token, body) => {
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body,
    });
    const data = await response.json();
    return data;
  },
  // make a delete request to the server
  delete: (url, token) => api.request('DELETE', url, token),
};

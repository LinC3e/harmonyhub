import { useState, useCallback } from 'react';
import axios from 'axios';

const useAxios = (endpoint, method, initialData = null) => {
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const token = localStorage.getItem('token');

  const callApi = useCallback(async (body = null) => {
    setLoading(true);
    setError(null);

    try {
      console.log(token)
      const config = {
        url: `${import.meta.env.VITE_API_URL}${endpoint}`,
        method,
        data: body,
        headers: {
          'Content-Type': 'application/json',
          ...(token && { 'Authorization': `Token ${token}` }),
        },
      };

      const response = await axios(config);
      console.log(response)
      setData(response.data);
      console.log({
        url: `${import.meta.env.VITE_API_URL}${endpoint}`,
        method,
        data: body,
        headers: {
          'Content-Type': 'application/json',
          ...(token && { 'Authorization': `Token ${token}` }),
        },
      });
    } catch (err) {
      console.log(err)
      const errorData = err.response ? err.response.data : 'Error';
      setError(errorData);
    } finally {
      setLoading(false);
    }
  }, [endpoint, method, token]);

  return { data, loading, error, callApi };
};

export default useAxios;
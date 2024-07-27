import { useState, useCallback } from 'react';
import axios from 'axios';

const useAxios = (endpoint, method, initialData = null) => {
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const callApi = useCallback(async (body = null) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios({
        url: `${import.meta.env.VITE_API_URL}${endpoint}`,
        method,
        data: body,
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(response)
      setData(response.data);
    } catch (err) {
      console.log(err)
      setError(err.response ? err.response.data : 'Error');
    } finally {
      setLoading(false);
    }
  }, [endpoint, method]);

  return { data, loading, error, callApi };
};

export default useAxios;
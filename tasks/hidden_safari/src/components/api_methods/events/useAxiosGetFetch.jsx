import { useEffect, useState } from 'react';
import axios from 'axios';

const useAxiosGetFetch = (url) => {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!url) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await axios.get(url);
        setResponse(result.data);
        setError(null);
      } catch (error) {
        setError(error.message || 'An error occurred');
        setResponse(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      const source = axios.CancelToken.source();
      source.cancel('Component unmounted, request canceled');
    };
  }, [url]);

  return { response, loading, error };
};

export default useAxiosGetFetch;
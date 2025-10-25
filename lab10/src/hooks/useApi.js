import { useState, useEffect } from 'react';

export const useApi = (query, variables = {}, options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const res = await fetch('http://localhost:4000/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': options.format || 'application/json',
          'x-api-key': 'TU_API_KEY_AQUI', // Si usas API Key
          ...options.headers,
        },
        body: JSON.stringify({
          query,
          variables
        }),
      });
      
      if (!res.ok) {
        throw new Error(`Error ${res.status}: ${res.statusText}`);
      }
      
      const result = await res.json();
      
      if (result.errors) {
        throw new Error(result.errors[0].message);
      }
      
      setData(result.data);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [query, JSON.stringify(variables)]);

  return { data, loading, error, refetch: fetchData };
};
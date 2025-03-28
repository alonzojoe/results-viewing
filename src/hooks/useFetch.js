import { useState, useEffect } from "react";
import api from "../services/api";

const useFetch = (endpoint, params = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await api(endpoint, {
          params,
        });
        setData(res.data.data);
      } catch (error) {
        setError(error?.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [endpoint, JSON.stringify(params)]);

  return [data, loading, error];
};

export default useFetch;

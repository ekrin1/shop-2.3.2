import { useEffect, useState } from 'react';

type FetchState<T> = {
  data: T | null;
  loading: boolean;
};

const useFetch = <T>(url: string): FetchState<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLodaing] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLodaing(true);
        const response = await fetch(url);
        const result = await response.json();
        setData(result);
      } catch (err) {
        console.error('Ошибка получения данных:', err);
      } finally {
        setLodaing(false);
      }
    };
    fetchData();
  }, [url]);
  return { data, loading };
};
export default useFetch;

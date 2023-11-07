import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { v1 as uuid } from 'uuid';
import useLocalStorageState from './useLocalStorage';

const useAxios = (keyInLS, url, formattingFunction) => {
  const [responses, setResponses] = useLocalStorageState(keyInLS,[]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async (endpoint="") => {
    try {
      console.log(endpoint)
      const res = await axios.get(`${url}${endpoint}`);
      console.log(res.data)

      setResponses((prevResponses) => ([
        ...prevResponses,
        formattingFunction(res.data)
      ]));
      setIsLoading(false); // Set loading to false when the request is complete.
    } catch (error) {
      setError(error);
      setIsLoading(false); // Set loading to false in case of an error.
    }
  };

  const clearData = () => {
    setResponses([])
  }

//   useEffect(() => {
//     fetchData(url); // Call fetchData when the component mounts.
//   }, [url]);

  return [responses, fetchData, clearData];
};

export default useAxios;

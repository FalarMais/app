import { useState, useEffect } from "react";
import { ApiClient } from "../services/ApiClient";

const useApiRequestEffect = (url, data = null) => {
  const {
    response,
    setResponse,
    isLoading,
    error,
    setError,
    setIsLoading
  } = useApiRequest();

  const refetch = async novaUrl => {
    try {
      setIsLoading(true);
      setError(null);

      const apiClient = new ApiClient();
      const req = await apiClient.get(novaUrl ? novaUrl : url);

      console.log(req);
      setResponse(req);
    } catch (err) {
      console.log(err);
      setError(err);
    }

    setIsLoading(false);
  };
  useEffect(() => {
    refetch();
    //eslint-disable-next-line
  }, []);
  return { response, setResponse, isLoading, error, refetch };
};

const useApiRequest = (method, url, data = null) => {
  const [response, setResponse] = useState({
    status: 0,
    content: null,
    message: null,
    error: undefined
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const doRequest = async (tipo, url, data) => {
    setIsLoading(true);
    setError(null);

    const apiClient = new ApiClient();
    var response;
    try {
      switch (tipo) {
        case "get":
          response = await apiClient.get(url);
          break;
        case "post":
          response = await apiClient.post(url, data);
          break;
        case "put":
          response = await apiClient.put(url, data);
          break;
        case "delete":
          response = await apiClient.delete(url);
          break;
        default:
          throw new Error(`Método HTTP inválido: ${tipo}`);
      }
    } catch (err) {
      console.log("deu erro");
    }

    setResponse(response);
    setIsLoading(false);

    return response;
  };

  return {
    doRequest,
    response,
    setResponse,
    isLoading,
    setIsLoading,
    error,
    setError
  };
};

export { useApiRequest, useApiRequestEffect };

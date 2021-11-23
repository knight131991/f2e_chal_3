import { useCallback, useState } from "react";

export default function useApiAdapter(defaultData) {
  const [isLoading, setIsLoading] = useState();
  const [data, setData] = useState(defaultData);

  const apiAdapter = useCallback(
    ({ api, onSuccess = () => {}, mapper = (resp) => resp.data }) => {
      setIsLoading(true);
      api
        .then((resp) => {
          const data = mapper ? mapper(resp) : resp;
          setIsLoading(false);
          setData(data);
          onSuccess(data);
        })
        .catch((err) => {
          setIsLoading(false);
          console.error(err);
        });
    },
    []
  );

  return { apiAdapter, data, isLoading };
}

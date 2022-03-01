import { useEffect, useState } from 'react';
import { responseProps, requestParamsProps } from '../utils/InterfaceSet';
import { HttpUtil } from '../utils';

export default function useFetch(args: requestParamsProps) {
  const [requestParams, setRequestParams] = useState(args);
  const [response, setResponse] = useState<responseProps>();

  useEffect(() => {
    const getData = async () => {
      const res = await HttpUtil.requestApi(requestParams);
      const { msg, data } = res;

      if (!!msg) return;

      setResponse(data);
    };
    getData();
  }, [requestParams]);

  function onApiRequest(params: requestParamsProps) {
    setRequestParams(params);
  }

  return { response, onApiRequest };
}

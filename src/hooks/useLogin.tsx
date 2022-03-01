import { useEffect, useState } from 'react';
import { userInfoProps } from '../utils/InterfaceSet';
import { HttpUtil } from '../utils';
import { PARAMS_USERS_URL } from 'constants/constants';

export default function useLogin(id: string) {
  const userInfoParam = {
    url: PARAMS_USERS_URL,
    method: 'GET',
    params: { userId: id },
  };
  const [response, setResponse] = useState<userInfoProps>();

  useEffect(() => {
    const getData = async () => {
      const res = await HttpUtil.requestApi(userInfoParam);
      const { msg, data } = res;

      if (!!msg) return;

      setResponse(data);
    };
    getData();
  }, [id]);

  return { response };
}

// export default function ogin(id: string, password: string): boolean {
//   const END_POINT = 'http://localhost:4000/users';
//   let a = true;
//   axios.get(`${END_POINT}?id=${id}&password=${password}`).then((res) => {
//     a = !!res.data.length;
//   });
//   return a;
// }

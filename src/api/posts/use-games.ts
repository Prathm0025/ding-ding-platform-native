import type { AxiosError } from 'axios';
import { createQuery } from 'react-query-kit';

import { client } from '../common';
import type { Post } from './types';
// import { ClientEnv } from 'env';

type Response = Post[];
type Variables = void; // as react-query-kit is strongly typed, we need to specify the type of the variables as void in case we don't need them

export const useGames = createQuery<Response, Variables, AxiosError>({
  queryKey: ['games'],
  fetcher: () => {
    return client.get(`api/games?platform=dingding&category=all`).then((response) => response.data.others);

    // const response = await api.get(`/api/games?platform=${config.platform}&category=${category}`);
    // console.log(response);

    // const data = response.data;
    // console.log("data", data);
  },
});

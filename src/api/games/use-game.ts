import type { AxiosError } from 'axios';
import { createQuery } from 'react-query-kit';

import { client } from '../common';

type Response = any;
type Variables = { slug: string; token: string }; // as react-query-kit is strongly typed, we need to specify the type of the variables as void in case we don't need them

export const useGame = createQuery<Response, Variables, AxiosError>({
  queryKey: ['gameUrl'],
  fetcher: (variable) => {
    return client
      .get(`api/games/${variable.slug}`)
      .then((response) => response.data);
  },
});

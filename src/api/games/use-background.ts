import type { AxiosError } from 'axios';
import { createQuery } from 'react-query-kit';

import { client } from '../common';

type Response = any;
type Variables = { isBack: boolean };

export const useBackground = createQuery<Response, Variables, AxiosError>({
  queryKey: ['background'],
  fetcher: (variable) => {
    return client
      .post(`api/app/background`, {
        body: {
          isBack: variable.isBack,
        },
      })
      .then((response) => response.data);
  },
});

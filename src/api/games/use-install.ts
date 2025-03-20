import type { AxiosError } from 'axios';
import { createQuery } from 'react-query-kit';

import { client } from '../common';

type Response = any;

export const useInstall = createQuery<Response, AxiosError>({
  queryKey: ['installCount'],
  fetcher: () => {
    return client.post(`api/app/install`).then((response) => response.data);
  },
});

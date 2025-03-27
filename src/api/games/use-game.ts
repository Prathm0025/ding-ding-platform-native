// import { useSocket } from '@/lib/socket/socket';
// import { Events } from '@/lib/utils/events';
// import { createQuery } from 'react-query-kit';

// type Response = { url?: string; message?: string };
// type Variables = { slug: string };

// export const useGame = createQuery<Response, Variables>({
//   queryKey: ['gameUrl'],
//   fetcher: (variables) => {
//     return new Promise((resolve, reject) => {
//       console.log("I am here for URL");

//       const { socket, status } = useSocket();
// console.log(status);

//       if (!socket || status !== 'connected') {

//         return reject(new Error('Socket not connected'));
//       }

//       socket.emit(Events.PLAYGROUND_GAME_URL, { slug: variables.slug }, (res: any) => {
//         console.log("I am here for URL 45");

//         if (res.success) {
//           resolve({ url: res.data.url });
//         } else {
//           reject(new Error(res.message));
//         }
//       });
//     });
//   },
// });

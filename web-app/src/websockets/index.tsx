import { io, Socket } from 'socket.io-client';
import { AppDispatch } from '../store';
let dispatch: AppDispatch;
export let socket: Socket;
export const runSocket = () => {
  socket = io('http://localhost:8080', {
    reconnectionDelay: 1000,
    reconnection: true,
    transports: ['websocket'],
    agent: false,
    upgrade: false,
    rejectUnauthorized: false,
  });
  //   console.log('emituje');
  //   socket.emit('connect to chat', { chatId: '1234' });
  //   socket.emit('send message', {
  //     chatId: '1234',
  //     message: 'siemaaaa',
  //     authorId: localStorage.getItem('userId'),
  //   });
};

export const setDispatch = (disptachObj: AppDispatch) => {
  dispatch = disptachObj;
};

export const runListener = (listener: Function) => {
  listener(socket, dispatch);
};

export const runEmitter = (eventName: string, data: Object) => {
  socket.emit(eventName, data);
};

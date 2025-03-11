/* eslint-disable max-lines-per-function */
import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { io, type Socket } from 'socket.io-client';

import { useAuth } from '../auth';
interface SocketContextType {
  socket: Socket | null;
  status: 'idle' | 'connected' | 'disconnected' | 'error';
  emit: (event: string, data?: any) => void;
  disconnect: () => void;
}

const SocketContext = createContext<SocketContextType | undefined>(undefined);

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const token = useAuth.use.token();
  const platformId = useAuth.use.platformId();
  const [status, setStatus] = useState<
    'idle' | 'connected' | 'disconnected' | 'error'
  >('idle');
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    if (!token || !platformId) {
      console.warn(
        '[WebSocket] Authentication missing, skipping connection...'
      );
      return;
    }

    console.log('[WebSocket] Connecting...');
    const newSocket = io('https://gl9r1h24-5001.inc1.devtunnels.ms/', {
      auth: { token, origin: platformId },
      transports: ['websocket'],
      reconnection: false,
    });

    newSocket.on('connect', () => {
      console.log('[WebSocket] Connected!');
      setStatus('connected');
    });

    newSocket.on('disconnect', (reason) => {
      console.warn(`[WebSocket] Disconnected: ${reason}`);
      setStatus('disconnected');
    });

    newSocket.on('connect_error', (error) => {
      console.error('[WebSocket] Connection error:', error);
      setStatus('error');
    });

    socketRef.current = newSocket;

    return () => {
      console.log('[WebSocket] Cleaning up...');
      newSocket.disconnect();
      setStatus('disconnected');
    };
  }, [token, platformId]);

  const disconnectSocket = () => {
    if (socketRef.current) {
      console.log('[WebSocket] Disconnecting socket due to logout...');
      socketRef.current.disconnect();
      setStatus('disconnected');
    }
  };

  return (
    <SocketContext.Provider
      value={{
        socket: socketRef.current,
        status,
        emit: (event, data) => socketRef.current?.emit(event, data),
        disconnect: disconnectSocket,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return context;
};

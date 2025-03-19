/* eslint-disable max-lines-per-function */
import { Env } from '@env';
import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { showMessage } from 'react-native-flash-message';
import { io, type Socket } from 'socket.io-client';

import { useAuth } from '../auth';
interface SocketContextType {
  socket: Socket | null;
  status: 'idle' | 'connected' | 'disconnected' | 'error';
  data: any | null;
  emit: (event: string, data?: any) => void;
  disconnect: () => void;
  emitAlert: (message: string) => void;
}

const SocketContext = createContext<SocketContextType | undefined>(undefined);

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const token = useAuth.use.token();
  const platformId = useAuth.use.platformId();
  const [data, setData] = useState<any>(null);
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
    const newSocket = io(`${Env.API_URL}`, {
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

    newSocket.on('data', (eventData) => {
      setData(eventData);
    });

    newSocket.on('alert', (message) => {
      console.log('ALERT RECEIVED:', message);
      showMessage({
        message: 'Alert',
        description: message,
        type: 'warning', // Can be 'success', 'danger', 'info'
        icon: 'auto',
        duration: 3000, // Auto-dismiss after 3 seconds
      });
    });

    socketRef.current = newSocket;

    return () => {
      console.log('[WebSocket] Cleaning up...');
      newSocket.disconnect();
      setStatus('disconnected');
    };
  }, []);

  const disconnectSocket = () => {
    if (socketRef.current) {
      console.log('[WebSocket] Disconnecting socket due to logout...');
      socketRef.current.disconnect();
      setStatus('disconnected');
    }
  };

  const emitAlert = (message: string) => {
    showMessage({
      message: 'Alert',
      description: message,
      type: 'warning',
      icon: 'auto',
      duration: 3000,
    });
  };

  return (
    <SocketContext.Provider
      value={{
        socket: socketRef.current,
        status,
        data,
        emit: (event, payload) => socketRef.current?.emit(event, payload),
        disconnect: disconnectSocket,
        emitAlert, // ✅ Expose emitAlert to be used anywhere in the app
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

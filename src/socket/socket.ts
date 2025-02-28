import { io, Socket } from "socket.io-client";
import { getAuthToken, getPlatformId } from "../api/auth";

const SOCKET_URL = "http://10.0.2.2:5002"; 

let socket: Socket | null = null;
let isConnecting = false;

/**
 * Connects to the WebSocket server if not already connected.
 */
export const connectSocket =async () => {
  if (!socket && !isConnecting) {
    isConnecting = true;
   const token =await getAuthToken()
   const platformId = await getPlatformId();
    console.log(platformId, "platform");
    

    socket = io(SOCKET_URL, {
      auth:{token, origin:platformId},  
      transports: ["websocket"],
      reconnection: true, 
      reconnectionAttempts: 5, 
      reconnectionDelay: 2000, 
    });

    socket.on("connect", () => {
      console.log(" [WebSocket] Connected to server");
      isConnecting = false;
    });

    socket.on("disconnect", (reason) => {
      console.warn(` [WebSocket] Disconnected: ${reason}`);
      isConnecting = false;
    });

    socket.on("connect_error", (error) => {
      console.error(`[WebSocket] Connection error:`, error);
      isConnecting = false;
    });

    socket.on("reconnect_attempt", (attempt) => {
      console.log(`[WebSocket] Reconnection attempt #${attempt}`);
    });

    socket.on("message", (data) => {
      console.log("[WebSocket] Message received:", data);
    });
  }
};

/**
 * Disconnects the WebSocket connection safely.
 */
export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
    console.log("🔌 [WebSocket] Connection closed.");
  }
};

/**
 * Returns the active WebSocket instance.
 */
export const getSocket = (): Socket | null => {
  return socket;
};

/**
 * Subscribes to a WebSocket event.
 */
export const subscribeToEvent = (event: string, callback: (data: any) => void) => {
  if (socket) {
    socket.on(event, callback);
  } else {
    console.warn(`[WebSocket] Cannot subscribe, socket not connected.`);
  }
};

/**
 * Unsubscribes from a WebSocket event.
 */
export const unsubscribeFromEvent = (event: string) => {
  if (socket) {
    socket.off(event);
  }
};

/**
 * Emits an event to the WebSocket server.
 */
export const emitEvent = (event: string, data: any) => {
  if (socket) {
    socket.emit(event, data);
  } else {
    console.warn(`[WebSocket] Cannot emit, socket not connected.`);
  }
};

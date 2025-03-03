import { useEffect, useState } from "react";
import { connectSocket, disconnectSocket, getSocket, subscribeToEvent, unsubscribeFromEvent } from "../socket";
import { Socket } from "socket.io-client";

export default function useSocket(): Socket | null {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    connectSocket();
    setSocket(getSocket());

    const handleNewMessage = (message: any) => {
      console.log("New message:", message);
    };

    subscribeToEvent("newMessage", handleNewMessage);

    return () => {
      unsubscribeFromEvent("newMessage");
      disconnectSocket();
    };
  }, []);

  return socket;
}

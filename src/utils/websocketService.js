// 文件路径: src/utils/websocketService.js

import { useState, useEffect, useRef } from 'react';

function useWebSocket(url, onMessage) {
  const ws = useRef(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    ws.current = new WebSocket(url);

    ws.current.onopen = () => {
      console.log('WebSocket connected');
      setIsConnected(true);
    };

    ws.current.onmessage = (event) => {
      console.log('Received message piece:', event.data);
      if (onMessage) {
        onMessage(event.data);
      }
    };

    ws.current.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    ws.current.onclose = () => {
      console.log('WebSocket disconnected');
      setIsConnected(false);
    };

    return () => {
      ws.current.close();
    };
  }, [url, onMessage]);

  const sendMessage = (message) => {
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      ws.current.send(message);
    }
  };

  return { sendMessage, isConnected };
}

export default useWebSocket;

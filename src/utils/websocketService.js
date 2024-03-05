import { useState, useEffect, useCallback } from 'react';

// url为WebSocket服务器地址，onMessage是接收消息时的回调函数
function useWebSocket(url, onMessage) {
  const [ws, setWs] = useState(null);

  useEffect(() => {
    // 创建WebSocket连接
    const websocket = new WebSocket(url);
    setWs(websocket);

    // 当WebSocket连接打开时执行的操作
    websocket.onopen = () => {
      console.log('WebSocket connected');
    };

    // 接收到消息时执行的操作
    websocket.onmessage = (event) => {
      if (typeof onMessage === 'function') {
        onMessage(event);
      }
    };

    // 出错时执行的操作
    websocket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    // 组件卸载时关闭WebSocket连接
    return () => {
      websocket.close();
    };
  }, [url, onMessage]);

  // 发送消息的函数
  const sendMessage = useCallback((message) => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify(message));
    }
  }, [ws]);

  return [sendMessage];
}

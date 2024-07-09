// 文件路径: src/utils/websocketService.js

import axios from 'axios';
import { useEffect, useRef, useState } from 'react';

function useWebSocket(ws_url, http_url, onMessage) {
  const ws = useRef(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    ws.current = new WebSocket(ws_url);

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
  }, [ws_url, onMessage]);

  const sendMessage = (message) => {
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      ws.current.send(message);
    }
  };

  const [uploadMessage, setUploadMessage] = useState('');

  const sendFiles = (files) => {
    if (!files) return;
    console.log('Sending file:', files);
    const formData = new FormData();

    for (let i = 0; i < files.length; i++) {
        formData.append('files', files[i]);
    }

    axios.post(http_url+'/api/upload', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }).then(response => {
        setUploadMessage(response.data);
        console.log("response.data",response.data);
    }).catch(error => {
        setUploadMessage('Failed to upload files');
    }).finally(() => {
        console.log('setUploadMessage: ');
        console.log(uploadMessage);
    });
  };

  return { sendMessage,sendFiles, isConnected };
}

export default useWebSocket;

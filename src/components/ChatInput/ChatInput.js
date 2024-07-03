import React, { useState, useCallback } from 'react';
import './ChatInput.css'; // 确保CSS文件的路径正确
import useWebSocket from '../../utils/websocketService'; // 引入自定义的useWebSocket Hook

const ChatInput = ({ messages, pageName, displaySentmessage, onReceiveMessage }) => {
  console.log("ChatInput", pageName)
  const [inputValue, setInputValue] = useState('');

  const { sendMessage,sendFile, isConnected } = useWebSocket('ws://10.82.77.104:8081', onReceiveMessage);

  const handleSendMessage = () => {
    const newMessage = { text: inputValue, type: 'sent', page: pageName }
    const messageString = JSON.stringify([...messages, newMessage]);
    sendMessage(messageString);
    displaySentmessage(newMessage);
    setInputValue(''); // 清空输入框
  };

  const handleKeyDown = (event) => {
    // 检查是否同时按下了Ctrl键和回车键
    if (event.metaKey && event.key === 'Enter') {
      handleSendMessage();
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      sendFile(file);
    }
  };


  return (
    <>
      <div className="websocket-status">
        {isConnected ? '✔️ 已连接到服务器' : '❌ 与服务器连接断开'}
      </div>
      <div className="chat-input">
        <textarea
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="请输入......"
          onKeyDown={handleKeyDown}
        ></textarea>
        <button onClick={() => handleSendMessage()} disabled={!isConnected}>发送</button>
        <label className="file-upload-btn">
          <i className="fas fa-paperclip"></i> {/* 使用Font Awesome图标 */}
          <input
            type="file"
            onChange={handleFileUpload}
            style={{ display: 'none' }} // 完全隐藏
          />
        </label>
      </div>
    </>
  );
};

export default ChatInput;

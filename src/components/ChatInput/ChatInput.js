import React, { useState } from 'react';
import useWebSocket from '../../utils/websocketService'; // 引入自定义的useWebSocket Hook
import './ChatInput.css'; // 确保CSS文件的路径正确
import { sendFiles } from '../../utils/httpApi';

const ChatInput = ({ messages, pageName, displaySentmessage, onReceiveMessage }) => {
  console.log("ChatInput", pageName)
  const [inputValue, setInputValue] = useState('');

  const { sendMessage, isConnected } = useWebSocket('ws://localhost:8081', onReceiveMessage);

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
    // console.log("event.target.files",event.target.files)
    const files = event.target.files;
    if (files) {
      sendFiles(files, "http://localhost:9110");
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
            type="file" multiple={true}
            onChange={handleFileUpload}
            style={{ display: 'none' }} // 完全隐藏
          />
        </label>
      </div>
    </>
  );
};

export default ChatInput;

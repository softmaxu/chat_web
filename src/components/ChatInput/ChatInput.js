import React, { useState } from 'react';
import './ChatInput.css'; // 确保CSS文件的路径正确

const ChatInput = ({ onSendMessage, onFileUpload }) => {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  const handleFileChange = (event) => {
    if (event.target.files.length > 0) {
      onFileUpload(event.target.files[0]);
    }
  };

  return (
<div className="chat-input">
  <textarea
    value={message}
    onChange={(e) => setMessage(e.target.value)}
    placeholder="Type a message..."
  ></textarea>
  <button onClick={handleSend}>Send</button>
  <label className="file-upload-btn">
    <i className="fas fa-paperclip"></i> {/* 使用Font Awesome图标 */}
    <input
      type="file"
      onChange={handleFileChange}
      style={{ display: 'none' }} // 完全隐藏
    />
  </label>
</div>


  );
};

export default ChatInput;

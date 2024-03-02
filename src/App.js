import React, { useState } from 'react';
import './App.css'; // 确保引入了相应的CSS文件
import ChatList from './components/Sidebar/ChatList';
import ChatWindow from './components/Chat/ChatWindow';
import ChatInput from './components/ChatInput/ChatInput';

function App() {
  // 状态初始化
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [chats, setChats] = useState([
    { id: '1', name: 'Chat 1' },
    { id: '2', name: 'Chat 2' }
  ]);
  const [currentChat, setCurrentChat] = useState('1');
  const [messages, setMessages] = useState([
    { text: 'Hello there!' },
    { text: 'General Kenobi!' }
  ]);

  // 方法定义
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleChatSelect = (chatId) => {
    setCurrentChat(chatId);
    // 更新消息逻辑
  };

  const handleSendMessage = (message) => {
    setMessages([...messages, { text: message }]);
    // 发送消息逻辑
  };

  const handleFileUpload = (file) => {
    console.log(file);
    // 文件上传逻辑
  };

  // 组件渲染
  return (
    <div className="App">
      <div className={`sidebar ${isSidebarOpen ? '' : 'sidebar-collapsed'}`}>
        <ChatList chats={chats} onChatSelect={handleChatSelect} />
        <div className="toggle-btn" onClick={toggleSidebar}></div>
      </div>
      <div className="main-content">
        <div className="chat-window">
          <ChatWindow messages={messages} />
        </div>
        <div>
          <ChatInput onSendMessage={handleSendMessage} onFileUpload={handleFileUpload} />
        </div>
      </div>
    </div>
  );
}

export default App;
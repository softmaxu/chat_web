import React, { useState, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css'; // 确保引入了相应的CSS文件
import SideList from './components/Sidebar/SideList';
import ChatWindow from './components/ChatPage/ChatWindow';
import ChatInput from './components/ChatInput/ChatInput';
import KnowledgeChat from './components/KbPage/KnowledgeChat';
import useWebSocket from './utils/websocketService';

function App() {
  // 状态初始化
  const [messages, setMessages] = useState([
    { text: 'Hello there!' ,type: 'sent'},
    { text: 'General Kenobi!' ,type: 'received'}
  ]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [pages, setPages] = useState([
    { id: '1', name: '聊天对话', path: '/', Component: ChatWindow },
    { id: '2', name: '知识库问答', path: '/xx', Component: KnowledgeChat }
  ]);
  const [currentPage, setCurrentPage] = useState('1');

  // 方法定义
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handlePageSelect = (pageId) => {
    setCurrentPage(pageId);
    // 更新消息逻辑
  };

  const handleSendMessage = useCallback((event) => {
    console.log(event);
    const message = { text: event, type: 'sent'}
    setMessages((prevMessages) => [...prevMessages, message]);
  }, []);

  const handleFileUpload = (file) => {
    console.log(file);
    // 文件上传逻辑
  };

  // 组件渲染
  return (
    <Router>
      <div className="App">
        <div className={`sidebar ${isSidebarOpen ? '' : 'sidebar-collapsed'}`}>
          <SideList pages={pages} />
          <Routes>
            {pages.map((page) => (
              <Route to={page.path} />
            ))}
          </Routes>
          <div className="toggle-btn" onClick={toggleSidebar}></div>
        </div>
        <div className="main-content">
          <Routes>
            {pages.map((page) => (
              <Route
              className="chat-window"
                key={page.id}
                path={page.path}
                element={<page.Component messages={messages} />}
              />
            ))}
          </Routes>
          <div>
            <ChatInput onSendMessage={handleSendMessage} onFileUpload={handleFileUpload} />
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
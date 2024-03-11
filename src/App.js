import React, { useState, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css'; // 确保引入了相应的CSS文件
import SideList from './components/Sidebar/SideList';
import ChatWindow from './components/ChatPage/ChatWindow';
import ChatInput from './components/ChatInput/ChatInput';
import KnowledgeChat from './components/KbPage/KnowledgeChat';
import useWebSocket from './utils/websocketService'; // 引入自定义的useWebSocket Hook

function App() {
  // 状态初始化
  const [messages, setMessages] = useState([
    { text: '你是一个模具专业的AI大模型，请按照要求回答用户的提问。' ,type: 'sent'},
    { text: '好的。请问我可以提供什么帮助？' ,type: 'received'}
  ]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [pages, setPages] = useState([
    { id: '1', name: '聊天对话', path: '/', Component: ChatWindow },
    { id: '2', name: '知识库问答', path: '/xx', Component: KnowledgeChat }
  ]);
  const [currentPage, setCurrentPage] = useState('1');

  const displaySentmessage = (message) => { 
    setMessages((prevMessages) => [...prevMessages, message]);
    return messages;
  }



  const handleNewMessage = useCallback((message) => {
    const messageObj = JSON.parse(message);
    console.log("handleNewMessage",message)
    const messageWithType = {
      ...messageObj, // 展开原始消息对象
      type: 'received', // 添加type字段
    };
    console.log('New message:', messageWithType);
    setMessages((prevMessages) => [...prevMessages, messageWithType]);
  }, []);

  // 方法定义
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handlePageSelect = (pageId) => {
    setCurrentPage(pageId);
    // 更新消息逻辑
  };

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
            <ChatInput messages={messages} displaySentmessage={displaySentmessage} onReceiveMessage={handleNewMessage} onFileUpload={handleFileUpload} />
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
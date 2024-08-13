import React, { useCallback, useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css'; // 确保引入了相应的CSS文件
import ChatInput from './components/ChatInput/ChatInput';
import ChatWindow from './components/ChatPage/ChatWindow';
import KnowledgeChat from './components/KbPage/KnowledgeChat';
import RagManager from './components/RagDbPage/RagManager';
import SideList from './components/Sidebar/SideList';

function App() {
  // 状态初始化
  const [messages, setMessages] = useState([
    { text: '你是一个液压行业的AI大模型，请按照要求回答用户的提问。', type: 'sent' },
    { text: '好的。请问我可以提供什么帮助？', type: 'received' }
  ]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [pages, setPages] = useState([
    { id: '1', name: '聊天对话', path: '/', Component: ChatWindow },
    { id: '2', name: '知识库问答', path: '/kb', Component: KnowledgeChat },
    { id: '3', name: '知识库管理', path: '/db/rag', Component: RagManager }
  ]);
  const [currentPage, setCurrentPage] = useState('聊天对话');

  const displaySentmessage = (message) => {
    setMessages((prevMessages) => [...prevMessages, message]);
    return messages;
  }
  const handleNewMessage = useCallback((message) => {
    const messageObj = JSON.parse(message);
    console.debug("handleNewMessage", message)
    if (messageObj.operation==="syn"){
      const messageWithType = {
        ...messageObj, // 展开原始消息对象
        type: 'received', // 添加type字段
      };
      console.debug("messageWithType",messageWithType)
      setMessages((prevMessages) => [...prevMessages, messageWithType]);
    }else if(messageObj.operation==="ack"){}
    else{
      console.debug("messageObj.text",messageObj.text)
      setMessages(prevMessages => {
        if (prevMessages.length === 0) {
          return prevMessages;
        }
        // 深拷贝prevMessages数组，以避免直接修改状态
        const newMessages = [...prevMessages];
        // 取出最后一个消息对象
        const lastMessage = newMessages[newMessages.length - 1];
        // 假设你想拼接的字符串是newText
        const newText = messageObj.text;
        // 更新最后一个消息对象的text字段
        newMessages[newMessages.length - 1] = {
          ...lastMessage,
          text: lastMessage.text + newText,
        };
        return newMessages;
      });
      console.debug("messages[messages.length-1]", messages[messages.length-1]);
    }
  }, []);

  // 方法定义
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handlePageSelect = (pageName) => {
    setCurrentPage(pageName);
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
                element={<page.Component messages={messages} pagename={page.name}
                  onRouteChange={handlePageSelect} />}
              />
            ))
            }
          </Routes>
          <div>
            <ChatInput messages={messages} pageName={currentPage} displaySentmessage={displaySentmessage}
              onReceiveMessage={handleNewMessage} 
            />
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
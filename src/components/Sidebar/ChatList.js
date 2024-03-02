import React from 'react';
import './ChatList.css'; // 确保引入了相应的CSS文件

const ChatList = ({ chats, onChatSelect }) => {
    return (
      <div className="chat-list">
        {chats.map((chat) => (
          <div key={chat.id} onClick={() => onChatSelect(chat.id)} className="chat-item">
            {chat.name}
          </div>
        ))}
      </div>
    );
  };
  

export default ChatList;

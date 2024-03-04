import React from 'react';
import Message from '../Message/Message';

const ChatWindow = ({ messages }) => {
  return (
    <div className="chat-window">
      <div>聊天对话</div>
      <div>
        {messages.map((message, index) => (
          <Message key={index} text={message.text} />
        ))}
      </div>
    </div>
  );
};

export default ChatWindow;

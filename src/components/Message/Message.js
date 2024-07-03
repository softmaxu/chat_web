import React, { useEffect, useState } from 'react';
import "./Message.css";
import Markdown from 'react-markdown'

function Message({ text, type }) {
  // 根据消息类型选择CSS类
  const messageClass = type === 'sent' ? 'sent-message' : 'received-message';

  return (
      <Markdown className={`message ${messageClass}`}>
      {text}
      </Markdown>
  );
}

export default Message;

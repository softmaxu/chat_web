import React, { useEffect, useState } from 'react';
import "./Message.css";

function Message({ text, type }) {
  // 根据消息类型选择CSS类
  const messageClass = type === 'sent' ? 'sent-message' : 'received-message';

  return (
    <div className={`message ${messageClass}`}>
      {text}
    </div>
  );
}

export default Message;

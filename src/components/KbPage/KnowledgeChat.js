import React from 'react';
import Message from '../Message/Message';

const KnowledgeChat = ({ messages }) => {

    return (
        <div className="chat-window">
            <div>知识库问答</div>
            <div>
                {messages.map((message, index) => (
                    <Message key={index} text={message.text}  type={message.type}/>
                ))}
            </div>
        </div>
    );
};

export default KnowledgeChat;
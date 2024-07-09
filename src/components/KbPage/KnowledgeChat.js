import React, { useEffect } from 'react';
import Message from '../Message/Message';

const KnowledgeChat = ({ messages, pagename, onRouteChange }) => {
    useEffect(() => {
        onRouteChange(pagename);
    }, [pagename, onRouteChange]);
    return (
        <div className="chat-window">
            <div className='page-topbar'>HydraulicGPT: {pagename} 模式</div>
            <div>
                {messages.map((message, index) => (
                    <Message key={index} text={message.text} type={message.type} />
                ))}
            </div>
        </div>
    );
};

export default KnowledgeChat;
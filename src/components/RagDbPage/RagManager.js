import React, { useState } from 'react';
import CreateRagDb from './CreateRagDb';
import DropRagDb from './DropRagDb';
import './RagManager.css';
import SelectRagDb from './SelectRagDb';

const RagManager = () => {
  const [activeTab, setActiveTab] = useState('create');

  const renderComponent = () => {
    switch (activeTab) {
      case 'create':
        return <CreateRagDb />;
      case 'drop':
        return <DropRagDb />;
      case 'select':
        return <SelectRagDb />;
      default:
        return null;
    }
  };

  return (
    <div className="rag-manager">
      <h2>RAG 知识库管理</h2>
      <nav className="tabs">
        <button className={activeTab === 'create' ? 'active' : ''} onClick={() => setActiveTab('create')}>Create</button>
        <button className={activeTab === 'drop' ? 'active' : ''} onClick={() => setActiveTab('drop')}>Drop</button>
        <button className={activeTab === 'select' ? 'active' : ''} onClick={() => setActiveTab('select')}>Select</button>
      </nav>
      <div className="content">
        {renderComponent()}
      </div>
    </div>
  );
}

export default RagManager;

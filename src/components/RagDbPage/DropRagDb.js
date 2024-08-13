import React, { useState } from 'react';
import { dropKnowledgeBase } from '../../utils/httpApi';

const DropRagDb = () => {
  const [name, setName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dropKnowledgeBase(name);
    console.log(result);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Delete Knowledge Base</h2>
      <input 
        type="text" 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
        placeholder="输入要永久删除的知识库名称" 
        required 
      />
      <button type="submit">Delete</button>
    </form>
  );
};

export default DropRagDb;
import React, { useState } from 'react';
import { createKnowledgeBase, sendFiles } from '../../utils/httpApi';

const CreateRagDb = () => {
  const [name, setName] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [uploadStatus, setUploadStatus] = useState('');
  const [ragCreatedMsg, setRagCreatedMsg] = useState('');

  const handleFileUpload = (e) => {
    setUploadStatus('上传处理中，请等待');

    try {
      sendFiles(e.target.files, "http://localhost:9110").then(result => {
      console.log("result", result);
      setUploadedFiles(result.files); // 假设返回的数据中包含文件名数组
      setUploadStatus('处理完成');
      });
    } catch (error) {
      console.error(error);
      setUploadStatus('上传失败');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (uploadedFiles.length === 0) {
      alert('请先上传文件');
      return;
    }

    const result = await createKnowledgeBase({ name, files: uploadedFiles });
    setRagCreatedMsg(result.msg);
    console.log(result);
  };

  return (
    <div>
      <h2>上传文件</h2>
      <input 
        type="file" 
        multiple 
        onChange={handleFileUpload} 
      />
      <p>{uploadStatus}</p>
      
      <form onSubmit={handleSubmit}>
        <h2>创建知识库</h2>
        <input 
          type="text" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          placeholder="为知识库设置一个名字" 
          required 
        />
        <button type="submit">确认</button>
        <div>{ragCreatedMsg}</div>
      </form>
    </div>
  );
};

export default CreateRagDb;

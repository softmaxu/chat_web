import axios from 'axios';
const BASE_URL = 'http://localhost:5000'; // 替换为实际API端点

export const createKnowledgeBase = async (data) => {
  const response = await fetch(`${BASE_URL}/rag/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  return response.json();
};

export const dropKnowledgeBase = async (name) => {
  const response = await fetch(`${BASE_URL}/rag/drop/${name}`, {
    method: 'DELETE'
  });
  return response.json();
};

export const selectKnowledgeBases = async (data) => {
  const query = new URLSearchParams(data).toString();
  const response = await fetch(`${BASE_URL}/rag/select?${query}`, {
    method: "GET",
    headers: {
      'Content-Type': 'application/json'
    }
  });
  return response.json();
};

export const sendFiles = (files, http_url) => {
  if (!files) return;
  console.log('Sending file:', files);
  const formData = new FormData();

  for (let i = 0; i < files.length; i++) {
    formData.append('files', files[i]);
  }
  return axios.post(http_url + '/api/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }).then(response => {
    // console.log("response.data", response.data);
    return response.data;
  }).catch(error => {
  }).finally(() => {
  });
};
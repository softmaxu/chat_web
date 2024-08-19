import React, { useState, useEffect } from 'react';
import { selectKnowledgeBases, fetchDbNames } from "../../utils/httpApi";
import "./SelectRagDb.css";

const SelectRagDb = () => {
  const [select, setSelect] = useState('');
  const [limit, setLimit] = useState(50);
  const [dbname, setDbname] = useState(localStorage.getItem('selectedDbName') || '');
  const [results, setResults] = useState([]);
  const [dbOptions, setDbOptions] = useState([]);

  // 使用fetchDbNames函数获取可用的数据库名称
  useEffect(() => {
    const loadDbNames = async () => {
      try {
        const data = await fetchDbNames();
        setDbOptions(data);
      } catch (error) {
        console.error('Error loading db names:', error);
      }
    };
    loadDbNames();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const data = await selectKnowledgeBases({ "db_name": dbname, "keyword": select, "limit": limit });
      setResults(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleDbChange = (e) => {
    const selectedDb = e.target.value;
    setDbname(selectedDb);
    localStorage.setItem('selectedDbName', selectedDb); // 持久化存储选中的db_name
  };

  return (
    <div>
      <h2>Select Knowledge Base</h2>
      <form onSubmit={handleSearch}>
        <div>
          <label>db_name:</label>
          <select value={dbname} onChange={handleDbChange} required>
            <option value="" disabled>Select a Knowledge Base</option>
            {dbOptions.map((db, index) => (
              <option key={index} value={db}>{db}</option>
            ))}
          </select>
        </div>
        <div>
          <label>select:</label>
          <input
            type="text"
            value={select}
            onChange={(e) => setSelect(e.target.value)}
            placeholder="输入关键词"
          />
        </div>
        <div>
          <label>Limit:</label>
          <input
            type="number"
            value={limit}
            onChange={(e) => setLimit(e.target.value)}
            placeholder="数量"
            required
          />
        </div>
        <button type="submit">Search</button>
      </form>
      <h3>Results</h3>
      <div className="results-table">
        <div className="table-header">
          <div>ID</div>
          <div>Metadata Source</div>
          <div>Document Content</div>
        </div>
        {results.ids && results.ids.map((id, index) => (
          <div className="table-row" key={id}>
            <div>{id}</div>
            <div>{results.metadatas[index].source}</div>
            <div>{results.documents[index]}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelectRagDb;

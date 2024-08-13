import React, { useState } from 'react';
import { selectKnowledgeBases } from "../../utils/httpApi";

const SelectRagDb = () => {
  const [select, setSelect] = useState('');
  const [limit, setLimit] = useState(50);
  const [dbname, setDbname] = useState('')
  const [results, setResults] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const data = await selectKnowledgeBases({"db_name":dbname,"keyword": select, "limit":limit});
      setResults(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div>
      <h2>select Knowledge Base</h2>
      <form onSubmit={handleSearch}>
      <div>
          <label>db_name:</label>
          <input
            type="text"
            value={dbname}
            onChange={(e) => setDbname(e.target.value)}
            placeholder="知识库名称"
          />
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
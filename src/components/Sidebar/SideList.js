import React from 'react';
import { Link } from 'react-router-dom';
import './SideList.css'; // 确保引入了相应的CSS文件

const SideList = ({ pages: pages }) => {
    return (
      <ul className='page-list'>
      {pages.map((page) => (
        <li key={page.id}>
          <Link className='side-item' to={page.path}>
            {page.name}
          </Link>
        </li>
      ))}
    </ul>
    );
  };
  

export default SideList;

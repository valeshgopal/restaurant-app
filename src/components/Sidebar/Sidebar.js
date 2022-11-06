import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './sidebar.css';

const Sidebar = () => {
  const [active, setActive] = useState(false);
  return (
    <div className='sidebar'>
      <Link
        to='/'
        className={`sidebar-link ${!active && 'active'}`}
        onClick={() => setActive(!active)}
      >
        Home
      </Link>
      <Link
        to='/bookmarks'
        className={`sidebar-link ${active && 'active'}`}
        onClick={() => setActive(!active)}
      >
        Bookmarks
      </Link>
    </div>
  );
};

export default Sidebar;

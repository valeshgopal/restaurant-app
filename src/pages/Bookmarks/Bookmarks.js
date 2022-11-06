import React, { useState } from 'react';
import './bookmarks.css';

const getLocalStorage = () => {
  const localStorageItems = localStorage.getItem('bookmarks');
  return localStorageItems ? JSON.parse(localStorageItems) : [];
};

const Bookmarks = () => {
  const [bookmarks, setBookmarks] = useState(getLocalStorage());
  return (
    <div className='bookmarks'>
      {bookmarks.map((bookmark) => {
        return (
          <div className='map-container' key={bookmark.mapId}>
            <iframe
              src={bookmark.map}
              style={{ width: '600px', height: '300px', margin: '20px 0' }}
            ></iframe>
          </div>
        );
      })}
    </div>
  );
};

export default Bookmarks;

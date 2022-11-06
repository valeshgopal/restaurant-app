import React, { useState, useEffect, useContext } from 'react';
import './home.css';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { getRecords } from '../../api/restaurants';
import { Checkbox } from '@mui/material';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import { BookmarkContext } from '../../App';

const getLocalStorage = () => {
  const localStorageItems = localStorage.getItem('maps');
  return localStorageItems ? JSON.parse(localStorageItems) : [];
};

const Home = ({ setAuth, bookmarks }) => {
  const [records, setRecords] = useState([]);
  const [restaurant, setRestaurant] = useState('');
  const [maps, setMaps] = useState(getLocalStorage());
  const bookmarkContext = useContext(BookmarkContext);
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await getRecords();
        setRecords(data);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  const restaurants = records.map((record) => {
    return record.fields.Name;
  });

  const [isChecked, setIsChecked] = React.useState(() =>
    maps.map((m) => false)
  );

  const isCheckboxChecked = (index, checked) => {
    setIsChecked((isChecked) => {
      return isChecked.map((c, i) => {
        if (i === index) return checked;
        return c;
      });
    });
  };

  const handleClick = (e) => {
    e.preventDefault();
    const map = `https://datastudio.google.com/embed/reporting/430242fa-4162-4950-a984-824b3b355b3c/page/dQMwC?params={"ds2.name2":"${restaurant}"}`;
    setMaps([...maps, { map, restaurant }]);
  };

  const handleDelete = (id) => {
    setMaps(
      maps.filter((map) => {
        return map.restaurant !== id;
      })
    );
  };

  useEffect(() => {
    localStorage.setItem('maps', JSON.stringify(maps));
  }, [maps]);

  const handleBookmark = (id, index) => {
    if (!isChecked[index]) {
      bookmarkContext.dispatch({
        type: 'ADD_BOOKMARK',
        payload: maps.find((map) => map.restaurant === id),
      });
    } else {
      bookmarkContext.dispatch({
        type: 'REMOVE_BOOKMARK',
        payload: maps.find((map) => map.restaurant === id),
      });
    }
  };

  return (
    <div className='home'>
      <a onClick={() => setAuth(false)} className='logout'>
        Logout
      </a>
      <form>
        <Autocomplete
          disablePortal
          id='combo-box-demo'
          options={restaurants}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label='Restaurant' />}
          onChange={(event, value) => setRestaurant(value)}
        />
        <button className='btn' onClick={handleClick}>
          Add
        </button>
      </form>
      {maps.map((map, index) => {
        return (
          <div className='map-container' key={map.restaurant}>
            <iframe
              src={map.map}
              style={{ width: '600px', height: '300px', margin: '20px 0' }}
            ></iframe>
            <div className='icons'>
              <Checkbox
                {...label}
                icon={<BookmarkBorderOutlinedIcon />}
                checkedIcon={<BookmarkIcon />}
                checked={isChecked[index]}
                onChange={(e) => {
                  isCheckboxChecked(index, e.target.checked);
                  handleBookmark(map.restaurant, index);
                  localStorage.setItem(
                    'bookmarks',
                    JSON.stringify([...bookmarks, map])
                  );
                  handleDelete(map.restaurant);
                }}
              />
              <DeleteIcon
                color='error'
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  handleDelete(map.restaurant);
                  localStorage.setItem(
                    'bookmarks',
                    JSON.stringify(
                      bookmarks.filter(
                        (bookmark) => bookmark.restaurant !== map.restaurant
                      )
                    )
                  );
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Home;

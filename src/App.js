import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Bookmarks from './pages/Bookmarks/Bookmarks';
import Sidebar from './components/Sidebar/Sidebar';
import Login from './pages/Login/Login';
import React, { useState, useReducer } from 'react';

export const BookmarkContext = React.createContext();

const initialState = [];
const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_BOOKMARK':
      return [...state, action.payload];
    case 'REMOVE_BOOKMARK':
      return state.filter((item) => item !== action.payload);
    default:
      return state;
  }
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [auth, setAuth] = useState(false);

  return (
    <div className='layout'>
      {!auth && <Login setAuth={setAuth} />}
      {auth && (
        <>
          <Sidebar />
          <BookmarkContext.Provider value={{ state, dispatch }}>
            <Routes>
              <Route
                exact
                path='/'
                element={<Home setAuth={setAuth} bookmarks={state} />}
              />
              <Route path='/bookmarks' element={<Bookmarks />} />
            </Routes>
          </BookmarkContext.Provider>
        </>
      )}
    </div>
  );
}

export default App;

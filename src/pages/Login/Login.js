import React, { useState, useEffect } from 'react';
import './login.css';
import { getRecords } from '../../api/credentials';
import Alert from '../../components/Alert/Alert';
// import { VisibilityIcon } from '@mui/icons-material';

const Login = ({ setAuth }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [alert, setAlert] = useState({ show: false, msg: '' });
  const [records, setRecords] = useState([]);
  const [type, setType] = useState(true);
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

  const showAlert = (show = false, msg = '') => {
    setAlert({ show, msg });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    records.map((record) => {
      if (
        record.fields.username === username &&
        record.fields.password === password
      ) {
        setAuth(true);
      } else {
        showAlert(true, 'Invalid username or password!');
      }
    });
    setUsername('');
    setPassword('');
  };

  return (
    <div className='login-wrapper'>
      <Alert
        {...alert}
        removeAlert={showAlert}
        username={username}
        password={password}
      />
      <div className='login'>
        <h3>Login</h3>
        <form className='login-form' onSubmit={handleSubmit}>
          <input
            type='text'
            placeholder='Enter username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <div className='pwd-field'>
            <input
              type={type === true ? 'password' : 'text'}
              placeholder='Enter password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <a className='pwd-icon' onClick={() => setType(!type)}>
              {type === true ? 'Show' : 'Hide'}
            </a>
          </div>
          <button type='submit'>Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;

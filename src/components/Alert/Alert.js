import React, { useEffect } from 'react';

const Alert = ({ msg, removeAlert, username, password }) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      removeAlert();
    }, 2000);
    return () => clearTimeout(timeout);
  }, [username, password]);

  return (
    <div>
      <p style={{ color: 'red', marginBottom: '10px' }}>{msg}</p>
    </div>
  );
};

export default Alert;

// Toast.js

import React from 'react';

const Toast = ({ message, type }) => {
  // Display a toast message based on type
  return (
    <div className={`toast ${type}`} role="alert" aria-live="assertive" aria-atomic="true">
      <div className="toast-body">
        {message}
      </div>
    </div>
  );
};

export default Toast;

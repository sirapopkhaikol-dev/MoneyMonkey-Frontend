import React from 'react';
import './LoginBlock.css';  // Make sure this file exists

const LoginBlock = ({ children }) => {
  return (
    <div className="login-block">
      <div className="login-content">
        {children}  {/* Content inside the box will be dynamically passed as children */}
      </div>
    </div>
  );
}

export default LoginBlock;
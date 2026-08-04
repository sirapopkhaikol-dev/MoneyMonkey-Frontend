import React from 'react';
import './CenteredBlock.css';  // Make sure this file exists

const CenteredBlock = ({ children }) => {
  return (
    <div className="centered-block">
      <div className="content">
        {children}  {/* Content inside the box will be dynamically passed as children */}
      </div>
    </div>
  );
}

export default CenteredBlock;

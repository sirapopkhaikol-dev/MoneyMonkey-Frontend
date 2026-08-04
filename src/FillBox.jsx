import React, { useState } from 'react';
import './FillBox.css';

const FillBox = ({ placeholder }) => {
    const [userInput, setUserInput] = useState('');

    const handleChange = (e) => {
        setUserInput(e.target.value);
    };

    return (
        <div className="fill-box">
            <input
                type="text"
                value={userInput}
                onChange={handleChange}
                placeholder={placeholder}  
                className="fill-input"
            />
        </div>
    );
};

export default FillBox;

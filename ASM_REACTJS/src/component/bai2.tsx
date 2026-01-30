import React from 'react';
import { useState } from 'react';
function Bai2() {
    const [count, setCount] = useState(0);

    const handleIncrement = () => {
      setCount(count + 1);
    };
  
    const handleReset = () => {
      setCount(0);
    };
  
    const handleDecrement = () => {
      setCount(count - 1);
    };

  return (
    <div className="bai1">
        <h1 className="titleb1">React Clicker</h1>
        <h2 className="countb1">{count}</h2>
        <div className='suKien'>
            <button onClick={handleIncrement} className='buttonb1 buttontang'>+</button>
            <button onClick={handleReset} className='buttonb1 buttonreset'><i className="bi bi-arrow-clockwise"></i></button>
            <button onClick={handleDecrement} className='buttonb1 buttongiam'>-</button>
        </div>
    </div>
  );
}

export default Bai2;
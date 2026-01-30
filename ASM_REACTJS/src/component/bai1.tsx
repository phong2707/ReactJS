import React from 'react';
function Bai1() {
  return (
    <div className="bai1">
        <h1 className="titleb1">React Clicker</h1>
        <h2 className="countb1">0</h2>
        <div className='suKien'>
            <button className='buttonb1 buttontang'>+</button>
            <button className='buttonb1 buttonreset'><i className="bi bi-arrow-clockwise"></i></button>
            <button className='buttonb1 buttongiam'>-</button>
        </div>
    </div>
  );
}

export default Bai1;
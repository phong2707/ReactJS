import React from 'react';


const music = [
  {
    name: "Em Cua Ngay Hom Qua",
    lyrics: "Eh eh eh. Em dang noi noi nao... Can you feel me. Can you feel me.",
    author: "Son Tung"
  },
  {
    name: "Nguoi Anh Em",
    lyrics: "Cuoc doi rong lon co bao la Lam sao san duoc hai ti anh em",
    author: "Nhac Hoa, Loi Viet: Manh Thang"
  }
];

function Bai3() {
  return (
    <div className="App">
      <h1>Danh Sách Nhạc</h1>
      <ul className="music-list">
        {music.map((song, index) => (
          <li key={index} className="song-item">
            <h3>{song.name}</h3>
            <p>Lyrics: {song.lyrics}</p>
            <p>Author: {song.author}</p>
          </li>
        ))}
      </ul>
      <div className="player">
        <h2 style={{textAlign: 'start', color: 'yellow'}}> {music[1].name}</h2>
        <p style={{textAlign: 'start'}}>Sáng tác: {music[1].lyrics}</p>
        <div className="player-controls">
          <button>⏸</button>
          <button><i className="fa-solid fa-forward-step"></i></button>
          <span>00:34 / 03:45</span>
          <button><i className="fa-solid fa-repeat"></i></button>
            <button><i className="fa-solid fa-shuffle"></i></button>
        <button><i className="fa-solid fa-volume-high"></i></button>
        </div>
      </div>
    </div>
  );
}

export default Bai3;
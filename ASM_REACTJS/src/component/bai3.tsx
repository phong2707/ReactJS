import React, { useState } from 'react';

interface Song {
  name: string;
  lyrics: string;
  author: string;
}

const music: Song[] = [
  {
    name: "Em Của Ngày Hôm Qua",
    lyrics: "Eh eh eh. Em dang noi noi nao... Can you feel me. Can you feel me.",
    author: "Sơn Tùng M-TP"
  },
  {
    name: "Người Anh Em",
    lyrics: "Cuộc đời rộng lớn có bao la. Làm sao sánh được hai từ anh em.",
    author: "Nhạc Hoa, Lời Việt: Mạnh Thắng"
  },
  {
    name: "Lạc Trôi",
    lyrics: "Người đi xa xăm phương trời nào... Chờ đợi ai trong cơn say này.",
    author: "Sơn Tùng M-TP"
  }
];

function Bai3() {
  // 1. Dùng useState để quản lý vị trí bài hát đang phát
  const [currentIndex, setCurrentIndex] = useState(0);

  // 2. Hàm xử lý khi nhấn Next
  const nextSong = () => {
    setCurrentIndex((prevIndex) => {
      // Nếu là bài cuối cùng thì quay lại bài đầu tiên (Loop)
      if (prevIndex === music.length - 1) {
        return 0;
      }
      return prevIndex + 1;
    });
  };
  const currentSong = music[currentIndex];

  return (
    <div className="App" style={{ padding: '20px', backgroundColor: '#282c34', color: 'white', minHeight: '100vh' }}>
      <h1>Danh Sách Nhạc</h1>
      
      <ul className="music-list" style={{ listStyle: 'none', padding: 0 }}>
        {music.map((song, index) => (
          <li 
            key={index} 
            className="song-item" 
            style={{ 
              padding: '10px', 
              borderBottom: '1px solid #444',
              backgroundColor: currentIndex === index ? '#3e4451' : 'transparent',
              cursor: 'pointer'
            }}
            onClick={() => setCurrentIndex(index)} // Nhấn vào list cũng đổi bài
          >
            <strong>{song.name}</strong> - {song.author}
          </li>
        ))}
      </ul>

      <div className="player" style={{ marginTop: '30px', padding: '20px', border: '2px solid yellow', borderRadius: '15px' }}>
        <h2 style={{ textAlign: 'start', color: 'yellow' }}>🎵 {currentSong.name}</h2>
        <p style={{ textAlign: 'start', fontStyle: 'italic' }}>Lời bài hát: {currentSong.lyrics}</p>
        <p style={{ textAlign: 'start', fontSize: '0.9rem' }}>Sáng tác: {currentSong.author}</p>
        
        <div className="player-controls" style={{ display: 'flex', alignItems: 'center', gap: '20px', marginTop: '20px' }}>
          <button style={{ fontSize: '20px', cursor: 'pointer' }}>⏸</button>
          
          {/* 3. Gán hàm nextSong vào sự kiện onClick */}
          <button onClick={nextSong} style={{ fontSize: '20px', cursor: 'pointer' }}>
            <i className="fa-solid fa-forward-step"></i>
          </button>
          
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
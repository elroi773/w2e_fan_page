import { useState, useEffect } from 'react';
import './App.css';

// 이미지는 실제 경로로 import 해주세요
import guitar from './img/index/guitar.png';
import mp3 from './img/index/mp3.png';
import tape from './img/index/tape.png';
import wavetoearth from './img/index/wavetoearth.png';

function App() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isCallActive, setIsCallActive] = useState(false);
  const [selectedSong, setSelectedSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const songs = [
    'My fav song list',
    'sunny days',
    'seasons',
    'calla',
    'love.',
    'bad',
    'pink'
  ];

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    // 자동으로 통화 시작
    const timer = setTimeout(() => {
      setIsCallActive(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const handleAcceptCall = () => {
    setIsPlaying(true);
  };

  const handleEndCall = () => {
    setIsCallActive(false);
    setIsPlaying(false);
  };

  const handleSongClick = (index) => {
    if (index === 0) return; // 제목은 클릭 불가
    setSelectedSong(index);
  };

  // 패럴랙스 효과 계산
  const parallaxX = (mousePos.x - window.innerWidth / 2) / 50;
  const parallaxY = (mousePos.y - window.innerHeight / 2) / 50;

  return (
    <div className="desktop-container">
      <div className="desktop-header">Desktop - 1</div>
      
      <div className="main-content">
        {/* 지구 이미지 - 패럴랙스 효과 */}
        <div 
          className="earth-section"
          style={{
            transform: `translate(${parallaxX * 2}px, calc(-50% + ${parallaxY * 2}px)) rotate(${mousePos.x / 50}deg)`
          }}
        >
          <div className={`earth-circle ${isPlaying ? 'rotating' : ''}`}>
            <div className="earth-inner"></div>
            <div className="earth-glow"></div>
          </div>
          <div className="dots-pattern"></div>
        </div>

        {/* 통화 헤더 - 슬라이드 인 애니메이션 */}
        <div className={`call-header ${isCallActive ? 'active' : ''}`}>
          <div className="profile-icon pulse">
            <div className="earth-icon"></div>
          </div>
          <div className="call-info">
            <div className="call-title">Wave to Earth</div>
            <div className="call-subtitle">
              {isPlaying ? '♪ Now Playing...' : 'You call wave to Earth. Summer.'}
            </div>
          </div>
          <button 
            className="call-btn end hover-scale"
            onClick={handleEndCall}
          >
            <span className="phone-icon">✕</span>
          </button>
          <button 
            className="call-btn accept hover-scale"
            onClick={handleAcceptCall}
          >
            <span className="phone-icon">📞</span>
          </button>
        </div>

        {/* 노래 리스트 - 호버 및 클릭 효과 */}
        <div className="song-list">
          {songs.map((song, index) => (
            <div 
              key={index} 
              className={`song-item ${index === 0 ? 'song-title' : ''} ${selectedSong === index ? 'selected' : ''}`}
              onClick={() => handleSongClick(index)}
              style={{
                animationDelay: `${index * 0.1}s`
              }}
            >
              {selectedSong === index && '♪ '}
              {song}
            </div>
          ))}
        </div>

        {/* 밴드 멤버 이미지 - 패럴랙스 */}
        <div 
          className="band-members"
          style={{
            transform: `translate(${-parallaxX * 1.5}px, ${-parallaxY * 1.5}px)`
          }}
        >
          <div className="member-silhouette"></div>
        </div>

        {/* MP3 플레이어와 테이프 - 인터렉티브 */}
        <div 
          className="music-devices"
          style={{
            transform: `translate(${-parallaxX}px, ${-parallaxY}px)`
          }}
        >
          <div className={`tape-player ${isPlaying ? 'playing' : ''} hover-lift`}>
            <div className="tape-window">
              <div className="tape-reel left"></div>
              <div className="tape-reel right"></div>
            </div>
          </div>
          <div className="mp3-player hover-lift">
            <div className={`mp3-screen ${isPlaying ? 'active' : ''}`}>
              <div className="equalizer">
                <div className="bar"></div>
                <div className="bar"></div>
                <div className="bar"></div>
                <div className="bar"></div>
              </div>
            </div>
            <div className="mp3-buttons">
              <div className="mp3-btn"></div>
              <div className="mp3-btn"></div>
            </div>
          </div>
        </div>

        {/* 기타 - 패럴랙스 */}
        <div 
          className="guitar"
          style={{
            transform: `translate(${-parallaxX * 0.8}px, ${-parallaxY * 0.8}px) rotate(${-parallaxX * 0.5}deg)`
          }}
        >
          <div className="guitar-body"></div>
          <div className="guitar-strings"></div>
        </div>

        {/* 떠다니는 음표들 */}
        {isPlaying && (
          <>
            <div className="floating-note note-1">♪</div>
            <div className="floating-note note-2">♫</div>
            <div className="floating-note note-3">♪</div>
            <div className="floating-note note-4">♫</div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
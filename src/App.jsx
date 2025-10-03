import "./App.css";
import wave1 from "./img/wave/wave1.png";
import wave2 from "./img/wave/wave2.png";
import wave3 from "./img/wave/wave3.png";
import wave4 from "./img/wave/wave4.png";
import wave5 from "./img/wave/wave5.png";

function App() {
  const waves = [
    { src: wave1, riseHeight: 20 },
    { src: wave2, riseHeight: 280 },
    { src: wave3, riseHeight: 260 },
    { src: wave4, riseHeight: 240 },
    { src: wave5, riseHeight: 220 },
  ];

  return (
    <div className="wave-container">
      {waves.map((wave, index) => (
        <img
          key={index}
          src={wave.src}
          alt={`물결 ${index + 1}`}
          className="wave"
          style={{
            animationDelay: `${index * 0.5}s`,
            '--rise-height': `${wave.riseHeight}px`, // CSS 커스텀 속성
          }}
        />
      ))}
    </div>
  );
}

export default App;

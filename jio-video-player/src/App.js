import "./style.css";
import { useRef, useState } from "react";
import ReactPlayer from "react-player";
import Progress from "./Progress";
import { convertMillisecondsToTime } from "./util";
const App = () => {
  const [played, setPlayed] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [duration, setDuration] = useState(0);
  const videoRef = useRef();
  const [videoUrl, setUrl] = useState("#");
  const [playedString, setPlayedStr] = useState(0);
  const [fullDuration, setFullDuration] = useState(0);
  const handleSeek = (e) => {
    const bar = e.currentTarget;
    const clickPosition = e.clientX - bar.getBoundingClientRect().left;
    const barWidth = bar.clientWidth;
    const clickedTime = (clickPosition / barWidth) * duration;
    // Use the seekTo method to seek to the calculated time
    videoRef.current.seekTo(clickedTime);
  };
  const handleProgress = (state) => {
    setPlayed(state.played);
    setDuration(state.loadedSeconds);
    setPlayedStr(convertMillisecondsToTime(state.playedSeconds * 1000));

    const bufferBar = document.querySelector(".buffer-bar");
    if (bufferBar) {
      const barWidth = bufferBar.clientWidth;
      const bufferedWidth = (state.loaded * barWidth * 100) / duration; // Calculate buffered width as a relative to the bar width
      bufferBar.style.background = `linear-gradient(to right, #00ff00 ${bufferedWidth}%, #ffc600 ${bufferedWidth}% 50%, #ff0000 50% 100%)`; // Update the buffer bar's gradient to reflect the buffering progress
    }
  };
  return (
    <div className="player">
      <ReactPlayer
        url={videoUrl}
        controls={true}
        onProgress={handleProgress}
        ref={videoRef}
        playing={playing}
        onLoadedMetadata={() => {
          setFullDuration(videoRef.current.getDuration());
        }}
      />
      <Progress
        max={1}
        value={played}
        onClick={handleSeek}
        fullDuration={fullDuration}
      ></Progress>
      <div>
        {" "}
        <button
          onClick={() => {
            setPlaying(!playing);
          }}
        >
          {playing ? (
            <img src="/pause.png" width={15} height={15} />
          ) : (
            <img src="/play.png" width={15} height={15} />
          )}
        </button>
        Current Time: <input type="text" value={playedString} />
        Input URL:{" "}
        <input
          type="text"
          value={videoUrl}
          onChange={(e) => {
            setUrl(e?.target?.value);
          }}
        />
      </div>
    </div>
  );
};

export default App;

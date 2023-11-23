import React from "react";

const ProgressIndicator = ({
  max,
  value,
  intervalTimestamp = 2,
  onClick,
  fullDuration,
}) => {
  const renderTimestamps = [];
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };
  for (let i = 0; i <= max; i += intervalTimestamp) {
    renderTimestamps.push(
      <div
        key={i}
        style={{
          position: "absolute",
          left: `${(i / max) * 100}%`,
          bottom: "-20px",
          textAlign: "center",
        }}
      >
        {formatTime(i)}
      </div>
    );
  }
  console.log("fullDuration" + fullDuration);
  //hardcoded the break points
  return (
    <div style={{ position: "relative" }}>
      <progress max={1} value={value} onClick={onClick}>
        {renderTimestamps}
      </progress>
      <span class="timestamp timestamp1">{"|"}</span>
      <span class="timestamp timestamp2">{"|"}</span>
      <span class="timestamp timestamp3">{"|"}</span>
    </div>
  );
};

export default ProgressIndicator;

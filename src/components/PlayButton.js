import { useState, memo } from "react";
const PlayButton = memo(function PlayButton({ ...props }) {
  const [playing, setPlaying] = useState(false);
  function handleClick(e) {
    e.stopPropagation();
    if (playing) {
      props.onPause();
    } else {
      props.onPlay();
    }
    setPlaying(!playing);
  }
  return (
    <button onClick={handleClick}>
      {props.name} {playing ? "⏸️" : "▶️"}
    </button>
  );
})

export default PlayButton;

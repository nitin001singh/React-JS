import Video from "./Video";
import PlayButton from "./PlayButton";
import useVideos from "../hooks/Videos";
import axios from "axios";
import { useCallback, useEffect, useMemo } from "react";
import useVideoDispatch from "../hooks/VideoDispatch";
function VideoList({ editVideo }) {
  const videos = useVideos();
  const dispatch = useVideoDispatch();

  const url = "https://my.api.mockaroo.com/video.json?key=2485e880";
  async function handleClick() {
    const res = await axios.get(url);
    dispatch({ type: "LOAD", payload: res.data });
  }

  useEffect(() => {
    async function getVideos() {
      const res = await axios.get(url);
      dispatch({ type: "LOAD", payload: res.data });
    }
    getVideos();
  }, []);

  const play = useCallback(() => console.log("Play "), []);
  const pause = useCallback(() => console.log("Pause "), []);
  const memoButton = useMemo(() => {
    <PlayButton onPlay={play} onPause={pause}>
      Play
    </PlayButton>;
  }, [play, pause]);
  return (
    <>
      {videos.map((item) => {
        return (
          <Video {...item} key={item.id} editVideo={editVideo}>
            {memoButton}
          </Video>
        );
      })}
    </>
  );
}

export default VideoList;

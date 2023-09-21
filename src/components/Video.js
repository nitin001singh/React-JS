import { useEffect, memo } from "react";
import useVideoDispatch from "../hooks/VideoDispatch";
import "./Video.css";
const Video = memo(function Video({
  title,
  id,
  channel = "Nitin Learning",
  views,
  verified,
  children,
  editVideo,
}) {
  const dispatch = useVideoDispatch();

  // useEffect(() => {
  //   const idx = setInterval(() => {
  //     console.log("Video is playing ", id);
  //   });
  //   return () => {
  //     clearInterval(idx);f
  //   };
  // }, [id]);

  return (
    <>
      <div className="container" style={{ marginTop: "10px" }}>
        <div>
          <button
            onClick={() => {
              dispatch({ type: "DELETE", payload: id });
            }}
          >
            Delete
          </button>{" "}
          &nbsp;
          <button
            onClick={() => {
              editVideo(id);
            }}
          >
            Edit
          </button>
        </div>
        <div>&nbsp;</div>

        <div className="pic">
          <img
            src={`https://picsum.photos/id/${id}/160/90`}
            alt="Katherine Johnson"
          />
        </div>
        <div className="title">{title}</div>
        <div className="channel">
          {channel} {verified && "✅"}
        </div>
        <div className="views">
          {views} views <span>.</span>
        </div>
        <div>{children}</div>
        <div>
          <hr />
        </div>
      </div>
    </>
  );
});

export default Video;

// 2:22:12 se start krna h

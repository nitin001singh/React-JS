import { useEffect, forwardRef, useState } from "react";
import "./AddVideo.css";
import useVideoDispatch from "../hooks/VideoDispatch";
const AddVideo = forwardRef(function AddVideo({ editableVideo },ref) {
  const initialState = {
    time: "1 Days ago",
    channel: "Nitin Learning",
    verified: true,
    title: "",
    views: "",
  };
  const [video, setVideo] = useState(initialState);
  const dispatch = useVideoDispatch();
  // const inputRef = useRef(null)
  function handleSubmit(e) {
    e.preventDefault();
    if (editableVideo) {
      dispatch({ type: "UPDATE", payload: video });
    } else {
      dispatch({ type: "ADD", payload: video });
    }
    setVideo(initialState);
  }

  function handleChange(e) {
    e.stopPropagation();
    setVideo({ ...video, [e.target.name]: e.target.value });
  }

  useEffect(() => {
    if (editableVideo) {
      setVideo(editableVideo);
    }
    // inputRef.current.focus()
  }, [editableVideo]);
  return (
    <>
      <form>
        <input
          ref={ref}
          type="text"
          name="title"
          onChange={handleChange}
          placeholder="Enter title"
          value={video.title}
        />
        <input
          type="text"
          name="views"
          onChange={handleChange}
          placeholder="Enter Views"
          value={video.views}
        />
        <button onClick={handleSubmit}>
          {editableVideo ? "Edit" : "Add"} Video
        </button>
      </form>
    </>
  );
});
export default AddVideo;

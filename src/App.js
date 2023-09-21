import "./App.css";

import { useCallback, useReducer, useRef, useState, lazy, Suspense } from "react";
import AddVideo from "./components/AddVideo";
import VideoList from "./components/VideoList";
import ThemeContext from "./context/ThemeContext";
import VideosContext from "./context/VideosContext";
import VideoDispatchContext from "./context/VideoDispatchContext";
const Dummy  = lazy(() => import( "./components/Dummy") )

function App() {
  const [editableVideo, setEditableVideo] = useState(null);
  const [videos, dispatch] = useReducer(videoReducer, []);
  const [mode, setMode] = useState("lightMode");
  const ref = useRef(null);

  const [show, setShow] = useState(false);

  function videoReducer(videos, action) {
    switch (action.type) {
      case "ADD":
        return [...videos, { ...action.payload, id: videos.length + 1 }];

      case "DELETE":
        return videos.filter((item) => item.id != action.payload);

      case "UPDATE":
        const index = videos.findIndex((v) => v.id === action.payload.id);
        const newVideos = [...videos];
        newVideos.splice(index, 1, action.payload);
        setEditableVideo(null);
        return newVideos;

      case "LOAD":
        return action.payload;

      default:
        return videos;
    }
  }

  const editVideo = useCallback(
    function editVideo(id) {
      setEditableVideo(videos.find((item) => item.id === id));
    },
    [videos]
  );

  return (
    <>
      <ThemeContext.Provider value={mode}>
        <VideosContext.Provider value={videos}>
          <VideoDispatchContext.Provider value={dispatch}>
            <button onClick={()=>{ref.current.focus()}}>Focus</button>
            <button
              onClick={() => {
                setMode(mode === "darkMode" ? "lightMode" : "darkMode");
              }}
            >
              Change Mode
            </button>
            <hr />
            <div
              className={`App ${mode}`}
              onClick={() => {
                console.log("App");
              }}
            >
              <div>
                <AddVideo ref={ref} editableVideo={editableVideo}></AddVideo>
                <hr></hr>
                <VideoList editVideo={editVideo}></VideoList>
                <button onClick={()=>{ setShow(true)}}>Show Lazy Loading Dummy</button>
                {show ? <Suspense fallback={<>Loading...</>}><Dummy></Dummy></Suspense> : null}
              </div>
            </div>
          </VideoDispatchContext.Provider>
        </VideosContext.Provider>
      </ThemeContext.Provider>
    </>
  );
}

export default App;

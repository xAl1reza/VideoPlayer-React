import { useEffect, useState } from "react";
import Navbar from "./Components/Navbar";
import Movie from "./assets/2.mp4";
import Controls from "./Components/Controls";
import { useRef } from "react";
import ProgressBar from "./Components/ProgressBar";

function VideoPlayer() {
  const videoRef = useRef(null);
  const videoWrapperRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [timeOutId, setTimeOutId] = useState(null);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [skipText, setSkipText] = useState("");
  const [volume, setVolume] = useState(1);

  const handlePlayVideo = () => {
    setIsPlaying(!isPlaying);
  };
  const handleLoadedVideo = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };
  const handleProgressSeek = (e) => {
    let time = e.target.value;
    setCurrentTime(time);
    if (videoRef.current) {
      videoRef.current.currentTime = time;
    }
  };
  const updateProgressBar = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };
  const handleVolumeChange = (e) => {
    const newVolume = e.target.value;
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
    }
  };
  const handleFullScreen = () => {
    if (videoRef.current) {
      if (!isFullScreen) {
        videoWrapperRef.current.requestFullscreen();
      } else {
        document.exitFullscreen();
      }
      setIsFullScreen(!isFullScreen);
    }
  };
  const handleMouseMove = () => {
    setShowControls(true);

    if (timeOutId) {
      clearTimeout(timeOutId);
    }

    const id = setTimeout(() => {
      setShowControls(false);
    }, 3000);
    setTimeOutId(id);
  };
  const handleMouseLeave = () => {
    setShowControls(false);

    if (timeOutId) {
      clearTimeout(timeOutId);
    }
  };
  const handleMute = () => {
    setVolume(0);
    if (videoRef.current) {
      videoRef.current.volume = 0;
    }
  };
  const handleDoubleClick = (e) => {
    if (!videoRef.current) return;

    const videoWidth = e.target.offsetWidth;
    const clickPosition = e.nativeEvent.offsetX;

    if (clickPosition > videoWidth / 2) {
      videoRef.current.currentTime = Math.min(
        videoRef.current.duration,
        videoRef.current.currentTime + 10
      );
      setSkipText(
        <span className="text-white text-3xl">
          <i className="bi bi-skip-forward-fill"></i> + 10
        </span>
      );
      setTimeout(() => {
        setSkipText("");
      }, 1500);
    } else {
      videoRef.current.currentTime = Math.max(
        0,
        videoRef.current.currentTime - 10
      );
      setSkipText(
        <span className="text-white text-3xl">
          <i className="bi bi-skip-backward-fill"></i> - 10
        </span>
      );
      setTimeout(() => {
        setSkipText("");
      }, 1500);
    }
  };
  const handleSpeedChange = (e) => {
    const newSpeed = e.target.value;
    setSpeed(newSpeed);
    if (videoRef.current) {
      videoRef.current.playbackRate = newSpeed;
    }
  };
  const formatTime = (timeInSeconds) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = Math.floor(timeInSeconds % 60);

    const formattedHours = hours > 0 ? `${hours}:` : "";
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

    return `${formattedHours}${formattedMinutes}:${formattedSeconds}`;
  };
  const handlePauseVideo = ()=>{
    const windowWidth = window.innerWidth;
    if(windowWidth < 640){
      setShowControls(true);
    }else{
      handlePlayVideo()
    }
  }
  useEffect(() => {
    if (isPlaying) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    const handleFullScreenChange = () => {
      const isNowFullScreen = !!document.fullscreenElement;
      setIsFullScreen(isNowFullScreen);
    };

    document.addEventListener("fullscreenchange", handleFullScreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullScreenChange);
    };
  }, []);

  return (
    <>
      <Navbar />
      <div className="container my-16">
        <div className="flex items-center justify-center my-10">
          <div
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            ref={videoWrapperRef}
            className="relative"
          >
            <video
              onDoubleClick={(e) => handleDoubleClick(e)}
              onClick={handlePauseVideo}
              onTimeUpdate={updateProgressBar}
              onLoadedMetadata={handleLoadedVideo}
              ref={videoRef}
              className={`${
                isFullScreen
                  ? "w-full h-full object-cover"
                  : "max-h-[600px] w-[1060px] rounded-lg"
              } shadow-custome shadow-black/50 dark:shadow-white`}
              controls={false}
            >
              <source src={Movie} />
            </video>
            {skipText && (
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-full w-full flex items-center justify-center">
                {skipText}
              </div>
            )}
            <div
              className={`${
                showControls ? "transition-all absolute w-full bottom-0 opacity-100 pointer-events-auto":
               "transition-all absolute w-full bottom-0 opacity-0 pointer-events-none"}`}
            >
              <div className="flex items-center justify-between px-4 my-2">
                <span className="text-white">{formatTime(currentTime)}</span>
                <span className="text-white">{formatTime(duration)}</span>
              </div>
              <ProgressBar
                currentTime={currentTime}
                ProgressSeek={handleProgressSeek}
                duration={duration}
              />
              <Controls
                muteVideo={handleMute}
                fullScreen={handleFullScreen}
                volume={volume}
                volumeChange={handleVolumeChange}
                isPlaying={isPlaying}
                play={handlePlayVideo}
                speed={speed}
                speedChange={handleSpeedChange}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-between items-center md:flex-row md:justify-around md:items-center">
          <h2 className="text-zinc-900 text-center dark:text-white font-sans text-2xl md:text-4xl">
            Nature
          </h2>
          <p className="text-zinc-900 text-center dark:text-white text-lg mt-2">2025/1/1</p>
        </div>
      </div>
    </>
  );
}

export default VideoPlayer;

function Controls({
  muteVideo,
  fullScreen,
  volume,
  volumeChange,
  isPlaying,
  play,
  speed,
  speedChange,
}) {
  return (
    <>
      <div className="flex items-center justify-between px-4 mb-2">
        {isPlaying ? (
          <i
            onClick={() => play()}
            className="text-white text-3xl bi bi-pause"
          ></i>
        ) : (
          <i
            onClick={() => play()}
            className="text-white text-3xl bi bi-play-fill"
          ></i>
        )}
        <div className="flex items-center gap-4">
          {volume === 0 ? (
            <i
              onClick={muteVideo}
              className="text-white text-3xl bi bi-volume-mute"
            ></i>
          ) : volume < 0.5 ? (
            <i
              onClick={muteVideo}
              className="text-white text-3xl bi bi-volume-down"
            ></i>
          ) : (
            <i
              onClick={muteVideo}
              className="text-white text-3xl bi bi-volume-up"
            ></i>
          )}
          <input
            className="w-12 md:w-32"
            type="range"
            min={0}
            max={1}
            step={0.01}
            onChange={volumeChange}
            value={volume}
          />
          <select onChange={speedChange} value={speed} className="text-white outline-hidden border-none">
            <option className="text-black" value={1}>1x</option>
            <option className="text-black" value={1.5}>1.5x</option>
            <option className="text-black" value={2}>2x</option>
          </select>
          <i
          onClick={fullScreen}
          className="cursor-pointer text-white text-lg bi bi-fullscreen"
        ></i>
        </div>
      </div>
    </>
  );
}

export default Controls;

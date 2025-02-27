function ProgressBar({currentTime , ProgressSeek, duration}){
     return(
        <>
            <div className="px-4 my-1">
                <input value={currentTime} onChange={(e)=>ProgressSeek(e)} className="w-full " type="range" min={0} max={duration} step={0.1}/>
            </div>
        </>
     )
};

export default ProgressBar;
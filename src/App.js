import React, {useState, useRef} from 'react';
// import styles
import "./styles/app.scss";
import Player from './components/Player';
import Song from './components/Song';
import data from './data';
import Library from './components/Library';
import Nav from './components/Nav';

function App() {
  //Ref
  // If you need to select a specific HTML tag in your component you can use a reference
  // So to use it import useRef from react
  const audioRef = useRef(null);
  const [songs, setSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
    animationPercentage: 0,
  });
  const [libraryStatus, setLibraryStatus] = useState(false);

  // Event handler lifted up
  // onTimeUpdate basically runs everytime the time changes in the audio
  const timeUpdateHandler = (e) => {
    const current = e.target.currentTime;
    const duration = e.target.duration;
    // Calculate Percentage
    // This code gets rid of all the decimals
    const roundedCurrent = Math.round(current);
    const roundedDuration = Math.round(duration);
    const animation = Math.round((roundedCurrent / roundedDuration) * 100);
    
    setSongInfo({
        ...songInfo,
        currentTime: current,
        duration: duration,
        animationPercentage: animation
    })
  };

  const songEndHandler = async () => {
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    await setCurrentSong(songs[(currentIndex + 1) % songs.length]);     
    if(isPlaying) audioRef.current.play();
  }

  return (
    <div className={`App ${libraryStatus ? "library-active" : ""}`} >
      <Nav libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus} />
      <Song currentSong={currentSong}/>
      <Player 
        audioRef={audioRef}
        songs={songs}
        currentSong={currentSong}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying} 
        songInfo={songInfo}
        setSongInfo={setSongInfo}
        setSongs={setSongs}
        setCurrentSong={setCurrentSong}
      />
      <Library 
        songs={songs}
        currentSong={currentSong}
        setCurrentSong={setCurrentSong}
        audioRef={audioRef} 
        isPlaying={isPlaying}
        setSongs={setSongs}
        libraryStatus={libraryStatus}
      />
        <audio 
            onTimeUpdate={timeUpdateHandler}
            onLoadedMetadata={timeUpdateHandler} 
            ref={audioRef} 
            src={currentSong.audio}
            onEnded={songEndHandler}
        ></audio>
    </div>
    
  );
}

export default App;
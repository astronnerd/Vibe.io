import React from 'react'
import LibrarySong from './LibrarySong';

 const Library = ({ 
     songs, 
     currentSong,
     setCurrentSong, 
     audioRef, 
     isPlaying, 
     setSongs,
     libraryStatus 
    }) => {

    return (
        <div className={`library ${libraryStatus ? 'active-library' : ""}`}>
            <h2>Playlist</h2>
            <div className="library-songs">
                {songs.map((song) => (
                    <LibrarySong 
                        song={song}
                        currentSong={currentSong}
                        setCurrentSong={setCurrentSong}
                        songs={songs}
                        audioRef={audioRef}
                        isPlaying={isPlaying}
                        setSongs={setSongs}
                        id={song.id} 
                        key={song.id}
                    />
                ))}
            </div>
        </div>
    )
}

export default Library;
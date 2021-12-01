import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faAngleLeft, faAngleRight, faPause, faPlay} from '@fortawesome/free-solid-svg-icons'
// import { playAudio } from '../util';

export default function Player({ 
    audioRef, 
    songs,
    currentSong, 
    isPlaying, 
    setCurrentSong,
    setIsPlaying, 
    setSongs,
    setSongInfo, 
    songInfo }) {
    // State lifted up
 
    const activeLibraryHandler = (nextPrev) => {
        // Add active songs
        const newSongs = songs.map((song) => {
            if(song.id === nextPrev.id) {
                return {
                    ...song,
                    active: true,
                }
            } else {
                return {
                    ...song,
                    active: false,
                }
            }
        })
        setSongs(newSongs);
    }
    // Event handlers
    const playSongHandler = () => {
        if(isPlaying) {
            audioRef.current.pause();
            setIsPlaying(!isPlaying);
        } else {
            audioRef.current.play();
            setIsPlaying(!isPlaying);
        }  
    }
    const getTime = (time) => {
        return (
            //Math.floor(time / 60) - gives you minutes
            //Add : before the seconds
            //Math.floor(time % 60) - Everytime we get upto 60 it gets back and start again
            Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
        )
    }
    const dragHandler = (e) => {
        audioRef.current.currentTime = e.target.value;
        setSongInfo({...setSongInfo, currentTime: e.target.value});
    }
    const skipTrackHandler = async (direction) => {
        let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
        if(direction === "skip-forward") {
          await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
          activeLibraryHandler(songs[(currentIndex + 1) % songs.length]);
        }
        if(direction === 'skip-back') {
            // Case 1: To avoid errors and crashing of app 
            // This line of code checks if the array is songs[-1]
            // If it is then we set the current song to the last song
            // then we return because if we don't then Case 2 will run and will crash the app  
            if((currentIndex - 1) % songs.length === -1) {
                await setCurrentSong(songs[songs.length - 1]);
                activeLibraryHandler(songs[songs.length - 1]);
                if(isPlaying) {
                    audioRef.current.play();
                }
                return;
            }
            // Case 2:  this line of code only applies when we are in the middle of the songs array
            await setCurrentSong(songs[(currentIndex - 1) % songs.length]);
            activeLibraryHandler(songs[(currentIndex - 1) % songs.length]);
        }
        if(isPlaying) {
            audioRef.current.play();
        }
    }
    // Add the styles
    const trackAnimation = {
        transform: `translateX(${songInfo.animationPercentage}%)`
    }

    return (
        <div className="player">
            <div className="time-control">
                <p>{getTime(songInfo.currentTime)}</p>
                <div 
                    style={{
                      background: `linear-gradient(to right, ${currentSong.color[0]}, ${currentSong.color[1]})`
                    }} 
                    className="track"
                >
                    <input 
                        type="range"
                        min={0}
                        max={songInfo.duration || 0}
                        value={songInfo.currentTime}
                        onChange={dragHandler} 
                    />
                    <div style={trackAnimation} className="animate-track"></div>
                </div>    
                <p>{songInfo.duration ? getTime(songInfo.duration) : "0:00"}</p>
            </div>
            <div className="play-control">
                <FontAwesomeIcon 
                    className="skip-back" 
                    onClick={() => skipTrackHandler('skip-back')}
                    size="2x" 
                    icon={faAngleLeft} />
                <FontAwesomeIcon
                    onClick={playSongHandler} 
                    className="play" 
                    size="2x" 
                    icon={isPlaying ? faPause : faPlay} />
                <FontAwesomeIcon 
                    className="skip-forward" 
                    onClick={() => skipTrackHandler('skip-forward')}
                    size="2x" 
                    icon={faAngleRight} />
            </div>
            
        </div>
    )
}
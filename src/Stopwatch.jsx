import { useEffect, useRef, useState } from "react";


function StopWatch(){

    const [isRunning, setisRunning] = useState(false);
    const [elapsedTime, setElapsedTime] = useState(0);
    const intervalsIdRef = useRef(null);
    const StartTimeRef = useRef(0);

    useEffect(() => {

        if(isRunning){
            intervalsIdRef.current= setInterval(() => {
                setElapsedTime(Date.now() - StartTimeRef.current);
            }, 10);
        }

        return () => {
            clearInterval(intervalsIdRef.current);
        }

    },[isRunning]);

    function start(){
        setisRunning(true);
        StartTimeRef.current = Date.now() - elapsedTime;
    }

    function stop(){
        setisRunning(false);
    }

    function reset(){
        setElapsedTime(0);
        setisRunning(false);
    }

    function formatTime(){
        let hours = Math.floor(elapsedTime / (1000 * 60 * 60));
        let minutes = Math.floor(elapsedTime / (1000 * 60) % 60);
        let seconds = Math.floor(elapsedTime / (1000) % 60);
        let miliseconds = Math.floor((elapsedTime % 1000 / 10) / 10);

        hours = String(hours).padStart(2,"0");
        minutes = String(minutes).padStart(2,"0");
        seconds = String(seconds).padStart(2,"0");
        miliseconds = String(miliseconds).padStart(2,"0");


        return `${minutes}:${seconds}:${miliseconds}`;
    }

    return(
        <>
            <div className="stopwatch">
                <div className="display">{formatTime()}</div>
                <div className="controls">
                    <button className="start-btn" onClick={start}>Start</button>
                    <button className="reset-btn" onClick={reset}>Reset</button>
                    <button className="stop-btn" onClick={stop}>Stop</button>
                </div>
            </div>
        </>
    );

}


export default StopWatch
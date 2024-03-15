import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import PlayButton from "./PlayButton";
import PauseButton from "./PauseButton";
import SettingsButton from "./SettingsButton";
import { useContext, useState, useEffect, useRef } from "react";
import SettingsContext from "./SettingsContext";

import song from "./audio.mp3";

const red = "#f54e4e";
const green = "#4aec8c";

function Timer() {
  const settingsInfo = useContext(SettingsContext);
  const [audio] = useState(new Audio(song));
  const [secondsLeft, setSecondsLeft] = useState(settingsInfo.workMinutes * 60);
  const [mode, setMode] = useState("work"); // work | break | null
  const [isPaused, setIsPaused] = useState(true);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isPaused) {
      intervalRef.current = setInterval(() => {
        setSecondsLeft((prevSecondsLeft) => {
          if (prevSecondsLeft > 0) {
            return prevSecondsLeft - 1;
          } else {
            clearInterval(intervalRef.current!);
            setIsPaused(true);
            switch (mode) {
              case "work":
                setSecondsLeft(settingsInfo.breakMinutes * 60);
                setMode("break");
                break;
              case "break":
                setSecondsLeft(settingsInfo.workMinutes * 60);
                setMode("work");
                break;
              default:
                break;
            }
            return 0;
          }
        });
      }, 1000);
      audio.play();
    } else {
      clearInterval(intervalRef.current!);
      audio.pause();
    }

    return () => {
      clearInterval(intervalRef.current!);
    };
  }, [isPaused, mode, settingsInfo, audio]);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const handlePlayPauseClick = () => {
    setIsPaused((prevIsPaused) => !prevIsPaused);
  };

  return (
    <div>
      <CircularProgressbar
        value={
          (secondsLeft /
            ((mode === "work"
              ? settingsInfo.workMinutes
              : settingsInfo.breakMinutes) *
              60)) *
          100
        }
        text={formatTime(secondsLeft)}
        styles={buildStyles({
          rotation: 0,
          strokeLinecap: 0,
          textColor: "#fff",
          pathColor: mode === "work" ? red : green,
          trailColor: "rgba(255,255,255,.2)",
        })}
      />

      <div style={{ marginTop: "20px" }}>
        {isPaused ? (
          <PlayButton onClick={handlePlayPauseClick} />
        ) : (
          <PauseButton onClick={handlePlayPauseClick} />
        )}
      </div>
      <div style={{ marginTop: "20px" }}>
        <SettingsButton onClick={() => settingsInfo.setShowSettings(true)} />
      </div>
    </div>
  );
}

export default Timer;

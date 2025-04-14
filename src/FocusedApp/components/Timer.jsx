import React, { useState, useEffect } from "react";
import "../styles/Style.css";
import { Labels, modes, ModesKey } from "../configs/modes";

const Timer = ({ children }) => {
  const [mode, setMode] = useState(ModesKey.pomodoro);
  const [timeLeft, setTimeLeft] = useState(modes[mode]);
  const [isRunning, setIsRunning] = useState(false);
  const [totalFocusTime, setTotalFocusTime] = useState(0);
  const [studyGoalHours] = useState(8);

  useEffect(() => {
    const today = new Date().toDateString();
    const savedDate = localStorage.getItem("focusDate");

    if (savedDate !== today) {
      localStorage.setItem("focusDate", today);
      localStorage.setItem("totalFocusTime", "0");
      localStorage.setItem("studyGoalHours", studyGoalHours.toString());
      setTotalFocusTime(0);
    } else {
      const storedTime = localStorage.getItem("totalFocusTime");
      const storedLeft = localStorage.getItem("timeLeft");
      const storedRunning = localStorage.getItem("isRunning");

      if (storedTime) setTotalFocusTime(parseInt(storedTime, 10));
      if (storedLeft) setTimeLeft(parseInt(storedLeft, 10));
      if (storedRunning) setIsRunning(storedRunning === "true");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("totalFocusTime", totalFocusTime.toString());
  }, [totalFocusTime]);

  useEffect(() => {
    localStorage.setItem("timeLeft", timeLeft.toString());
  }, [timeLeft]);

  useEffect(() => {
    localStorage.setItem("isRunning", isRunning.toString());
  }, [isRunning]);

  useEffect(() => {
    let timer = null;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
        setTotalFocusTime((prev) => prev + 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
      alert("Break Time!");
    }
    return () => clearInterval(timer);
  }, [isRunning, timeLeft]);

  useEffect(() => {
    setTimeLeft(modes[mode]);
    setIsRunning(false);
  }, [mode]);

  const formatTime = (seconds) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min.toString().padStart(2, "0")}:${sec
      .toString()
      .padStart(2, "0")}`;
  };

  const formatHours = (seconds) => (seconds / 60).toFixed(2);
  const remainingHours = Math.max(0, studyGoalHours - totalFocusTime / 3600);
  return (
    <div>
      <header className="app-header">
        <h1>Small Steps</h1>
      </header>

      <div className="mode-switcher">
        {Object.keys(modes).map((key) => (
          <button
            key={key}
            className={mode === key ? "active" : ""}
            onClick={() => setMode(key)}
          >
            {key === ModesKey.pomodoro
              ? Labels.pomodoro
              : key === ModesKey.shortBreak
              ? Labels.shortBreak
              : Labels.longBreak}
          </button>
        ))}
      </div>

      <div className="timer-display">
        <h2>{formatTime(timeLeft)}</h2>
        <button onClick={() => setIsRunning((prev) => !prev)}>
          {isRunning ? "Pause" : "Start"}
        </button>
        ~
      </div>
      <div className="summary-section">
        <h3>Summary</h3>
        <p>Total Focus Time Today: {formatHours(totalFocusTime)} Minutes</p>
        <p>Remaining Study Goal: {remainingHours.toFixed(2)} hrs</p>
      </div>
    </div>
  );
};

export default Timer;

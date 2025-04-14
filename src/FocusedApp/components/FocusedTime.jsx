import React, { useState, useEffect } from "react";

export const FocusedTime = () => {
  const [totalFocusTime, setTotalFocusTime] = useState(0);
  const [studyGoalHours] = useState(8);
  const today = new Date().toDateString();
  const savedDate = localStorage.getItem("focusDate");

  useEffect(() => {
    if (savedDate !== today) {
      localStorage.setItem("focusDate", today);
      localStorage.setItem("totalFocusTime", 0);
      localStorage.setItem("studyGoalHours", studyGoalHours);
      setTotalFocusTime(0);
    } else {
      const storedTime = localStorage.getItem("totalFocusTime");
      if (storedTime) {
        setTotalFocusTime(parseInt(storedTime, 10));
      }
    }
  }, [today, savedDate, totalFocusTime, studyGoalHours]);

  useEffect(() => {
    localStorage.setItem("totalFocusTime", totalFocusTime.toString());
  }, [totalFocusTime]);

  return (
    <div>
      <h1>Focus Time</h1>
    </div>
  );
};

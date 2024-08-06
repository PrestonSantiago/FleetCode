import { createContext, useState, useRef } from "react";
import type { ReactNode } from "react";

interface DateTimes {
  startTime: number;
  endTime: number;
}

interface TimerContextType {
  dateTimes: DateTimes;
  setDateTimes: React.Dispatch<React.SetStateAction<DateTimes>>;
  timerRunning: boolean;
  setTimerRunning: React.Dispatch<React.SetStateAction<boolean>>;
  startTimer: () => void;
  stopTimer: () => void;
}

export const TimerContext = createContext<TimerContextType>({
  dateTimes: { startTime: 0, endTime: 0 },
  setDateTimes: () => {},
  timerRunning: false,
  setTimerRunning: () => {},
  startTimer: () => {},
  stopTimer: () => {},
});

const TimerContextProvider: React.FC<{ children: ReactNode }> = (props) => {
  const [dateTimes, setDateTimes] = useState({ startTime: 0, endTime: 0 });
  const [timerRunning, setTimerRunning] = useState(false);
  const timerRef = useRef(0);

  const startTimer = () => {
    if (!timerRef.current) {
      timerRef.current = setInterval(() => {
        setDateTimes((prev) => {
          const newDateTimes = { ...prev };
          newDateTimes.endTime = Date.now();
          return newDateTimes;
        });
      }, 1000);
    }
  };

  const stopTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = 0;
  };

  const contextValue = {
    dateTimes,
    setDateTimes,
    timerRunning,
    setTimerRunning,
    startTimer,
    stopTimer,
  };

  return (
    <TimerContext.Provider value={contextValue}>
      {props.children}
    </TimerContext.Provider>
  );
};

export default TimerContextProvider;

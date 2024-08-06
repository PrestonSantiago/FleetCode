import { useContext } from "react";
import { TimerContext } from "../store/timer-context";

export default function Timer() {
  const { dateTimes } = useContext(TimerContext);
  const milliseconds = dateTimes.endTime - dateTimes.startTime;
  const numberFormatRegex = /\b(\d)\b/g;

  const timer = {
    min: Math.floor(milliseconds / 1000 / 60)
      .toString()
      .replace(numberFormatRegex, "0$1"),
    sec: Math.floor((milliseconds / 1000) % 60)
      .toString()
      .replace(numberFormatRegex, "0$1"),
  };

  return (
    <aside className="w-72 h-24 text-center flex flex-col justify-center text-5xl bg-primary-light">
      {timer.min}:{timer.sec}
    </aside>
  );
}

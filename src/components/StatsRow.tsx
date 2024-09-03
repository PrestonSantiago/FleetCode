import ClosedArrow from "../assets/icons/Closed-Arrow.svg";
import OpenArrow from "../assets/icons/Open-Arrow.svg";
import DayStats from "../models/dayStats";
import { useState } from "react";

const StatsRow: React.FC<{
  statsData: DayStats;
}> = (props) => {
  {
    const [drawerIsOpen, setDrawerIsOpen] = useState(false);
    const numberFormatRegex = /\b(\d)\b/g;
    const formatTime = (milliseconds: number) => {
      return {
        min: Math.floor(milliseconds / 1000 / 60)
          .toString()
          .replace(numberFormatRegex, "0$1"),
        sec: Math.floor((milliseconds / 1000) % 60)
          .toString()
          .replace(numberFormatRegex, "0$1"),
      };
    };
    const calculateAvgTime = () => {
      let totalMilliseconds = 0;
      props.statsData.times.forEach((time) => {
        totalMilliseconds += time.completionTime;
      });
      const formattedTime = formatTime(
        totalMilliseconds / props.statsData.times.length
      );
      return formattedTime;
    };
    const avgTime = calculateAvgTime();
    const timesList = props.statsData.times.map((time) => {
      return time.completionTime;
    });
    const bestTime = formatTime(Math.min(...timesList));

    const handleToggleDrawer = () => {
      setDrawerIsOpen((drawerIsOpen) => {
        return !drawerIsOpen;
      });
    };
    if (!drawerIsOpen) {
      return (
        <li className="flex flex-row justify-between items-center bg-primary-light border-b-2 border-black">
          <button onClick={handleToggleDrawer}>
            <img className="m-6" src={ClosedArrow} alt="Right facing arrow" />
          </button>
          <p className="text-3xl">Date: {props.statsData.date}</p>
          <p className="text-3xl">
            Avg Time: {avgTime.min + ":" + avgTime.sec}
          </p>
          <p className="text-3xl mr-6">
            Best Time: {bestTime.min + ":" + bestTime.sec}
          </p>
        </li>
      );
    } else {
      return (
        <li className="bg-primary-light border-b-2 border-black">
          <div className="flex flex-row items-center mb-4">
            <button onClick={handleToggleDrawer}>
              <img className="m-6" src={OpenArrow} alt="Right facing arrow" />
            </button>
            <p className="text-3xl">All Times: {props.statsData.date}</p>
          </div>
          <ul>
            <li className="grid grid-cols-2 text-center">
              <p className="text-3xl mb-4">Time of Day</p>
              <p className="text-3xl mb-4">Completion Time</p>
            </li>
            {props.statsData.times.map((time) => {
              const formattedCompletionTime = formatTime(time.completionTime);
              return (
                <li
                  key={time.dateTime}
                  className="grid grid-cols-2 text-center"
                >
                  <p className="text-2xl mb-4">{time.dateTime}</p>
                  <p className="text-2xl mb-4">
                    {formattedCompletionTime.min +
                      ":" +
                      formattedCompletionTime.sec}
                  </p>
                </li>
              );
            })}
          </ul>
        </li>
      );
    }
  }
};

export default StatsRow;

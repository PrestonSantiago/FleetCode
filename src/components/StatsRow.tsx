import ClosedArrow from "../assets/icons/Closed-Arrow.svg";
import OpenArrow from "../assets/icons/Open-Arrow.svg";
import DayStats from "../models/dayStats";
import { useState } from "react";

const StatsRow: React.FC<{
  statsData: DayStats;
}> = (props) => {
  {
    const [drawerIsOpen, setDrawerIsOpen] = useState(false);

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
          <p className="text-3xl">Avg Time: {props.statsData.avg}</p>
          <p className="text-3xl mr-6">Best Time: {props.statsData.best}</p>
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
            {props.statsData.times.map((time) => {
              return (
                <li
                  key={time.dateTime}
                  className="grid grid-cols-2 text-center"
                >
                  <p className="text-2xl mb-4">{time.dateTime}</p>
                  <p className="text-2xl mb-4">{time.completionTime}</p>
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

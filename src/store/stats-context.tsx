import { createContext, useState } from "react";
import type { ReactNode } from "react";
import DayStats from "../models/dayStats";

const fakeStatsData = [
  {
    date: "8/8/2024",
    times: [
      {
        dateTime: new Date().toLocaleTimeString(),
        completionTime: 68993,
      },
      { dateTime: "13:05:01 AM", completionTime: 23578 },
      { dateTime: "14:05:01 AM", completionTime: 27894 },
    ],
  },
  {
    date: "8/7/2024",
    times: [
      {
        dateTime: new Date().toLocaleTimeString(),
        completionTime: 33667,
      },
      { dateTime: "13:05:01 AM", completionTime: 96316 },
      { dateTime: "14:05:01 AM", completionTime: 97421 },
    ],
  },
  {
    date: "8/6/2024",
    times: [
      {
        dateTime: new Date().toLocaleTimeString(),
        completionTime: 33619,
      },
      { dateTime: "13:05:01 AM", completionTime: 85496 },
      { dateTime: "14:05:01 AM", completionTime: 17045 },
    ],
  },
];

interface StatsContextType {
  stats: DayStats[];
  updateStats: (completionDate: Date, completionTime: number) => void;
}

export const StatsContext = createContext<StatsContextType>({
  stats: [{ date: "", times: [{ dateTime: "", completionTime: 0 }] }],
  updateStats: () => {},
});

const StatsContextProvider: React.FC<{ children: ReactNode }> = (props) => {
  const [stats, setStats] = useState(fakeStatsData);

  function updateStats(completionDate: Date, completionTime: number) {
    console.log(completionTime + " bop");
    setStats((prev) => {
      const newState = [...prev];
      const dateIndex = prev.findIndex((stats) => {
        completionDate.toLocaleDateString() === stats.date;
      });
      if (dateIndex >= 0) {
        newState[dateIndex].times.push({
          dateTime: completionDate.toLocaleTimeString(),
          completionTime: completionTime,
        });
      } else {
        newState.push({
          date: completionDate.toLocaleDateString(),
          times: [
            {
              dateTime: completionDate.toLocaleTimeString(),
              completionTime: completionTime,
            },
          ],
        });
      }
      return newState;
    });
  }

  const contextValue = {
    stats,
    updateStats,
  };

  return (
    <StatsContext.Provider value={contextValue}>
      {props.children}
    </StatsContext.Provider>
  );
};

export default StatsContextProvider;

import StatsRow from "../components/StatsRow";
import { useContext } from "react";
import { StatsContext } from "../store/stats-context";

export default function StatsPage() {
  const { stats } = useContext(StatsContext);
  return (
    <>
      <h1 className="m-2 mb-6 pt-1 text-5xl font-light font-sans text-white text-center">
        Statistics
      </h1>
      <ul>
        {stats.map((stats) => {
          return <StatsRow statsData={stats} key={stats.date} />;
        })}
      </ul>
    </>
  );
}

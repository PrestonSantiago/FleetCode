import NavBar from "../components/NavBar";
import StatsRow from "../components/StatsRow";

const fakeStatsData = [
  {
    date: new Date().toLocaleDateString(),
    avg: "00:00:000",
    best: "11:11:111",
    times: [
      {
        dateTime: new Date().toLocaleTimeString(),
        completionTime: "22:22:222",
      },
      { dateTime: "13:05:01 AM", completionTime: "33:33:333" },
      { dateTime: "14:05:01 AM", completionTime: "44:44:444" },
    ],
  },
];

export default function StatsPage() {
  return (
    <>
      <NavBar />
      <h1 className="m-2 mb-6 pt-1 text-5xl font-light font-sans text-white text-center">
        Statistics
      </h1>
      <ul>
        <StatsRow statsData={fakeStatsData[0]} />
        <StatsRow statsData={fakeStatsData[0]} />
      </ul>
    </>
  );
}

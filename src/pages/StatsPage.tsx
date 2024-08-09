import StatsRow from "../components/StatsRow";

const fakeStatsData = [
  {
    date: "8/8/2024",
    times: [
      {
        dateTime: new Date().toLocaleTimeString(),
        completionTime: 33619,
      },
      { dateTime: "13:05:01 AM", completionTime: 85496 },
      { dateTime: "14:05:01 AM", completionTime: 17045 },
    ],
  },
  {
    date: "8/7/2024",
    times: [
      {
        dateTime: new Date().toLocaleTimeString(),
        completionTime: 33619,
      },
      { dateTime: "13:05:01 AM", completionTime: 85496 },
      { dateTime: "14:05:01 AM", completionTime: 17045 },
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

export default function StatsPage() {
  return (
    <>
      <h1 className="m-2 mb-6 pt-1 text-5xl font-light font-sans text-white text-center">
        Statistics
      </h1>
      <ul>
        {fakeStatsData.map((stats) => {
          return <StatsRow statsData={stats} />;
        })}
      </ul>
    </>
  );
}

import NavBar from "../components/NavBar";
import OpenArrow from "../assets/icons/Open-Arrow.svg";
import ClosedStatsRow from "../components/ClosedStatsRow";
import OpenStatsRow from "../components/OpenStatsRow";

const fakeStatsData = [
  {
    date: new Date().toLocaleDateString(),
    avg: "00:00:000",
    best: "11:11:111",
    times: [
      { dateTime: new Date().toLocaleTimeString(), time: "22:22:222" },
      { dateTime: new Date().toLocaleTimeString(), time: "33:33:333" },
      { dateTime: new Date().toLocaleTimeString(), time: "44:44:444" },
    ],
  },
];

export default function StatsPage() {
  return (
    <>
      <NavBar />
      <h1 className="m-2 pt-1 text-5xl font-light font-sans text-white text-center">
        Statistics
      </h1>
      <ul>
        <ClosedStatsRow fakeStatsData={fakeStatsData} />
        <li className="bg-primary-light border-b-2 border-black">
          <div className="flex flex-row items-center mb-4">
            <button>
              <img className="m-6" src={OpenArrow} alt="Right facing arrow" />
            </button>
            <p className="text-3xl">All Times: {fakeStatsData[0].date}</p>
          </div>
          <ul className="grid grid-cols-2 text-center">
            <li className="text-2xl mb-4">
              {fakeStatsData[0].times[0].dateTime}
            </li>
            <li className="text-2xl mb-4">{fakeStatsData[0].times[0].time}</li>
            <li className="text-2xl mb-4">
              {fakeStatsData[0].times[1].dateTime}
            </li>
            <li className="text-2xl mb-4">{fakeStatsData[0].times[1].time}</li>
            <li className="text-2xl mb-4">
              {fakeStatsData[0].times[2].dateTime}
            </li>
            <li className="text-2xl mb-4">{fakeStatsData[0].times[2].time}</li>
          </ul>
        </li>
      </ul>
    </>
  );
}

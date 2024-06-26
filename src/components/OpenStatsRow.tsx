export default function OpenStatsRow() {
  return (
    <li className="flex flex-row justify-between items-center bg-primary-light border-b-2 border-black">
      <button>
        <img className="m-6" src={ClosedArrow} alt="Right facing arrow" />
      </button>
      <p className="text-3xl">Date: {fakeStatsData[0].date}</p>
      <p className="text-3xl">Avg Time: {fakeStatsData[0].avg}</p>
      <p className="text-3xl mr-6">Best Time: {fakeStatsData[0].best}</p>
    </li>
  );
}

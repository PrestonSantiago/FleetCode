import FleetCodeLogo from "../assets/Keycaps/FleetCode-Logo.svg";

export default function NavBar() {
  return (
    <div className="h-24 flex justify-between items-center">
      <button className="ml-8 h-16 w-56 rounded-xl bg-secondary text-center flex flex-row items-center">
        <img className="h-16" src={FleetCodeLogo} alt="FleetCode Logo" />
        <h1 className="mx-2 pt-1 text-3xl font-serif font-medium">FleetCode</h1>
      </button>
      <ul className="flex flex-row mr-4">
        <li>
          <button className="mx-4 text-2xl border-2 border-black w-32 rounded-3xl bg-primary-light">
            Practice
          </button>
        </li>
        <li>
          <button className="mx-4 text-2xl border-2 border-black w-32 rounded-3xl bg-primary-light">
            Stats
          </button>
        </li>
        <li>
          <button className="mx-4 text-2xl border-2 border-black w-32 rounded-3xl bg-primary-light">
            Settings
          </button>
        </li>
      </ul>
    </div>
  );
}

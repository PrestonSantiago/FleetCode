import FleetCodeLogo from "../assets/Keycaps/FleetCode-Logo.svg";
import { NavLink } from "react-router-dom";

export default function NavBar() {
  return (
    <div className="h-24 flex justify-between items-center">
      <button className="ml-8 h-16 w-56 rounded-xl bg-secondary text-center">
        <NavLink to="/" className="flex flex-row items-center">
          <img className="h-16" src={FleetCodeLogo} alt="FleetCode Logo" />
          <h1 className="mx-2 pt-1 text-3xl font-serif font-medium">
            FleetCode
          </h1>
        </NavLink>
      </button>
      <ul className="flex flex-row mr-4">
        <li>
          <NavLink
            to="/practice"
            className={({ isActive }) =>
              (isActive ? "opacity-50" : "") +
              " block w-32 mx-4 rounded-3xl text-center text-2xl border-2 border-black bg-primary-light"
            }
          >
            Practice
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/stats"
            className={({ isActive }) =>
              (isActive ? "opacity-50" : "") +
              " block w-32 mx-4 rounded-3xl text-center text-2xl border-2 border-black bg-primary-light"
            }
          >
            Stats
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/settings"
            className={({ isActive }) =>
              (isActive ? "opacity-50" : "") +
              " block w-32 mx-4 rounded-3xl text-center text-2xl border-2 border-black bg-primary-light"
            }
          >
            Settings
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

import FleetCodeLogo from "../assets/Keycaps/FleetCode-Logo.svg";

export default function HomePage() {
  return (
    <div className="flex w-full h-full justify-center items-center">
      <section className="bg-primary-light w-150 h-150 rounded-8xl text-center">
        <img
          className="mx-auto mt-20"
          src={FleetCodeLogo}
          alt="FleetCode Logo"
        />
        <h1 className="text-5xl font-bold font-serif m-2">FleetCode</h1>
        <p className="m-4 mt-8 px-4 text-2xl text-left">
          <strong>Turn Ideas into Code Faster.</strong> FleetCode allows you to
          practice using keyboard shortcuts to speed up your workflow, so you
          spend less time looking for a function and more time doing the parts
          you love.
        </p>
        <div className="flex justify-around">
          <button className="text-2xl border-2 border-black w-40 h-12 rounded-3xl">
            Stats
          </button>
          <button className="text-2xl border-2 border-black w-40 h-12 rounded-3xl">
            Keybinds
          </button>
          <button className="text-2xl border-2 border-black w-40 h-12 rounded-3xl bg-secondary">
            Start
          </button>
        </div>
        <footer className="mt-12">
          Made by Preston Santiago //{" "}
          <a
            href="https://github.com/PrestonSantiago/FleetCode"
            className="text-lime-600"
          >
            Github Source Code
          </a>
        </footer>
      </section>
    </div>
  );
}

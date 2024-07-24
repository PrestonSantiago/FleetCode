import SettingsRow from "../components/SettingsRow";

export default function SettingsPage() {
  return (
    <>
      <h1 className="m-2 mb-6 pt-1 text-5xl font-light font-sans text-white text-center">
        Settings
      </h1>
      <ul>
        <SettingsRow />
        <SettingsRow />
        <SettingsRow />
        <SettingsRow />
      </ul>
    </>
  );
}

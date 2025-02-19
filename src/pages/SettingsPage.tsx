import SettingsRow from "../components/SettingsRow";
import { useContext } from "react";
import { SettingsContext } from "../store/settings-context";

export default function SettingsPage() {
  const { settings, updateSettings } = useContext(SettingsContext);
  return (
    <>
      <h1 className="m-2 mb-6 pt-1 text-5xl font-light font-sans text-white text-center">
        {"Settings (in progress)"}
      </h1>
      <ul>
        {settings.map((shortcut) => {
          return (
            <SettingsRow
              shortcut={shortcut}
              updateSettings={updateSettings}
              key={shortcut.prompt}
            />
          );
        })}
      </ul>
    </>
  );
}

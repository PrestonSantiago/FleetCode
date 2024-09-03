import ToggleSwitch from "./ToggleSwitch";
import Shortcut from "../models/shortcut";

const SettingsRow: React.FC<{
  shortcut: Shortcut;
  updateSettings: () => void;
}> = (props) => {
  return (
    <li className="flex flex-row justify-between items-center bg-primary-light py-4 px-6">
      <h2 className="text-3xl">{props.shortcut.prompt}</h2>
      <div>
        <ToggleSwitch
          active={props.shortcut.active}
          updateSettings={props.updateSettings}
        />
        <input
          type="text"
          className="text-3xl border border-black ml-6"
          value={props.shortcut.keybind}
        />
      </div>
    </li>
  );
};

export default SettingsRow;

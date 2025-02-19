import ToggleSwitch from "./ToggleSwitch";
import Shortcut from "../models/shortcut";
import { UpdateSettingsProps } from "../store/settings-context";
import ControlledSettingsInput from "./ControlledSettingsInput";

const SettingsRow: React.FC<{
  shortcut: Shortcut;
  updateSettings: ({ prompt, keybind, active }: UpdateSettingsProps) => void;
}> = (props) => {
  return (
    <li className="flex flex-row justify-between items-center bg-primary-light py-4 px-6">
      <h2 className="text-3xl">{props.shortcut.prompt}</h2>
      <div>
        <ToggleSwitch
          prompt={props.shortcut.prompt}
          active={props.shortcut.active}
          updateSettings={props.updateSettings}
        />
        <ControlledSettingsInput
          prompt={props.shortcut.prompt}
          keybind={props.shortcut.keybind}
          updateSettings={props.updateSettings}
        />
      </div>
    </li>
  );
};

export default SettingsRow;

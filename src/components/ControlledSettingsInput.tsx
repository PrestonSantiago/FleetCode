import { useState } from "react";
import { UpdateSettingsProps } from "../store/settings-context";

const ControlledSettingsInput: React.FC<{
  prompt: string;
  keybind: string[];
  updateSettings: ({ prompt, keybind, active }: UpdateSettingsProps) => void;
}> = (props) => {
  const [inputKeys, setInputKeys] = useState<string[]>([]);

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    event.preventDefault();
    event.stopPropagation();
    if (event.key.toUpperCase() == "ESCAPE") {
      setInputKeys([]);
    } else if (event.key.toUpperCase() == "ENTER") {
      props.updateSettings({ prompt: props.prompt, keybind: inputKeys });
      setInputKeys([]);
    } else if (!event.repeat) {
      setInputKeys((prev) => {
        if (prev.includes(event.key.toUpperCase())) {
          return prev;
        } else {
          return [...prev, event.key.toUpperCase()];
        }
      });
    }
  }

  return (
    <input
      className="text-3xl border border-black ml-6"
      type="text"
      onKeyDown={handleKeyDown}
      value={inputKeys}
      placeholder={props.keybind.join("+")}
      readOnly={true}
    />
  );
};

export default ControlledSettingsInput;

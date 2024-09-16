import React from "react";
import { Keycaps } from "../assets/Keycaps/Keycaps";

const ControlledPracticeInput: React.FC<{
  inputKeys: string[];
  setInputKeys: React.Dispatch<React.SetStateAction<string[]>>;
}> = (props) => {
  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    event.preventDefault();
    event.stopPropagation();
    if (!event.repeat) {
      props.setInputKeys((prev) => {
        if (prev.includes(event.key.toUpperCase())) {
          return prev;
        } else {
          return [...prev, event.key.toUpperCase()];
        }
      });
    }
  }

  function handleKeyUp(event: React.KeyboardEvent<HTMLInputElement>) {
    props.setInputKeys((prev) => {
      return prev.filter((key) => key !== event.key.toUpperCase());
    });
  }

  return (
    <div className="w-full h-28 relative">
      <input
        className="w-full h-28 p-0 box-border text-7xl bg-primary-light"
        type="text"
        onKeyDown={handleKeyDown}
        onKeyUp={handleKeyUp}
        readOnly={true}
        autoFocus={true}
      />
      <div className="absolute w-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        {props.inputKeys.map((pressedKey) => {
          const keycapIndex = Keycaps.findIndex((key) => {
            return key.key == pressedKey;
          });
          if (keycapIndex !== -1) {
            return (
              <img
                className="h-16 inline-block pl-4"
                src={Keycaps[keycapIndex].keycap}
                alt="FleetCode Logo"
              />
            );
          }
        })}
      </div>
    </div>
  );
};

export default ControlledPracticeInput;

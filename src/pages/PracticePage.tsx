import NavBar from "../components/NavBar";
import FinishModal from "../components/FinishModal";
import ControlledInput from "../components/ControlledInput";
import { useState } from "react";

const defaultShortcuts = [
  { prompt: "Show Command Palette", keybind: ["CONTROL", "SHIFT", "P"] },
  // { prompt: "New Window/Instance", keybind: ["CONTROL", "SHIFT", "N"] },
  { prompt: "Move Line Up", keybind: ["ALT", "ARROWUP"] },
  { prompt: "Move Line Down", keybind: ["ALT", "ARROWDOWN"] },
  { prompt: "Copy Line Up", keybind: ["SHIFT", "ALT", "ARROWUP"] },
  { prompt: "Copy Line Down", keybind: ["SHIFT", "ALT", "ARROWDOWN"] },
  { prompt: "Indent Line", keybind: ["CONTROL", "["] },
  { prompt: "Outdent Line", keybind: ["CONTROL", "]"] },
  { prompt: "Toggle Word Wrap", keybind: ["ALT", "Z"] },
  { prompt: "Go to File", keybind: ["CONTROL", "P"] },
  { prompt: "Find", keybind: ["CONTROL", "F"] },
  { prompt: "Replace", keybind: ["CONTROL", "H"] },
  // { prompt: "Trigger Suggestion", keybind: ["CONTROL", " "] },
  { prompt: "Trigger Parameter Hints", keybind: ["CONTROL", "SHIFT", " "] },
];

export default function PracticePage() {
  const [shortcutIndex, setShortcutIndex] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);
  const [inputKeys, setInputKeys] = useState<string[]>([]);
  const [shortcuts, setShortcuts] = useState<
    { prompt: string; keybind: string[] }[]
  >([]);

  const playerIsFinished = shortcutIndex == shortcuts.length;

  function didStartPractice() {
    if (timerRunning == false && inputKeys.includes("ENTER")) {
      setShortcuts(defaultShortcuts);
      setTimerRunning(true);
    }
  }

  function isInputCorrect() {
    if (!playerIsFinished) {
      if (
        inputKeys.length == shortcuts[shortcutIndex].keybind.length &&
        JSON.stringify(inputKeys) ==
          JSON.stringify(shortcuts[shortcutIndex].keybind)
      ) {
        setShortcutIndex((prev) => {
          return prev + 1;
        });
      }
    } else {
      onPlayerFinish();
    }
  }

  function onPlayerFinish() {
    setTimerRunning(false);
  }

  function resetPractice() {
    setShortcutIndex(0);
    setInputKeys([]);
    //reset timer to 00:00:00
  }
  //startTimer somewhere

  didStartPractice();
  timerRunning && isInputCorrect();

  if (playerIsFinished && shortcuts.length != 0) {
    return <FinishModal restart={resetPractice} />;
  } else {
    return (
      <>
        <NavBar />
        <section className="flex justify-between pb-8 px-8">
          <aside className="w-72 h-24 pl-2 flex flex-col justify-center text-2xl bg-primary-light">
            <h3>Ctrl + Backspace to Quit</h3>
          </aside>
          <aside className="w-72 h-24 text-center flex flex-col justify-center text-5xl bg-primary-light">
            00:00:000
          </aside>
        </section>
        <section className="w-3/4 h-2/5 m-auto p-8 flex justify-center bg-primary-light ">
          <h1 className="m-auto text-7xl">
            {timerRunning
              ? shortcuts.length
                ? shortcuts[shortcutIndex].prompt
                : "There was an error starting the practice. Please refresh"
              : "Press Enter to start the practice"}
          </h1>
        </section>
        <section className="w-3/4  mx-auto mt-8 flex justify-center bg-primary-light ">
          <ControlledInput setInputKeys={setInputKeys} inputKeys={inputKeys} />
        </section>
      </>
    );
  }
}

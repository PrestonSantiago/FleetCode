import { useState, useContext, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { TimerContext } from "../store/timer-context";
import NavBar from "../components/NavBar";
import FinishModal from "../components/FinishModal";
import ControlledInput from "../components/ControlledInput";
import Timer from "../components/Timer";

const defaultShortcuts = [
  { prompt: "Show Command Palette", keybind: ["CONTROL", "SHIFT", "P"] },
  // { prompt: "New Window/Instance", keybind: ["CONTROL", "SHIFT", "N"] },
  { prompt: "Move Line Up", keybind: ["ALT", "ARROWUP"] },
  { prompt: "Move Line Down", keybind: ["ALT", "ARROWDOWN"] },
  { prompt: "Copy Line Up", keybind: ["SHIFT", "ALT", "ARROWUP"] },
  { prompt: "Copy Line Down", keybind: ["SHIFT", "ALT", "ARROWDOWN"] },
  // { prompt: "Indent Line", keybind: ["CONTROL", "["] },
  // { prompt: "Outdent Line", keybind: ["CONTROL", "]"] },
  // { prompt: "Toggle Word Wrap", keybind: ["ALT", "Z"] },
  // { prompt: "Go to File", keybind: ["CONTROL", "P"] },
  // { prompt: "Find", keybind: ["CONTROL", "F"] },
  // { prompt: "Replace", keybind: ["CONTROL", "H"] },
  // // { prompt: "Trigger Suggestion", keybind: ["CONTROL", " "] },
  // { prompt: "Trigger Parameter Hints", keybind: ["CONTROL", "SHIFT", " "] },
];

export default function PracticePage() {
  const [inputKeys, setInputKeys] = useState<string[]>([]);
  const shortcutIndex = useRef(0);
  const [shortcuts, setShortcuts] = useState<
    { prompt: string; keybind: string[] }[]
  >([]);
  const [showHint, setShowHint] = useState(false);
  const navigate = useNavigate();
  const {
    dateTimes,
    setDateTimes,
    timerRunning,
    setTimerRunning,
    startTimer,
    stopTimer,
  } = useContext(TimerContext);

  const playerIsFinished = shortcutIndex.current == shortcuts.length;

  function handleInput() {
    console.log(inputKeys);
    if (JSON.stringify(inputKeys) == '["CONTROL","BACKSPACE"]') {
      navigate("/");
    } else if (timerRunning) {
      if (inputKeys.includes("CAPSLOCK")) {
        setShowHint((prev) => !prev);
      } else {
        isInputCorrect();
      }
    } else if (inputKeys.includes("ENTER")) {
      startPractice();
    }
  }

  function startPractice() {
    setTimerRunning(true);
    setShortcuts(defaultShortcuts);
    startTimer();
    if (dateTimes.startTime == 0) {
      setDateTimes({ startTime: Date.now(), endTime: Date.now() });
    }
  }

  function isInputCorrect() {
    if (!playerIsFinished) {
      if (
        inputKeys.length == shortcuts[shortcutIndex.current].keybind.length &&
        JSON.stringify(inputKeys) ==
          JSON.stringify(shortcuts[shortcutIndex.current].keybind)
      ) {
        shortcutIndex.current += 1;
      }
    } else {
      onPlayerFinish();
    }
  }

  function onPlayerFinish() {
    setTimerRunning(false);
    stopTimer();
    setDateTimes((prev) => {
      const newDateTimes = { ...prev };
      newDateTimes.endTime = Date.now();
      return newDateTimes;
    });
  }

  function resetPractice() {
    shortcutIndex.current = 0;
    setInputKeys([]);
    setDateTimes({ startTime: 0, endTime: 0 });
    setShowHint(false);
  }

  useEffect(() => {
    handleInput();
  }, [handleInput, inputKeys]);

  if (playerIsFinished && shortcuts.length != 0) {
    return <FinishModal restart={resetPractice} />;
  } else {
    return (
      <>
        <NavBar />
        <section className="flex justify-between pb-8 px-8">
          <aside className="w-72 h-24 pl-2 flex flex-col justify-center text-2xl bg-primary-light">
            <h3>Caps Lock to {showHint ? "Hide" : "Show"} Hint</h3>
            <h3>Ctrl + Backspace to Quit</h3>
          </aside>
          <Timer />
        </section>
        <section className="w-3/4 h-2/5 m-auto p-8 flex flex-col justify-center bg-primary-light ">
          <h1 className="m-auto text-7xl">
            {timerRunning
              ? shortcuts.length
                ? shortcuts[shortcutIndex.current].prompt
                : "There was an error starting the practice. Please refresh"
              : "Press Enter to start the practice"}
          </h1>
          {showHint && (
            <h1 className="m-auto p-4 text-7xl border border-primary-dark rounded-xl">
              {"Hint: " + shortcuts[shortcutIndex.current].keybind.join(" + ")}
            </h1>
          )}
        </section>
        <section className="w-3/4  mx-auto mt-8 flex justify-center bg-primary-light ">
          <ControlledInput setInputKeys={setInputKeys} inputKeys={inputKeys} />
        </section>
      </>
    );
  }
}

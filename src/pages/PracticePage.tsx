import { useState, useContext, useRef, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { TimerContext } from "../store/timer-context";
import NavBar from "../components/NavBar";
import FinishModal from "../components/FinishModal";
import ControlledPracticeInput from "../components/ControlledPracticeInput";
import Timer from "../components/Timer";
import { StatsContext } from "../store/stats-context";
import { SettingsContext } from "../store/settings-context";
import Shortcut from "../models/shortcut";

export default function PracticePage() {
  const [inputKeys, setInputKeys] = useState<string[]>([]);
  const shortcutIndex = useRef(0);
  const [randomShortcuts, setRandomShortcuts] = useState<Shortcut[]>([]);
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
  const { updateStats } = useContext(StatsContext);
  const { settings } = useContext(SettingsContext);

  const playerIsFinished = shortcutIndex.current === randomShortcuts.length;

  const setRandomActiveShortcuts = useCallback((amountToPractice = 20) => {
    const randomActiveShortcuts:Shortcut[] = [];
    const activeShortcuts = settings.filter((shortcut) => {
      return shortcut.active == true
    })
    console.log(activeShortcuts);
    if(activeShortcuts.length !== 0){
      for( let i=0; i<amountToPractice; i++){
        const randomIndex = Math.floor(Math.random() * activeShortcuts.length);
        randomActiveShortcuts.push(activeShortcuts[randomIndex])
      }
    }
    setRandomShortcuts(randomActiveShortcuts);
  }, [settings])

  const startPractice = useCallback(() => {
    setTimerRunning(true);
    setRandomActiveShortcuts();
    startTimer();
    if (dateTimes.startTime === 0) {
      setDateTimes({ startTime: Date.now(), endTime: Date.now() });
    }
  }, [
    setTimerRunning,
    setRandomActiveShortcuts,
    startTimer,
    setDateTimes,
    dateTimes.startTime,
  ]);

  const isInputCorrect = useCallback(
    (input: string[]) => {
      if (shortcutIndex.current !== randomShortcuts.length) {
        if (
          input.length === randomShortcuts[shortcutIndex.current].keybind.length &&
          JSON.stringify(input) ===
            JSON.stringify(randomShortcuts[shortcutIndex.current].keybind)
        ) {
          shortcutIndex.current += 1;
        }
      } else {
        setTimerRunning(false);
        stopTimer();
        setDateTimes((prev) => {
          const newDateTimes = { ...prev };
          newDateTimes.endTime = Date.now();
          return newDateTimes;
        });
        updateStats(new Date(), dateTimes.endTime - dateTimes.startTime);
      }
    },
    [
      randomShortcuts,
      stopTimer,
      setTimerRunning,
      setDateTimes,
      updateStats,
      dateTimes.endTime,
      dateTimes.startTime,
    ]
  );

  const handleInput = useCallback(
    (input: string[]) => {
      if (JSON.stringify(input) === '["CONTROL","BACKSPACE"]') {
        navigate("/");
      } else if (timerRunning) {
        if (input.includes("CAPSLOCK")) {
          setShowHint((prev) => !prev);
        } else {
          isInputCorrect(input);
        }
      } else if (input.includes("ENTER")) {
        startPractice();
      }
    },
    [navigate, timerRunning, startPractice, isInputCorrect]
  );

  useEffect(() => {
    handleInput(inputKeys);
  }, [inputKeys, handleInput]);

  function resetPractice() {
    shortcutIndex.current = 0;
    setInputKeys([]);
    setDateTimes({ startTime: 0, endTime: 0 });
    setShowHint(false);
  }

  if (playerIsFinished && randomShortcuts.length !== 0) {
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
              ? randomShortcuts.length
                ? randomShortcuts[shortcutIndex.current].prompt
                : "There was an error starting the practice. Please refresh"
              : "Press Enter to start the practice"}
          </h1>
          {showHint && (
            <h1 className="m-auto p-4 text-7xl border border-primary-dark rounded-xl">
              {"Hint: " + randomShortcuts[shortcutIndex.current].keybind.join(" + ")}
            </h1>
          )}
        </section>
        <section className="w-3/4 mx-auto mt-8 flex justify-center bg-primary-light ">
          <ControlledPracticeInput
            setInputKeys={setInputKeys}
            inputKeys={inputKeys}
          />
        </section>
      </>
    );
  }
}

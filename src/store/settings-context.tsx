import { createContext, useState } from "react";
import Shortcut from "../models/shortcut";
import type { ReactNode } from "react";

const defaultShortcuts = [
  // General
  {
    prompt: "Show Command Palette",
    keybind: ["CTRL", "SHIFT", "P"],
    active: true,
  },
  { prompt: "Quick Open, Go to File...", keybind: ["CTRL", "P"], active: true },
  {
    prompt: "New Window/Instance",
    keybind: ["CTRL", "SHIFT", "N"],
    active: true,
  },
  {
    prompt: "Close Window/Instance",
    keybind: ["CTRL", "SHIFT", "W"],
    active: true,
  },
  { prompt: "User Settings", keybind: ["CTRL", ","], active: true },
  {
    prompt: "Keyboard Shortcuts",
    keybind: ["CTRL", "K", "CTRL", "S"],
    active: true,
  },

  // Basic Editing
  {
    prompt: "Cut Line (empty selection)",
    keybind: ["CTRL", "X"],
    active: true,
  },
  {
    prompt: "Copy Line (empty selection)",
    keybind: ["CTRL", "C"],
    active: true,
  },
  { prompt: "Move Line Up", keybind: ["ALT", "UP"], active: true },
  { prompt: "Move Line Down", keybind: ["ALT", "DOWN"], active: true },
  { prompt: "Copy Line Up", keybind: ["SHIFT", "ALT", "UP"], active: true },
  { prompt: "Copy Line Down", keybind: ["SHIFT", "ALT", "DOWN"], active: true },
  { prompt: "Delete Line", keybind: ["CTRL", "SHIFT", "K"], active: true },
  { prompt: "Insert Line Below", keybind: ["CTRL", "ENTER"], active: true },
  {
    prompt: "Insert Line Above",
    keybind: ["CTRL", "SHIFT", "ENTER"],
    active: true,
  },
  { prompt: "Jump to Matching Bracket", keybind: ["CTRL", "]"], active: true },
  { prompt: "Indent Line", keybind: ["CTRL", "]"], active: true },
  { prompt: "Outdent Line", keybind: ["CTRL", "["], active: true },
  { prompt: "Go to Beginning of Line", keybind: ["HOME"], active: true },
  { prompt: "Go to End of Line", keybind: ["END"], active: true },
  { prompt: "Scroll Line Up", keybind: ["CTRL", "UP"], active: true },
  { prompt: "Scroll Line Down", keybind: ["CTRL", "DOWN"], active: true },
  { prompt: "Scroll Page Up", keybind: ["ALT", "PgUp"], active: true },
  { prompt: "Scroll Page Down", keybind: ["ALT", "PgDn"], active: true },
  {
    prompt: "Fold (Collapse) Region",
    keybind: ["CTRL", "SHIFT", "["],
    active: true,
  },
  {
    prompt: "Unfold (Expand) Region",
    keybind: ["CTRL", "SHIFT", "]"],
    active: true,
  },
  {
    prompt: "Fold (Collapse) All Subregions",
    keybind: ["CTRL", "K", "CTRL", "0"],
    active: true,
  },
  {
    prompt: "Unfold (Expand) All Subregions",
    keybind: ["CTRL", "K", "CTRL", "J"],
    active: true,
  },
  {
    prompt: "Add Line Comment",
    keybind: ["CTRL", "K", "CTRL", "C"],
    active: true,
  },
  {
    prompt: "Remove Line Comment",
    keybind: ["CTRL", "K", "CTRL", "U"],
    active: true,
  },
  { prompt: "Toggle Line Comment", keybind: ["CTRL", "/"], active: true },
  {
    prompt: "Toggle Block Comment",
    keybind: ["SHIFT", "ALT", "A"],
    active: true,
  },
  { prompt: "Toggle Word Wrap", keybind: ["ALT", "Z"], active: true },

  // Navigation
  { prompt: "Show All Symbols", keybind: ["CTRL", "T"], active: true },
  { prompt: "Go to Line...", keybind: ["CTRL", "G"], active: true },
  { prompt: "Go to File...", keybind: ["CTRL", "P"], active: true },
  { prompt: "Go to Symbol...", keybind: ["CTRL", "SHIFT", "O"], active: true },
  {
    prompt: "Show Problems Panel",
    keybind: ["CTRL", "SHIFT", "M"],
    active: true,
  },
  { prompt: "Go to Next Error or Warning", keybind: ["F8"], active: true },
  {
    prompt: "Go to Previous Error or Warning",
    keybind: ["SHIFT", "F8"],
    active: true,
  },
  {
    prompt: "Navigate Editor Group History",
    keybind: ["CTRL", "SHIFT", "TAB"],
    active: true,
  },
  { prompt: "Go Back", keybind: ["ALT", "LEFT"], active: true },
  { prompt: "Go Forward", keybind: ["ALT", "RIGHT"], active: true },

  // Search and Replace
  { prompt: "Find", keybind: ["CTRL", "F"], active: true },
  { prompt: "Replace", keybind: ["CTRL", "H"], active: true },
  { prompt: "Find Next", keybind: ["F3"], active: true },
  { prompt: "Find Previous", keybind: ["SHIFT", "F3"], active: true },
  {
    prompt: "Select All Occurrences of Find Match",
    keybind: ["CTRL", "SHIFT", "L"],
    active: true,
  },
  {
    prompt: "Add Selection to Next Find Match",
    keybind: ["CTRL", "D"],
    active: true,
  },
  {
    prompt: "Move Last Selection to Next Find Match",
    keybind: ["CTRL", "K", "CTRL", "D"],
    active: true,
  },
  { prompt: "Toggle Case-Sensitive", keybind: ["ALT", "C"], active: true },
  { prompt: "Toggle Regular Expression", keybind: ["ALT", "R"], active: true },
  { prompt: "Toggle Whole Word", keybind: ["ALT", "W"], active: true },

  // Multi-cursor and Selection
  { prompt: "Insert Cursor", keybind: ["ALT", "CLICK"], active: true },
  {
    prompt: "Insert Cursor Above",
    keybind: ["CTRL", "ALT", "UP"],
    active: true,
  },
  {
    prompt: "Insert Cursor Below",
    keybind: ["CTRL", "ALT", "DOWN"],
    active: true,
  },
  {
    prompt: "Undo Last Cursor Operation",
    keybind: ["CTRL", "U"],
    active: true,
  },
  {
    prompt: "Insert Cursor at End of Each Line Selected",
    keybind: ["SHIFT", "ALT", "I"],
    active: true,
  },
  { prompt: "Select Current Line", keybind: ["CTRL", "L"], active: true },
  {
    prompt: "Select All Occurrences of Current Selection",
    keybind: ["CTRL", "SHIFT", "L"],
    active: true,
  },
  {
    prompt: "Expand Selection",
    keybind: ["SHIFT", "ALT", "RIGHT"],
    active: true,
  },
  {
    prompt: "Shrink Selection",
    keybind: ["SHIFT", "ALT", "LEFT"],
    active: true,
  },
  {
    prompt: "Column (Box) Selection Up",
    keybind: ["CTRL", "SHIFT", "ALT", "UP"],
    active: true,
  },
  {
    prompt: "Column (Box) Selection Down",
    keybind: ["CTRL", "SHIFT", "ALT", "DOWN"],
    active: true,
  },
  {
    prompt: "Column (Box) Selection Left",
    keybind: ["CTRL", "SHIFT", "ALT", "LEFT"],
    active: true,
  },
  {
    prompt: "Column (Box) Selection Right",
    keybind: ["CTRL", "SHIFT", "ALT", "RIGHT"],
    active: true,
  },
  {
    prompt: "Column (Box) Selection Page Up",
    keybind: ["CTRL", "SHIFT", "ALT", "PgUp"],
    active: true,
  },
  {
    prompt: "Column (Box) Selection Page Down",
    keybind: ["CTRL", "SHIFT", "ALT", "PgDn"],
    active: true,
  },

  // Rich Languages Editing
  { prompt: "Trigger Suggest", keybind: ["CTRL", "SPACE"], active: true },
  {
    prompt: "Trigger Parameter Hints",
    keybind: ["CTRL", "SHIFT", "SPACE"],
    active: true,
  },
  { prompt: "Format Document", keybind: ["SHIFT", "ALT", "F"], active: true },
  {
    prompt: "Format Selection",
    keybind: ["CTRL", "K", "CTRL", "F"],
    active: true,
  },
  { prompt: "Go to Definition", keybind: ["F12"], active: true },
  { prompt: "Peek Definition", keybind: ["ALT", "F12"], active: true },
  {
    prompt: "Open Definition to the Side",
    keybind: ["CTRL", "K", "F12"],
    active: true,
  },
  { prompt: "Quick Fix", keybind: ["CTRL", "."], active: true },
  { prompt: "Show References", keybind: ["SHIFT", "F12"], active: true },
  { prompt: "Rename Symbol", keybind: ["F2"], active: true },
  {
    prompt: "Trim Trailing Whitespace",
    keybind: ["CTRL", "K", "CTRL", "X"],
    active: true,
  },
  { prompt: "Change All Occurrences", keybind: ["CTRL", "F2"], active: true },
  {
    prompt: "Select All Occurrences of Current Word",
    keybind: ["CTRL", "SHIFT", "L"],
    active: true,
  },

  // Editor Management
  { prompt: "Close Editor", keybind: ["CTRL", "F4"], active: true },
  { prompt: "Close Folder", keybind: ["CTRL", "K", "F"], active: true },
  { prompt: "Split Editor", keybind: ["CTRL", "\\"], active: true },
  {
    prompt: "Focus into 1st Editor Group",
    keybind: ["CTRL", "1"],
    active: true,
  },
  {
    prompt: "Focus into 2nd Editor Group",
    keybind: ["CTRL", "2"],
    active: true,
  },
  {
    prompt: "Focus into 3rd Editor Group",
    keybind: ["CTRL", "3"],
    active: true,
  },
  {
    prompt: "Focus into Next Editor Group",
    keybind: ["CTRL", "K", "RIGHT"],
    active: true,
  },
  {
    prompt: "Focus into Previous Editor Group",
    keybind: ["CTRL", "K", "LEFT"],
    active: true,
  },
  {
    prompt: "Move Editor Left",
    keybind: ["CTRL", "SHIFT", "PgUp"],
    active: true,
  },
  {
    prompt: "Move Editor Right",
    keybind: ["CTRL", "SHIFT", "PgDn"],
    active: true,
  },
  {
    prompt: "Move Active Editor Group",
    keybind: ["CTRL", "K", "CTRL", "LEFT"],
    active: true,
  },
  {
    prompt: "Move Active Editor Group",
    keybind: ["CTRL", "K", "CTRL", "RIGHT"],
    active: true,
  },

  // File Management
  { prompt: "New File", keybind: ["CTRL", "N"], active: true },
  { prompt: "Open File...", keybind: ["CTRL", "O"], active: true },
  { prompt: "Save", keybind: ["CTRL", "S"], active: true },
  { prompt: "Save As...", keybind: ["CTRL", "SHIFT", "S"], active: true },
  { prompt: "Save All", keybind: ["CTRL", "K", "S"], active: true },
  { prompt: "Close", keybind: ["CTRL", "F4"], active: true },
  { prompt: "Close All", keybind: ["CTRL", "K", "CTRL", "W"], active: true },
  {
    prompt: "Reopen Closed Editor",
    keybind: ["CTRL", "SHIFT", "T"],
    active: true,
  },
  {
    prompt: "Keep Preview Mode Editor Open",
    keybind: ["CTRL", "K", "ENTER"],
    active: true,
  },
  { prompt: "Open Next", keybind: ["CTRL", "TAB"], active: true },
  { prompt: "Open Previous", keybind: ["CTRL", "SHIFT", "TAB"], active: true },
  {
    prompt: "Copy Path of Active File",
    keybind: ["CTRL", "K", "P"],
    active: true,
  },
  {
    prompt: "Reveal Active File in Explorer",
    keybind: ["CTRL", "K", "R"],
    active: true,
  },
  {
    prompt: "Show Active File in New Window/Instance",
    keybind: ["CTRL", "K", "O"],
    active: true,
  },

  // Display
  { prompt: "Toggle Full Screen", keybind: ["F11"], active: true },
  {
    prompt: "Toggle Editor Layout (Horizontal/Vertical)",
    keybind: ["SHIFT", "ALT", "0"],
    active: true,
  },
  { prompt: "Zoom In/Out", keybind: ["CTRL", "=", "CTRL", "-"], active: true },
  { prompt: "Toggle Sidebar Visibility", keybind: ["CTRL", "B"], active: true },
  {
    prompt: "Show Explorer / Toggle Focus",
    keybind: ["CTRL", "SHIFT", "E"],
    active: true,
  },
  { prompt: "Show Search", keybind: ["CTRL", "SHIFT", "F"], active: true },
  {
    prompt: "Show Source Control",
    keybind: ["CTRL", "SHIFT", "G"],
    active: true,
  },
  { prompt: "Show Debug", keybind: ["CTRL", "SHIFT", "D"], active: true },
  { prompt: "Show Extensions", keybind: ["CTRL", "SHIFT", "X"], active: true },
  { prompt: "Replace in Files", keybind: ["CTRL", "SHIFT", "H"], active: true },
  {
    prompt: "Toggle Search Details",
    keybind: ["CTRL", "SHIFT", "J"],
    active: true,
  },
  {
    prompt: "Show Output Panel",
    keybind: ["CTRL", "SHIFT", "U"],
    active: true,
  },
  {
    prompt: "Open Markdown Preview",
    keybind: ["CTRL", "SHIFT", "V"],
    active: true,
  },
  {
    prompt: "Open Markdown Preview to the Side",
    keybind: ["CTRL", "K", "V"],
    active: true,
  },
  {
    prompt: "Zen Mode (Esc Esc to exit)",
    keybind: ["CTRL", "K", "Z"],
    active: true,
  },

  // Debug
  { prompt: "Toggle Breakpoint", keybind: ["F9"], active: true },
  { prompt: "Start/Continue", keybind: ["F5"], active: true },
  { prompt: "Stop", keybind: ["SHIFT", "F5"], active: true },
  { prompt: "Step into", keybind: ["F11"], active: true },
  { prompt: "Step over", keybind: ["F10"], active: true },
  { prompt: "Step out", keybind: ["SHIFT", "F11"], active: true },
  { prompt: "Restart", keybind: ["CTRL", "SHIFT", "F5"], active: true },
  { prompt: "Show Hover", keybind: ["CTRL", "K", "CTRL", "I"], active: true },

  // Integrated Terminal
  { prompt: "Show Integrated Terminal", keybind: ["CTRL", "`"], active: true },
  {
    prompt: "Create New Terminal",
    keybind: ["CTRL", "SHIFT", "`"],
    active: true,
  },
  { prompt: "Copy Selection", keybind: ["CTRL", "C"], active: true },
  {
    prompt: "Paste into Active Terminal",
    keybind: ["CTRL", "V"],
    active: true,
  },
  {
    prompt: "Scroll Up/Down",
    keybind: ["CTRL", "UP", "CTRL", "DOWN"],
    active: true,
  },
  {
    prompt: "Scroll Page Up/Down",
    keybind: ["CTRL", "PgUp", "CTRL", "PgDn"],
    active: true,
  },
  {
    prompt: "Scroll to Top/Bottom",
    keybind: ["CTRL", "HOME", "CTRL", "END"],
    active: true,
  },
];

interface SettingsContextType {
  settings: Shortcut[];
  updateSettings: () => void;
}

export const SettingsContext = createContext<SettingsContextType>({
  settings: [{ prompt: "", keybind: [""], active: true }],
  updateSettings: () => {},
});

const SettingsContextProvider: React.FC<{ children: ReactNode }> = (props) => {
  const [settings, setSettings] = useState(defaultShortcuts);

  function updateSettings() {
    setSettings((prev) => prev);
  }

  const contextValue = {
    settings,
    updateSettings,
  };

  return (
    <SettingsContext.Provider value={contextValue}>
      {props.children}
    </SettingsContext.Provider>
  );
};

export default SettingsContextProvider;

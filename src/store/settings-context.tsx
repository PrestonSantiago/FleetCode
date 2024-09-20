import { createContext, useState } from "react";
import Shortcut from "../models/shortcut";
import type { ReactNode } from "react";

const defaultShortcuts = [
  // General
  {
    prompt: "Show Command Palette",
    keybind: ["CONTROL", "SHIFT", "P"],
    active: true,
  },
  { prompt: "Quick Open, Go to File...", keybind: ["CONTROL", "P"], active: true },
  {
    prompt: "New Window/Instance",
    keybind: ["CONTROL", "SHIFT", "N"],
    active: false,
  },
  {
    prompt: "Close Window/Instance",
    keybind: ["CONTROL", "SHIFT", "W"],
    active: false,
  },
  { prompt: "User Settings", keybind: ["CONTROL", ","], active: true },
  {
    prompt: "Keyboard Shortcuts",
    keybind: ["CONTROL", "S"],
    active: true,
  },

  // Basic Editing
  {
    prompt: "Cut Line (empty selection)",
    keybind: ["CONTROL", "X"],
    active: true,
  },
  {
    prompt: "Copy Line (empty selection)",
    keybind: ["CONTROL", "C"],
    active: true,
  },
  { prompt: "Move Line Up", keybind: ["ALT", "ARROWUP"], active: true },
  { prompt: "Move Line Down", keybind: ["ALT", "ARROWDOWN"], active: true },
  { prompt: "Copy Line Up", keybind: ["SHIFT", "ALT", "ARROWUP"], active: true },
  { prompt: "Copy Line Down", keybind: ["SHIFT", "ALT", "ARROWDOWN"], active: true },
  { prompt: "Delete Line", keybind: ["CONTROL", "SHIFT", "K"], active: true },
  { prompt: "Insert Line Below", keybind: ["CONTROL", "ENTER"], active: true },
  {
    prompt: "Insert Line Above",
    keybind: ["CONTROL", "SHIFT", "ENTER"],
    active: true,
  },
  { prompt: "Jump to Matching Bracket", keybind: ["CONTROL", "]"], active: true },
  { prompt: "Indent Line", keybind: ["CONTROL", "]"], active: true },
  { prompt: "Outdent Line", keybind: ["CONTROL", "["], active: true },
  { prompt: "Go to Beginning of Line", keybind: ["HOME"], active: true },
  { prompt: "Go to End of Line", keybind: ["END"], active: true },
  { prompt: "Scroll Line Up", keybind: ["CONTROL", "ARROWUP"], active: true },
  { prompt: "Scroll Line Down", keybind: ["CONTROL", "ARROWDOWN"], active: true },
  { prompt: "Scroll Page Up", keybind: ["ALT", "PAGEUP"], active: true },
  { prompt: "Scroll Page Down", keybind: ["ALT", "PAGEDOWN"], active: true },
  {
    prompt: "Fold (Collapse) Region",
    keybind: ["CONTROL", "SHIFT", "["],
    active: false,
  },
  {
    prompt: "Unfold (Expand) Region",
    keybind: ["CONTROL", "SHIFT", "]"],
    active: false,
  },
  {
    prompt: "Fold (Collapse) All Subregions",
    keybind: ["CONTROL", "0"],
    active: true,
  },
  {
    prompt: "Unfold (Expand) All Subregions",
    keybind: ["CONTROL", "J"],
    active: true,
  },
  {
    prompt: "Add Line Comment",
    keybind: ["CONTROL", "C"],
    active: true,
  },
  {
    prompt: "Remove Line Comment",
    keybind: ["CONTROL", "U"],
    active: true,
  },
  { prompt: "Toggle Line Comment", keybind: ["CONTROL", "/"], active: false },
  {
    prompt: "Toggle Block Comment",
    keybind: ["SHIFT", "ALT", "A"],
    active: true,
  },
  { prompt: "Toggle Word Wrap", keybind: ["ALT", "Z"], active: true },

  // Navigation
  { prompt: "Show All Symbols", keybind: ["CONTROL", "T"], active: false },
  { prompt: "Go to Line...", keybind: ["CONTROL", "G"], active: false },
  { prompt: "Go to File...", keybind: ["CONTROL", "P"], active: true },
  { prompt: "Go to Symbol...", keybind: ["CONTROL", "SHIFT", "O"], active: true },
  {
    prompt: "Show Problems Panel",
    keybind: ["CONTROL", "SHIFT", "M"],
    active: false,
  },
  { prompt: "Go to Next Error or Warning", keybind: ["F8"], active: true },
  {
    prompt: "Go to Previous Error or Warning",
    keybind: ["SHIFT", "F8"],
    active: false,
  },
  {
    prompt: "Navigate Editor Group History",
    keybind: ["CONTROL", "SHIFT", "TAB"],
    active: false,
  },
  { prompt: "Go Back", keybind: ["ALT", "ARROWLEFT"], active: true },
  { prompt: "Go Forward", keybind: ["ALT", "ARROWRIGHT"], active: true },

  // Search and Replace
  { prompt: "Find", keybind: ["CONTROL", "F"], active: true },
  { prompt: "Replace", keybind: ["CONTROL", "H"], active: true },
  { prompt: "Find Next", keybind: ["F3"], active: false },
  { prompt: "Find Previous", keybind: ["SHIFT", "F3"], active: false },
  {
    prompt: "Select All Occurrences of Find Match",
    keybind: ["CONTROL", "SHIFT", "L"],
    active: true,
  },
  {
    prompt: "Add Selection to Next Find Match",
    keybind: ["CONTROL", "D"],
    active: true,
  },
  {
    prompt: "Move Last Selection to Next Find Match",
    keybind: ["CONTROL", "D"],
    active: true,
  },
  { prompt: "Toggle Case-Sensitive", keybind: ["ALT", "C"], active: true },
  { prompt: "Toggle Regular Expression", keybind: ["ALT", "R"], active: true },
  { prompt: "Toggle Whole Word", keybind: ["ALT", "W"], active: true },

  // Multi-cursor and Selection
  {
    prompt: "Insert Cursor Above",
    keybind: ["CONTROL", "ALT", "ARROWUP"],
    active: true,
  },
  {
    prompt: "Insert Cursor Below",
    keybind: ["CONTROL", "ALT", "ARROWDOWN"],
    active: true,
  },
  {
    prompt: "Undo Last Cursor Operation",
    keybind: ["CONTROL", "U"],
    active: true,
  },
  {
    prompt: "Insert Cursor at End of Each Line Selected",
    keybind: ["SHIFT", "ALT", "I"],
    active: true,
  },
  { prompt: "Select Current Line", keybind: ["CONTROL", "L"], active: true },
  {
    prompt: "Select All Occurrences of Current Selection",
    keybind: ["CONTROL", "SHIFT", "L"],
    active: true,
  },
  {
    prompt: "Expand Selection",
    keybind: ["SHIFT", "ALT", "ARROWRIGHT"],
    active: true,
  },
  {
    prompt: "Shrink Selection",
    keybind: ["SHIFT", "ALT", "ARROWLEFT"],
    active: true,
  },
  {
    prompt: "Column (Box) Selection Up",
    keybind: ["CONTROL", "SHIFT", "ALT", "ARROWUP"],
    active: true,
  },
  {
    prompt: "Column (Box) Selection Down",
    keybind: ["CONTROL", "SHIFT", "ALT", "ARROWDOWN"],
    active: true,
  },
  {
    prompt: "Column (Box) Selection Left",
    keybind: ["CONTROL", "SHIFT", "ALT", "ARROWLEFT"],
    active: true,
  },
  {
    prompt: "Column (Box) Selection Right",
    keybind: ["CONTROL", "SHIFT", "ALT", "ARROWRIGHT"],
    active: true,
  },
  {
    prompt: "Column (Box) Selection Page Up",
    keybind: ["CONTROL", "SHIFT", "ALT", "PAGEUP"],
    active: true,
  },
  {
    prompt: "Column (Box) Selection Page Down",
    keybind: ["CONTROL", "SHIFT", "ALT", "PAGEDOWN"],
    active: true,
  },

  // Rich Languages Editing
  { prompt: "Trigger Suggest", keybind: ["CONTROL", "SPACE"], active: false },
  {
    prompt: "Trigger Parameter Hints",
    keybind: ["CONTROL", "SHIFT", " "],
    active: false,
  },
  { prompt: "Format Document", keybind: ["SHIFT", "ALT", "F"], active: true },
  {
    prompt: "Format Selection",
    keybind: ["CONTROL", "F"],
    active: true,
  },
  { prompt: "Go to Definition", keybind: ["F12"], active: true },
  { prompt: "Peek Definition", keybind: ["ALT", "F12"], active: false },
  {
    prompt: "Open Definition to the Side",
    keybind: ["F12"],
    active: true,
  },
  { prompt: "Quick Fix", keybind: ["CONTROL", "."], active: true },
  { prompt: "Show References", keybind: ["SHIFT", "F12"], active: false },
  { prompt: "Rename Symbol", keybind: ["F2"], active: true },
  {
    prompt: "Trim Trailing Whitespace",
    keybind: ["CONTROL", "X"],
    active: true,
  },
  { prompt: "Change All Occurrences", keybind: ["CONTROL", "F2"], active: false },
  {
    prompt: "Select All Occurrences of Current Word",
    keybind: ["CONTROL", "SHIFT", "L"],
    active: true,
  },

  // Editor Management
  { prompt: "Close Editor", keybind: ["CONTROL", "F4"], active: false },
  { prompt: "Close Folder", keybind: ["CONTROL", "K", "F"], active: true },
  { prompt: "Split Editor", keybind: ["CONTROL", "\\"], active: true },
  {
    prompt: "Focus into 1st Editor Group",
    keybind: ["CONTROL", "1"],
    active: true,
  },
  {
    prompt: "Focus into 2nd Editor Group",
    keybind: ["CONTROL", "2"],
    active: true,
  },
  {
    prompt: "Focus into 3rd Editor Group",
    keybind: ["CONTROL", "3"],
    active: true,
  },
  {
    prompt: "Focus into Next Editor Group",
    keybind: ["CONTROL", "K", "ARROWRIGHT"],
    active: true,
  },
  {
    prompt: "Focus into Previous Editor Group",
    keybind: ["CONTROL", "K", "ARROWLEFT"],
    active: true,
  },
  {
    prompt: "Move Editor Left",
    keybind: ["CONTROL", "SHIFT", "PAGEUP"],
    active: true,
  },
  {
    prompt: "Move Editor Right",
    keybind: ["CONTROL", "SHIFT", "PAGEDOWN"],
    active: true,
  },
  {
    prompt: "Move Active Editor Group Left",
    keybind: ["CONTROL", "K", "ARROWLEFT"],
    active: true,
  },
  {
    prompt: "Move Active Editor Group Right",
    keybind: ["CONTROL", "K", "ARROWRIGHT"],
    active: true,
  },

  // File Management
  { prompt: "New File", keybind: ["CONTROL", "N"], active: false },
  { prompt: "Open File...", keybind: ["CONTROL", "O"], active: true },
  { prompt: "Save", keybind: ["CONTROL", "S"], active: true },
  { prompt: "Save As...", keybind: ["CONTROL", "SHIFT", "S"], active: true },
  { prompt: "Save All", keybind: ["CONTROL", "K", "S"], active: true },
  { prompt: "Close", keybind: ["CONTROL", "F4"], active: false },
  { prompt: "Close All", keybind: ["CONTROL", "W"], active: false },
  {
    prompt: "Reopen Closed Editor",
    keybind: ["CONTROL", "SHIFT", "T"],
    active: false,
  },
  {
    prompt: "Keep Preview Mode Editor Open",
    keybind: ["CONTROL", "K", "ENTER"],
    active: true,
  },
  { prompt: "Open Next", keybind: ["CONTROL", "TAB"], active: false },
  { prompt: "Open Previous", keybind: ["CONTROL", "SHIFT", "TAB"], active: false },
  {
    prompt: "Copy Path of Active File",
    keybind: ["CONTROL", "K", "P"],
    active: true,
  },
  {
    prompt: "Reveal Active File in Explorer",
    keybind: ["CONTROL", "K", "R"],
    active: true,
  },
  {
    prompt: "Show Active File in New Window/Instance",
    keybind: ["CONTROL", "K", "O"],
    active: true,
  },

  // Display
  { prompt: "Toggle Full Screen", keybind: ["F11"], active: false },
  {
    prompt: "Toggle Editor Layout (Horizontal/Vertical)",
    keybind: ["SHIFT", "ALT", "0"],
    active: false,
  },
  { prompt: "Zoom In", keybind: ["CONTROL", "="], active: true },
  { prompt: "Zoom Out", keybind: ["CONTROL", "-"], active: true },
  { prompt: "Toggle Sidebar Visibility", keybind: ["CONTROL", "B"], active: true },
  {
    prompt: "Show Explorer / Toggle Focus",
    keybind: ["CONTROL", "SHIFT", "E"],
    active: true,
  },
  { prompt: "Show Search", keybind: ["CONTROL", "SHIFT", "F"], active: true },
  {
    prompt: "Show Source Control",
    keybind: ["CONTROL", "SHIFT", "G"],
    active: false,
  },
  { prompt: "Show Debug", keybind: ["CONTROL", "SHIFT", "D"], active: true },
  { prompt: "Show Extensions", keybind: ["CONTROL", "SHIFT", "X"], active: false },
  { prompt: "Replace in Files", keybind: ["CONTROL", "SHIFT", "H"], active: true },
  {
    prompt: "Toggle Search Details",
    keybind: ["CONTROL", "SHIFT", "J"],
    active: true,
  },
  {
    prompt: "Show Output Panel",
    keybind: ["CONTROL", "SHIFT", "U"],
    active: true,
  },
  {
    prompt: "Open Markdown Preview",
    keybind: ["CONTROL", "SHIFT", "V"],
    active: true,
  },
  {
    prompt: "Open Markdown Preview to the Side",
    keybind: ["CONTROL", "K", "V"],
    active: true,
  },
  {
    prompt: "Zen Mode (Esc Esc to exit)",
    keybind: ["CONTROL", "K", "Z"],
    active: true,
  },

  // Debug
  { prompt: "Toggle Breakpoint", keybind: ["F9"], active: true },
  { prompt: "Start/Continue", keybind: ["F5"], active: true },
  { prompt: "Stop", keybind: ["SHIFT", "F5"], active: false },
  { prompt: "Step into", keybind: ["F11"], active: false },
  { prompt: "Step over", keybind: ["F10"], active: true },
  { prompt: "Step out", keybind: ["SHIFT", "F11"], active: false },
  { prompt: "Restart", keybind: ["CONTROL", "SHIFT", "F5"], active: false },
  { prompt: "Show Hover", keybind: ["CONTROL", "I"], active: true },

  // Integrated Terminal
  { prompt: "Show Integrated Terminal", keybind: ["CONTROL", "`"], active: false },
  {
    prompt: "Create New Terminal",
    keybind: ["CONTROL", "SHIFT", "`"],
    active: false,
  },
  { prompt: "Copy Selection", keybind: ["CONTROL", "C"], active: true },
  {
    prompt: "Paste into Active Terminal",
    keybind: ["CONTROL", "V"],
    active: true,
  },
  {
    prompt: "Scroll Up",
    keybind: ["CONTROL", "ARROWUP"],
    active: true,
  },
  {
      prompt: "Scroll Down",
      keybind: ["CONTROL", "ARROWDOWN"],
      active: true,
    },
  {
    prompt: "Scroll Page Up",
    keybind: ["CONTROL", "PAGEUP"],
    active: false,
  },
  {
      prompt: "Scroll Down",
      keybind: ["CONTROL", "PAGEDOWN"],
      active: false,
  },
  {
    prompt: "Scroll to Top",
    keybind: ["CONTROL", "HOME"],
    active: true,
  },
  {
      prompt: "Scroll to Bottom",
      keybind: ["CONTROL", "END"],
      active: true,
    },
];

export interface UpdateSettingsProps {
  prompt: string;
  keybind?: string[];
  active?: boolean;
}

interface SettingsContextType {
  settings: Shortcut[];
  updateSettings: ({ prompt, keybind, active }: UpdateSettingsProps) => void;
}

export const SettingsContext = createContext<SettingsContextType>({
  settings: [{ prompt: "", keybind: [""], active: true }],
  updateSettings: () => {},
});

const SettingsContextProvider: React.FC<{ children: ReactNode }> = (props) => {
  const [settings, setSettings] = useState(defaultShortcuts);

  function updateSettings({ prompt, keybind, active }: UpdateSettingsProps) {
    setSettings((prev) => {
      const newSettings = [...prev];
      const editedShortcutIndex = newSettings.findIndex((shortcut) => {
        return shortcut.prompt == prompt;
      });
      if (keybind !== undefined) {
        newSettings[editedShortcutIndex].keybind = keybind;
      }
      if (active !== undefined) {
        newSettings[editedShortcutIndex].active = active;
      }
      return newSettings;
    });
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

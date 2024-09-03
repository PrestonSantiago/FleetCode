interface ToggleSwitchProps {
  active: boolean;
  updateSettings: () => void;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
  active,
  updateSettings,
}) => {
  return (
    <label className="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        checked={active}
        onChange={updateSettings}
        className="sr-only peer"
      />
      <div className="w-11 h-6 bg-gray-200 rounded-full peer-focus:ring-2 peer-focus:ring-primary-dark dark:peer-focus:ring-primary-dark peer-checked:bg-secondary peer dark:bg-gray-600 transition-colors"></div>
      <div className="peer-checked:translate-x-5 peer-checked:border-white absolute w-5 h-5 bg-white border border-gray-300 rounded-full left-1 bottom-0.5 transition-transform"></div>
    </label>
  );
};

export default ToggleSwitch;

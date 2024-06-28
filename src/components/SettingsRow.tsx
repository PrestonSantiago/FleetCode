const SettingsRow = () => {
  return (
    <li className="flex flex-row justify-between items-center bg-primary-light py-4 px-6">
      <h2 className="text-3xl">Command Palette</h2>
      <input type="text" className="text-3xl border border-black pl-2" />
    </li>
  );
};

export default SettingsRow;

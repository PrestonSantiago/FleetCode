const ControlledInput: React.FC<{
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
      return prev.filter((key) => {
        return key != event.key.toUpperCase();
      });
    });
  }

  return (
    <input
      className="w-full h-28 p-4 text-7xl bg-primary-light"
      type="text"
      onKeyDown={(event) => handleKeyDown(event)}
      onKeyUp={(event) => handleKeyUp(event)}
      value={props.inputKeys}
      readOnly={true}
      autoFocus={true}
    />
  );
};

export default ControlledInput;

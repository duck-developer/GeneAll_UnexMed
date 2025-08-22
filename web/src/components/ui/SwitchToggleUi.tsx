interface PropsSwitchToggleUi {
  boolean: boolean;
  onToggle: (state: boolean) => void;
}
const SwitchToggleUi = ({ boolean, onToggle }: PropsSwitchToggleUi) => {
  return (
    <button
      onClick={() => onToggle(!boolean)}
      className={` cursor-pointer relative w-10 h-6 flex items-center rounded-full p-1 transition-colors ${
        boolean ? "bg-blue-500" : "bg-gray-400"
      }`}
    >
      <span
        className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform ${
          boolean ? "translate-x-3" : "translate-x-0"
        }`}
      />
    </button>
  );
};

export default SwitchToggleUi;

const ToggleHideButtons = ({ setShowContent }: ToggleHideButtonsProps) => {
  return (
    <div>
      <button onClick={() => setShowContent(true)} className="bg-white border-2 border-gray-500 px-1 rounded" type="button">Show</button>
      <button onClick={() => setShowContent(false)} className="bg-white border-2 border-gray-500 px-1 ml-1 rounded" type="button">Hide</button>
    </div>
  );
}

export default ToggleHideButtons;
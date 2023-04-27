const ConfirmationMessage = ({confirmationMsg, setConfirmationMsg}) => {
  return (<div className="mx-auto my-16 p-4 bg-indigo-200 w-11/12 max-w-3xl rounded-md shadow-lg shadow-red-300/60">
    <p className="text-lg font-semibold">Update successful.</p>
    <p className="italic">{confirmationMsg}</p>
    <button onClick={() => setConfirmationMsg(false)} className="block w-fit bg-indigo-500 text-yellow-100 py-2.5 px-5 mt-4 border border-gray-400 rounded-md">Dismiss</button>
    </div>);
}

export default ConfirmationMessage;
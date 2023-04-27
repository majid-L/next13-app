const ConfirmationMeesage = ({confirmationMsg, setConfirmationMsg}) => {
    return <div className="bg-slate-200 --max-w-720 mx-auto mt-5 rounded-md">
    <p className="pt-2">{confirmationMsg}</p>
    <button onClick={() => setConfirmationMsg(false)} className="bg-brightPink border-1 border-gray-500 shadow-lg shadow-pink-950/80 px-3 py-1 mt-3 mb-4 rounded-md">Dismiss</button>
    </div>;
}

export default ConfirmationMeesage;
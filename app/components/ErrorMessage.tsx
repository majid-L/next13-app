const ErrorMessage = ({errorMsg, setErrorMsg}: ErrorMessage) => {
  const handleClick = () => setErrorMsg((prev: ErrorMsg) => ({...prev, show: false}));
    return <div className="text-left mx-auto my-16 p-4 bg-red-200 w-11/12 max-w-3xl rounded-md shadow-lg shadow-red-300/60">
    <p className="text-lg font-semibold">Something went wrong.</p>
    <p>{errorMsg.value as string}</p>
    <button onClick={handleClick} className="bg-red-300 py-2.5 px-5 mt-4 border border-gray-400 rounded-md ">Dismiss</button>
  </div>;
}

export default ErrorMessage;
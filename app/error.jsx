'use client';

const Error = ({error, reset}) => {

return (<main className="pb-20">
    <svg style={{display: 'block', margin: '200px auto 0', height: '150px', width: '150px', color: '#FECACA'}} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-exclamation-square-fill" viewBox="0 0 16 16">
    <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6 4c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995A.905.905 0 0 1 8 4zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
    </svg>
    <div className="mx-auto my-16 p-4 bg-red-200 w-11/12 max-w-3xl rounded-md shadow-lg shadow-red-300/60">
      <p className="text-lg font-semibold">Somthing went wrong.</p>
      <p className="italic">{error.message}</p>
      <button onClick={() => reset()} className="bg-red-300 py-2.5 px-5 mt-4 border border-gray-400 rounded-md ">Retry</button>
    </div>
</main>);
};

export default Error;
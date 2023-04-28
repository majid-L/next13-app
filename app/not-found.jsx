'use client';

const NotFound = () => {
return (
<main className="pb-20">
  <svg style={{display: 'block', margin: '200px auto 0', height: '150px', width: '150px', color: '#6366f1'}} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-circle-fill" viewBox="0 0 16 16">
  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/>
  </svg>
    <div className="mx-auto my-16 p-4 bg-indigo-200 w-11/12 max-w-3xl rounded-md shadow-lg shadow-red-300/60">
    <p className="text-lg font-semibold">Page not found.</p>
    <p className="italic">Though this destination is unreachable, all is not lost, for there is always a way back home.</p>
    <a href='/' className="block w-fit bg-indigo-500 text-yellow-100 py-2.5 px-5 mt-4 border border-gray-400 rounded-md">Return to home</a>
  </div>
</main>)
}

export default NotFound;
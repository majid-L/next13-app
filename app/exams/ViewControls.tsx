import userIsAdmin from '../helpers/userIsAdmin';
import Link from 'next/link';

const ViewControls = ({setView, loggedInUser}: ViewControlsProps) => {
return ( <div className="flex flex-col w-56 --max-w-720 mx-auto md:w-auto md:flex-row">
<button onClick={() => setView('list')} className="bg-brightPink border-1 border-gray-500 shadow-lg shadow-pink-600/80 grow px-3 py-1 mb-4 rounded-md md:mb-8">View as list</button>
<button onClick={() => setView('map')} className="bg-brightPink border-1 border-gray-500 shadow-lg shadow-pink-600/80 w-56 mx-auto grow px-3 py-1 mb-4 rounded-md md:mx-2 md:w-auto md:mb-8">View as map</button>
{userIsAdmin(loggedInUser) && <Link href='/exams/new' className="bg-orange-300 border-1 border-gray-500 shadow-lg shadow-yellow-500/50 text-center grow px-2 py-1 mb-8 rounded-md">Add new exam</Link>}
</div>);
}

export default ViewControls;
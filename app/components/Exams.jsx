import Spinner from '../components/Spinner';
import Link from "next/link";
import { usePathname, useRouter } from 'next/navigation';

const Exams = ({isLoading, exams}) => {
const pathname = usePathname();
const router = useRouter();

    return isLoading ? <Spinner /> :
      <div className="grid grid-cols-fluid mt-6">
      {Array.isArray(exams) && exams.map(exam => {
          return <div key={exam.id} className="py-2 hover:text-indigo-600">
          <div className="max-w-md mx-auto sm:px-6 lg:px-8">
              <div className="bg-white border-1 border-gray-700 shadow-lg shadow-pink-300/40 overflow-hidden rounded-lg"> {/* add h-64 to fix card height */}
                  <div onClick={() => router.push(`/exams/${exam.id}`)} className="p-6 pb-4 text-gray-900 text-left cursor-pointer">
                      <p className="font-bold text-lg">{exam.candidateName} <span className="font-medium">(ID: {exam.candidateId})</span></p>
                      <p className="mb-2 pb-2 border-b-2 border-t-indigo-500 text-gray-500">{exam.title} (Exam ID: {exam.id})</p>
                      <p className="pb-2 border-b-2 border-t-indigo-500">{exam.description} is taking place at {exam.locationName} on {exam.date.slice(0, 10)} at {exam.date.slice(10)}.</p>
                      {pathname === '/exams' && <Link href={`/candidates/${exam.candidateId}`} className="block w-fit mt-2 text-pink-700 hover:underline hover:text-blue-500">View {exam.candidateName}'s exams</Link>}
                  </div>
              </div>
          </div>
      </div>
      })}
      </div>
    };

export default Exams;
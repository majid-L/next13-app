import Spinner from "./Spinner";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { deleteExam } from "../api/apiRequests";
import { CalendarIcon, MapIcon, TimeIcon } from "./Icons";

const ExamsList = ({
  isLoading,
  exams,
  loggedInUser,
  setConfirmationMsg,
  setExams,
}: ExamsListProps) => {
  const pathname = usePathname();

  const handleDelete = (id: number) => {
    deleteExam(loggedInUser.token as string, id)
      .then((res) => {
        if (res === 1) {
          setConfirmationMsg("Exam session has been successfully cancelled.");
          setExams((prev: Exam[]) =>
            prev.filter((exam) => {
              if (exam.id != id) {
                return exam;
              }
            })
          );
        }
      })
      .catch(() => {
        setConfirmationMsg("Unable to cancel exam.");
      });
  };

  return isLoading ? (
    <Spinner />
  ) : (
    <main className="w-11/12 mx-auto grid grid-cols-fluid mt-6">
      {exams.map((exam) => {
        return (
          <div key={exam.id} className="py-2 hover:text-indigo-600">
            <div className="max-w-md mx-auto sm:px-6 lg:px-8">
              <div className="bg-white border-1 border-gray-700 shadow-lg shadow-pink-300/40 overflow-hidden rounded-lg">
                <div className="p-6 pb-4 text-gray-900 text-left">
                  <p className="font-bold text-lg truncate">
                    {exam.candidateName}{" "}
                    <span className="font-medium">
                      (ID: {exam.candidateId})
                    </span>
                  </p>
                  <p className="mb-2 pb-2 border-b-2 border-t-indigo-500 text-gray-500">
                    {exam.title} (Exam ID: {exam.id})
                  </p>

                  <p className="pb-2 border-b-2 border-t-indigo-500">
                    {exam.description} is taking place in{" "}
                    <span className="flex">
                      <MapIcon />
                      {exam.locationName}, on
                    </span>
                    <span className="flex">
                      <CalendarIcon />
                      {exam.date.slice(0, 10)}, at
                    </span>
                    <span className="flex">
                      <TimeIcon />
                      {exam.date.slice(10)}.
                    </span>
                  </p>

                  <Link
                    href={`/exams/${exam.id}`}
                    className="block mt-2 text-blue-600 hover:underline hover:text-red-500"
                  >
                    View exam page
                  </Link>
                  {pathname === "/exams" && (
                    <Link
                      href={{
                        pathname: `/candidates/${exam.candidateId}`,
                        query: {
                          name: exam.candidateName.replaceAll(" ", "+"),
                        },
                      }}
                      className="block mt-0.5 text-blue-600 hover:underline hover:text-red-500 overflow-ellipsis truncate"
                    >
                      View {exam.candidateName}&apos;s exams
                    </Link>
                  )}
                  <button
                    onClick={() => handleDelete(exam.id)}
                    className="bg-gray-300 w-full border-2 border-gray-400 mt-2 py-1 px-2 rounded hover:bg-red-400"
                  >
                    Cancel session
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </main>
  );
};

export default ExamsList;

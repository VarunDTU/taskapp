import { useSelector } from "react-redux";
export default function LatestTask() {
  const tasks = useSelector((state) => state.tasks);
  const latestTask = tasks
    .filter((task) => !task.status)
    .toSorted((a, b) => a.overdueDate - b.overdueDate)
    .slice(0, tasks.length < 4 ? tasks.length : 4);
  const currDate = new Date();
  return (
    <div className="h-full flex iems center flex-col text-center md:mt-10 m-10">
      <div className="font-bold text-xl">Upcoming Tasks</div>
      <div className="">
        {latestTask.map((task, index) => {
          return (
            <div
              key={index}
              className={`rounded-xl hover:shadow-lg flex flex-col justify-evenly w-full p-2  border-2 my-2 ${
                currDate > task.overdueDate
                  ? "bg-red-100 border-red-500"
                  : "bg-yellow-100 border-yellow-300"
              }`}
            >
              <div>{task.title}</div>
              <div className="text-xs">{task.overdueDate.toDateString()}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

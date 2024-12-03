import { useSelector } from "react-redux";
export default function DashboardStrats() {
  const tasks = useSelector((state) => state.tasks);
  const currDate = new Date();
  return (
    <div className="w-full flex flex-col">
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Welcome to your Dashboard
          </h2>

          <p className="mt-4 text-gray-500 sm:text-xl"></p>
        </div>

        <dl className="mt-6 grid grid-cols-1 gap-4 sm:mt-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col rounded-lg border border-gray-100 px-4 py-8 text-center">
            <dt className="order-last text-lg font-medium text-gray-500">
              Total Tasks
            </dt>

            <dd className="text-4xl font-extrabold text-gray-600 md:text-5xl">
              {tasks.length}
            </dd>
          </div>

          <div className="flex flex-col rounded-lg border border-gray-100 px-4 py-8 text-center">
            <dt className="order-last text-lg font-medium text-gray-500">
              Upcoming Tasks
            </dt>

            <dd className="text-4xl font-extrabold text-blue-600 md:text-5xl">
              {
                tasks.filter(
                  (task) => !task.status && currDate <= task.overdueDate
                ).length
              }
            </dd>
          </div>

          <div className="flex flex-col rounded-lg border border-gray-100 px-4 py-8 text-center">
            <dt className="order-last text-lg font-medium text-gray-500">
              Completed Tasks
            </dt>

            <dd className="text-4xl font-extrabold text-blue-600 md:text-5xl">
              {tasks.filter((task) => task.status).length}
            </dd>
          </div>

          <div className="flex flex-col rounded-lg border border-gray-100 px-4 py-8 text-center">
            <dt className="order-last text-lg font-medium text-gray-500">
              Overdue Tasks
            </dt>

            <dd className="text-4xl font-extrabold text-blue-600 md:text-5xl">
              {tasks.filter((task) => currDate > task.overdueDate).length}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}

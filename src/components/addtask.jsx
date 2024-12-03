import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { addTasks } from "../features/slice";
export default function AddTaskDropDown() {
  const [newTask, setNewTask] = useState({
    title: "",
    overdueDate: "2024-12-11",
  });

  const dispatch = useDispatch();
  const addNewtask = (e) => {
    e.preventDefault();
    if (newTask.title === "" || newTask.overdueDate === "") {
      toast("Please fill all the fields", { icon: "🚨" });
      return;
    }
    dispatch(
      addTasks({
        title: newTask.title,
        overdueDate: newTask.overdueDate,
      })
    );
    setNewTask({ title: "", overdueDate: "2024-12-11" });
  };
  return (
    <div className=" flex h-full justify-start items-start">
      <Toaster></Toaster>
      <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-lg text-center">
          <h1 className="text-2xl font-bold sm:text-3xl">New Task</h1>
        </div>

        <form
          onSubmit={addNewtask}
          className="mx-auto mb-0 mt-8 max-w-md space-y-4"
        >
          <div>
            <label htmlFor="email" className="sr-only">
              Email
            </label>

            <div className="relative">
              <input
                type="text"
                onChange={(e) =>
                  setNewTask({ ...newTask, title: e.target.value })
                }
                value={newTask.title}
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                placeholder="Enter Title"
              />
            </div>
          </div>

          <div>
            <label htmlFor="text" className="sr-only">
              Password
            </label>

            <div className="relative">
              <input
                type="date"
                onChange={(e) =>
                  setNewTask({ ...newTask, overdueDate: e.target.value })
                }
                value={newTask.overdueDate}
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                placeholder="Enter password"
              />
            </div>
          </div>

          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white"
            >
              Add Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

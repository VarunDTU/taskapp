import { closestCenter, DndContext } from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeTasks, swapTasks, updateTasks } from "../features/slice";
export default function Table() {
  const tasks = useSelector((state) => state.tasks);
  const [filterStatus, setFilterStatus] = useState("none");
  const date = new Date();
  const dispatch = useDispatch();
  const updateStatus = (id) => {
    dispatch(updateTasks({ id: id }));
  };
  const removeTask = (id) => {
    dispatch(removeTasks({ id: id }));
  };
  const getTaskPos = (id) => tasks.findIndex((task) => task.id == id);
  const onDragEnd = (event) => {
    console.log(event);
    if (event.active.id === event.over.id) return;

    const originalIndex = getTaskPos(event.active.id);
    const newIndex = getTaskPos(event.over.id);
    dispatch(
      swapTasks({
        sourceIndex: originalIndex,
        destinationIndex: newIndex,
      })
    );
    console.log(tasks);
  };
  const SortableList = (prop) => {
    const { task } = prop;

    const { attributes, listeners, setNodeRef, transform, transition } =
      useSortable({ id: parseInt(task.id) });
    const sortableListStyle = {
      transition,
      transform: CSS.Transform.toString(transform),
    };
    return (
      <tr ref={setNodeRef} style={sortableListStyle}>
        <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
          {task.title}
        </td>
        <td className="whitespace-nowrap px-4 py-2 text-gray-700">
          {task.createdAtDate.toDateString()}
        </td>
        <td className="whitespace-nowrap px-4 py-2 text-gray-700">
          {task.overdueDate.toDateString()}
        </td>
        <td className="whitespace-nowrap px-4 py-2 text-gray-700 ">
          {task.status ? (
            <span
              className="inline-flex items-center justify-center rounded-full bg-emerald-100 px-2.5 py-0.5 text-emerald-700  cursor-pointer"
              onClick={() => updateStatus(task.id)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="-ms-1 me-1.5 size-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>

              <p className="whitespace-nowrap text-sm">Completed</p>
            </span>
          ) : task.overdueDate < date ? (
            <span
              className="inline-flex items-center justify-center rounded-full bg-red-100 px-2.5 py-0.5 text-red-700 cursor-pointer"
              onClick={() => updateStatus(task.id)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="-ms-1 me-1.5 size-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                />
              </svg>

              <p className="whitespace-nowrap text-sm">OverDue</p>
            </span>
          ) : (
            <span
              className="inline-flex items-center justify-center rounded-full border border-amber-500 px-2.5 py-0.5 text-amber-700 cursor-pointer"
              onClick={() => updateStatus(task.id)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="-ms-1 me-1.5 size-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 9.75h4.875a2.625 2.625 0 010 5.25H12M8.25 9.75L10.5 7.5M8.25 9.75L10.5 12m9-7.243V21.75l-3.75-1.5-3.75 1.5-3.75-1.5-3.75 1.5V4.757c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0c1.1.128 1.907 1.077 1.907 2.185z"
                />
              </svg>

              <p className="whitespace-nowrap text-sm">Pending</p>
            </span>
          )}
        </td>
        <td className="whitespace-nowrap px-4 py-2">
          {/* delete button */}
          <button
            className="inline-block p-3 text-gray-700 hover:bg-gray-50 focus:relative"
            title="Delete Product"
            onClick={() => removeTask(task.id)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
              />
            </svg>
          </button>
          {/* drag handle */}
          <button
            {...attributes}
            {...listeners}
            className="inline-block p-3 text-gray-700 hover:bg-gray-50 focus:relative"
            title="Delete Product"
            onClick={() => removeTask(task.id)}
          >
            <svg
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-4"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="24" height="24" fill="white" />
              <circle
                cx="9.5"
                cy="6"
                r="0.5"
                stroke="#000000"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle
                cx="9.5"
                cy="10"
                r="0.5"
                stroke="#000000"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle
                cx="9.5"
                cy="14"
                r="0.5"
                stroke="#000000"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle
                cx="9.5"
                cy="18"
                r="0.5"
                stroke="#000000"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle
                cx="14.5"
                cy="6"
                r="0.5"
                stroke="#000000"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle
                cx="14.5"
                cy="10"
                r="0.5"
                stroke="#000000"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle
                cx="14.5"
                cy="14"
                r="0.5"
                stroke="#000000"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle
                cx="14.5"
                cy="18"
                r="0.5"
                stroke="#000000"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </td>
      </tr>
    );
  };
  var filteredTasks = tasks;

  if (filterStatus == 1) {
    filteredTasks = tasks.filter((task) => task.status == true);
  } else if (filterStatus == 2) {
    filteredTasks = tasks.filter((task) => task.status == false);
  } else if (filterStatus == 3) {
    filteredTasks = tasks.filter((task) => task.overdueDate < date);
  } else {
    filteredTasks = tasks;
  }

  return (
    <div className="w-full">
      <div className="flex w-full justify-between p-2 px-4">
        <div className="text-xl font-bold ">Tasks</div>
      </div>
      <div className="flex items-end justify-end">
        <span
          className={`inline-flex items-center justify-center rounded-full cursor-pointer ${
            filterStatus == 1
              ? "bg-emerald-100 border border-transparent"
              : "border-green-500 border"
          } px-2.5 py-0.5 text-emerald-700`}
          onClick={() => {
            if (filterStatus != 1) setFilterStatus(1);
            else setFilterStatus(0);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="-ms-1 me-1.5 size-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>

          <p className="whitespace-nowrap text-sm">Completed</p>
        </span>
        <span
          className={`inline-flex items-center justify-center rounded-full px-2.5 py-0.5 text-amber-700 cursor-pointer ${
            filterStatus == 2
              ? "bg-amber-100 border border-transparent"
              : "border-amber-700 border"
          }`}
          onClick={() => {
            if (filterStatus != 2) setFilterStatus(2);
            else setFilterStatus(0);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="-ms-1 me-1.5 size-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 9.75h4.875a2.625 2.625 0 010 5.25H12M8.25 9.75L10.5 7.5M8.25 9.75L10.5 12m9-7.243V21.75l-3.75-1.5-3.75 1.5-3.75-1.5-3.75 1.5V4.757c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0c1.1.128 1.907 1.077 1.907 2.185z"
            />
          </svg>

          <p className="whitespace-nowrap text-sm">Upcoming</p>
        </span>
        <span
          className={`inline-flex items-center justify-center rounded-full px-2.5 py-0.5 text-amber-700 cursor-pointer ${
            filterStatus == 3
              ? "bg-red-100 border border-transparent"
              : "border-red-700 border"
          }`}
          onClick={() => {
            if (filterStatus != 3) setFilterStatus(3);
            else setFilterStatus(0);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="-ms-1 me-1.5 size-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
            />
          </svg>

          <p className="whitespace-nowrap text-sm">Overdue</p>
        </span>
      </div>
      <div className="">
        <div className="md:overflow-x-hidden h-[380px] w-full overflow-x-auto ">
          <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm overflow-hidden table-fixed overflow-y-auto">
            <thead className="ltr:text-left rtl:text-right">
              <tr>
                <th className=" text-left whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  Title
                </th>
                <th className=" text-left whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  Created on
                </th>
                <th className=" text-left whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  OverdueDate
                </th>
                <th className=" text-left whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  Status
                </th>
                <th className="px-4 py-2"></th>
              </tr>
            </thead>
            <DndContext
              collisionDetection={closestCenter}
              onDragEnd={onDragEnd}
              modifiers={[restrictToVerticalAxis]}
            >
              <tbody className="divide-y divide-gray-200">
                <SortableContext
                  items={tasks}
                  strategy={verticalListSortingStrategy}
                >
                  {filteredTasks.map((task, index) => {
                    return <SortableList key={index} task={task} />;
                  })}
                </SortableContext>
              </tbody>
            </DndContext>
          </table>
        </div>
      </div>
    </div>
  );
}

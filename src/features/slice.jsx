import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: [
    {
      id: 1,
      title: "First Meeting",
      status: false,
      createdAtDate: new Date("2022-03-25"),
      overdueDate: new Date("2022-04-25"),
      order: 1,
    },
    {
      id: 2,
      title: "Second Meeting",
      status: true,
      createdAtDate: new Date("2022-03-25"),
      overdueDate: new Date("2025-04-25"),
      order: 2,
    },
  ],
};
export const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    addTasks: (state, action) => {
      const task = {
        id: state.tasks.length + 1,
        title: action.payload.title,
        status: false,
        createdAtDate: new Date(),
        overdueDate: new Date(action.payload.overdueDate),
        order: state.tasks.length + 1,
      };
      state.tasks.push(task);
    },
    removeTasks: (state, action) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload.id);
    },
    updateTasks: (state, action) => {
      state.tasks = state.tasks.map((task) => {
        return task.id == action.payload.id
          ? { ...task, status: !task.status }
          : task;
      });
    },
    swapTasks: (state, action) => {
      var { sourceIndex, destinationIndex } = action.payload;
      sourceIndex = parseInt(sourceIndex);
      destinationIndex = parseInt(destinationIndex);
      const currState = state.tasks.slice();
      [currState[sourceIndex], currState[destinationIndex]] = [
        currState[destinationIndex],
        currState[sourceIndex],
      ];
      state.tasks = currState;
    },
  },
});
export const { addTasks, removeTasks, updateTasks, swapTasks } =
  taskSlice.actions;
export default taskSlice.reducer;

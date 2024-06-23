import { createSlice } from '@reduxjs/toolkit';

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: {
    todo: [],
    inProgress: [],
    completed: [],
  },
  reducers: {
    addTask: (state, action) => {
      state.todo.push(action.payload);
    },
    updateTask: (state, action) => {
      const { id, status, content } = action.payload;

     
      let taskToUpdate;
      for (let key of ['todo', 'inProgress', 'completed']) {
        const taskIndex = state[key].findIndex(task => task.id === id);
        if (taskIndex !== -1) {
          taskToUpdate = state[key].splice(taskIndex, 1)[0];
          break;
        }
      }

      if (!taskToUpdate) {
        console.error(`Task with id ${id} not found`);
        return;
      }
      taskToUpdate.content = content;
      state[status].push(taskToUpdate);
    },
    deleteTask: (state, action) => {
      const { id } = action.payload;
      for (let key of ['todo', 'inProgress', 'completed']) {
        state[key] = state[key].filter(task => task.id !== id);
      }
    },
  },
});

export const { addTask, updateTask, deleteTask } = tasksSlice.actions;

export default tasksSlice.reducer;
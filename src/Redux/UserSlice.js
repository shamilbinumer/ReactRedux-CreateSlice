// src/Redux/UserSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  users: [],
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUser(state, action) {
      state.users.push(action.payload);
    },
    editUser(state, action) {
      const { id, name, age, image } = action.payload;
      const userToUpdate = state.users.find(user => user.id === id);
      if (userToUpdate) {
        userToUpdate.name = name;
        userToUpdate.age = age;
        userToUpdate.image = image; 
      }
    },
    deleteUser(state, action) {
      const id = action.payload;
      state.users = state.users.filter(user => user.id !== id);
    },
  },
});

export const { addUser, editUser, deleteUser } = userSlice.actions;
export const selectUsers = state => state.user.users;
export default userSlice.reducer;

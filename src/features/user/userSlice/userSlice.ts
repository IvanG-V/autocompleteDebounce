import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { State } from './types';
import * as api from '../api';

const initialState: State = {
  users: [],
  isLoading: false,
  error: null,
  page: 1,
  searchTerm: '',
};

export const loadUsers = createAsyncThunk(
  'users/load',
  (obj: Pick<State, 'searchTerm' | 'page'>) => {
    return api.loadUsersFromServer(obj);
  },
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    nextPage: (state) => {
      state.page += 1;
    },
    lastPage: (state) => {
      state.page -= 1;
    },
    reset: (state) => {
      state.page = 1;
    },
    setSearch: (state, action) => {
      state.searchTerm = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadUsers.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(loadUsers.fulfilled, (state, action) => {
      state.isLoading = false;
      state.users = action.payload;
    });
    builder.addCase(loadUsers.rejected, (state, action) => {
      state.isLoading = false;
      state.users = action.error.message;
    });
  },
});

export const { nextPage, lastPage, setSearch, reset } = userSlice.actions;

export default userSlice.reducer;

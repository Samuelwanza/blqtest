import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getRequest } from '../../../services/apiService';

export const fetchShortcuts = createAsyncThunk(
  'shortcuts/fetchShortcuts',
  async () => {
    const response = await getRequest('main-shortcut/all');
    return response || {};
  },
);

const initialState = {
  shortcuts: [],
  loading: false,
  bannersInProcess: null,
  error: null,
};

const shortcutsSlice = createSlice({
  name: 'shortcuts',
  initialState,
  reducers: {
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchShortcuts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchShortcuts.fulfilled, (state, action) => {
        state.shortcuts = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchShortcuts.rejected, (state) => {
        state.loading = false;
        state.error = 'Failed to fetch shortcuts from the API.';
      });
  },
});

export default shortcutsSlice.reducer;

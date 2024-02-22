import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getRequest } from '../../../services/apiService';

export const fetchBanners = createAsyncThunk(
  'banners/fetchBanners',
  async () => {
    const response = await getRequest('main-banner/all');
    return response || {};
  },
);

const initialState = {
  banners: [],
  loading: false,
  bannersInProcess: null,
  error: null,
};

const bannersSlice = createSlice({
  name: 'banners',
  initialState,
  reducers: {
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBanners.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBanners.fulfilled, (state, action) => {
        state.banners = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchBanners.rejected, (state) => {
        state.loading = false;
        state.error = 'Failed to fetch banners from the API.';
      });
  },
});

export default bannersSlice.reducer;

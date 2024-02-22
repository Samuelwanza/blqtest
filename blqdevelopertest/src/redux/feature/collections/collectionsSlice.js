import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getRequest } from '../../../services/apiService';

export const fetchCollections = createAsyncThunk(
  'collections/fetchCollections',
  async () => {
    const response = await getRequest('collections?prearrangedDiscount');
    const collections = response.items.filter(collection=>collection.type==="SINGLE" && collection.viewType==="TILE")
    return collections || {};
  },
);

const initialState = {
  collections: [],
  loading: false,
  collectionsInProcess: null,
  error: null,
};

const collectionsSlice = createSlice({
  name: 'collections',
  initialState,
  reducers: {
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCollections.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCollections.fulfilled, (state, action) => {
        state.collections = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchCollections.rejected, (state) => {
        state.loading = false;
        state.error = 'Failed to fetch collections from the API.';
      });
  },
});

export default collectionsSlice.reducer;

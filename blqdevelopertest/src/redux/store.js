import { configureStore } from '@reduxjs/toolkit';
import bannersSlice from './feature/banners/bannersSlice';
import collectionsSlice from './feature/collections/collectionsSlice';
import shortcutsSlice from './feature/shortcuts/shortcutsSlice';

const store = configureStore({
  reducer: {
    banners: bannersSlice,
    collections: collectionsSlice,
    shortcuts: shortcutsSlice
  },
});

export default store;

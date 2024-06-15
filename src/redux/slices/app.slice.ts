import {ThemeMode} from '@/types';
import {PayloadAction, createSlice} from '@reduxjs/toolkit';

interface AppState {
  loading: boolean;
  mode: ThemeMode;
}

const initialState: AppState = {
  loading: false,
  mode: 'light',
};

export const appSlice = createSlice({
  name: 'appSlice',
  initialState: initialState,
  reducers: {
    changeLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

const {reducer, actions} = appSlice;
export const {changeLoading} = actions;
export default reducer;

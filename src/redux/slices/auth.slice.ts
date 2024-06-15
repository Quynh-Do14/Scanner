import {User} from '@/types';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface AuthState {
  isAuthenticated?: boolean;
  user?: User;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: undefined,
};

export const authSlice = createSlice({
  name: 'authSlice',
  initialState: initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state = {
        ...state,
        user: action.payload,
        isAuthenticated: true,
      };
      return state;
    },
    removeUser: (state) => {
      state = {...initialState};
      return state;
    },
    updateUser: (state, action: PayloadAction<User>) => {
      const userNew: any = {...state.user, ...action.payload};
      state = {
        ...state,
        user: userNew,
      };
      return state;
    },
  },
});

const {reducer, actions} = authSlice;
export const {setUser, removeUser, updateUser} = actions;
export default reducer;

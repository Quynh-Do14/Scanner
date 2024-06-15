import {Document} from '@/types';
import {PayloadAction, createSlice} from '@reduxjs/toolkit';

const initialState: Array<Document> = [];

export const documentSlice = createSlice({
  name: 'documentSlice',
  initialState: initialState,
  reducers: {
    createDocument: (state, action: PayloadAction<Document>) => {
      return (state = [...state, action.payload]);
    },
    updateDocument: (state, action: PayloadAction<Document>) => {
      return state.map(doc =>
        doc.createdAt == action.payload.createdAt
          ? {...doc, ...action.payload}
          : doc,
      );
    },
    deleteDocument: (state, action: PayloadAction<Document>) => {
      return state.filter(doc => doc.createdAt !== action.payload.createdAt);
    },
  },
});

const {reducer, actions} = documentSlice;
export const {createDocument, updateDocument, deleteDocument} = actions;
export default reducer;

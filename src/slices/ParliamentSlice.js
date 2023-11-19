import { createSlice } from '@reduxjs/toolkit';

const parliamentSlice = createSlice({
  name: 'parliament',
  initialState: {
    memberInfo: null,
    interests: [],
    error: null,
  },
  reducers: {
    setMemberInfo(state, action) {
      state.memberInfo = action.payload;
      state.error = null;
    },
    setInterests(state, action) {
      state.interests = action.payload;
      state.error = null;
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
});

export const { setMemberInfo, setInterests, setError } = parliamentSlice.actions;
export default parliamentSlice.reducer;

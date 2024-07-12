import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { User } from 'firebase/auth'

export interface authState {
  user: User | undefined,
  loading: boolean,
}

const initialState: authState = {
  user: undefined,
  loading: true,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | undefined>) => {
      state.user = action.payload
      state.loading = false
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setUser, setLoading } = authSlice.actions

export default authSlice.reducer
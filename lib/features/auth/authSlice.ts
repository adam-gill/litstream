import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { User } from 'firebase/auth'

export interface authState {
  user: User | null,
  loading: boolean,
}

const initialState: authState = {
  user: null,
  loading: true,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
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
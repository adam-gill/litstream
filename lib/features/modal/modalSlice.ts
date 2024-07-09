import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface modalState {
  showModal: boolean
}

const initialState: modalState = {
  showModal: false,
}

export const authModalSlice = createSlice({
  name: 'showModal',
  initialState,
  reducers: {
    toggleModal: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.showModal = !state.showModal
    },
    hideModal: (state) => {
      state.showModal = false
    },
    setModal: (state, action: PayloadAction<boolean>) => {
      state.showModal = !action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setModal, hideModal, toggleModal } = authModalSlice.actions

export default authModalSlice.reducer
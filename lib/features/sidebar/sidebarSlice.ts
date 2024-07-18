import { Book } from '@/types/types'
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface sidebar {
    open: boolean,
    player: boolean,
    tabSelected: number,
    fontSize: string,
    book?: Book
}

export interface sidebarState {
  sidebar: {
    open: boolean,
    player: boolean,
    tabSelected: number,
    fontSize: string,
    book?: Book
  }
}

const initialState: sidebarState = {
  sidebar: {
    open: true,
    player: false,
    tabSelected: 69,
    fontSize: "base"
  }
}

export const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    setSidebar: (state, action: PayloadAction<sidebar>) => {
      state.sidebar = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setSidebar } = sidebarSlice.actions

export default sidebarSlice.reducer
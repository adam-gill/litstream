import { Book } from '@/types/types'
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface sidebar {
    size: string,
    open: boolean,
    player: boolean,
    tabSelected: number,
    fontSize: string,
    book?: Book
}

export interface sidebarState {
  sidebar: {
    size: string,
    open: boolean,
    player: boolean,
    tabSelected: number,
    fontSize: string,
    book?: Book
  }
}

const initialState: sidebarState = {
  sidebar: {
    size: "lg",
    open: false,
    player: false,
    tabSelected: -1,
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
import { createSlice } from "@reduxjs/toolkit"

const initialState: appStatusType = { navbarOpened: false }

export type appStatusType = {
 navbarOpened: boolean
}

export const appStatusSlice = createSlice({
    name: "appStatus",
    initialState: { value: initialState },
    reducers: {
      closeNav: (state, action) => {
        state.value.navbarOpened = false
      },

      openNav: (state, action) => {
        state.value.navbarOpened = true
      }
    }
})

export const { closeNav, openNav } = appStatusSlice.actions


export default appStatusSlice.reducer
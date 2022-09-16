import { createSlice } from "@reduxjs/toolkit"

const initialState: appStatusType = { navbarOpened: false, mode: "blue", driveLocation: "/"}

export type appStatusType = {
 navbarOpened: boolean
 mode: "blue" | "purple",
 driveLocation: "/"

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
      },

      changeDriveLoc: (state, action) => {
        
        let actualLoc = action.payload.replaceAll("-", "/")
        // if (actualLoc !== "/") actualLoc += "/"
        state.value.driveLocation = actualLoc
      },



    }
})

export const { closeNav, openNav, changeDriveLoc } = appStatusSlice.actions


export default appStatusSlice.reducer
import { createSlice } from "@reduxjs/toolkit"

const initialState = { id: "", name: "", age: 0, email: "" }

export const userSlice = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {
        register: (state, action) => {

        }, 

        login: (state, action) => {

        },

        logout: (state, action) => {

        }
    }
})

export const { register, login, logout } = userSlice.actions


export default userSlice.reducer
import { createSlice } from "@reduxjs/toolkit"

const initialState: userType = { id: "", name: "", email: "testemail@gmail.com", plan: "15", usedSpace: 60000000}
export type userType = {
    id: string,
    name: string,
    email: string,
    plan: "" | "15" | "50" | "unlimited",
    usedSpace: number
}

export const userSlice = createSlice({
    name: "user",
    initialState: { value: initialState },
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
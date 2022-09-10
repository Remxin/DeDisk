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
        setUser: (state, action) => {
            console.log(action.payload);
            
            state.value = action.payload
        },

        logout: (state, action) => {
            state.value = initialState
        }
    }
})

export const { setUser, logout } = userSlice.actions


export default userSlice.reducer
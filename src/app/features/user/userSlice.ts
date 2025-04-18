import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import User from "@/app/domain/User";

interface UserState {
    user: User | null;
    token: string | null;
}

const initialState: UserState = {
    user: JSON.parse(localStorage.getItem("user") || "null"),
    token: localStorage.getItem("token"),

};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUserLogged(state, action: PayloadAction<{ user: any ; token: string }>) {
            state.user = action.payload.user;
            localStorage.setItem("user", JSON.stringify(action.payload.user));
            state.token = action.payload.token;
            localStorage.setItem("token", action.payload.token);

        },
        logout(state) {
            state.user = null;
            localStorage.removeItem("user"); // Remove from localStorage
            state.token = null;
            localStorage.removeItem("token"); // Remove from localStorage
        },
    },
});

export const { setUserLogged, logout } = userSlice.actions;
export default userSlice.reducer;
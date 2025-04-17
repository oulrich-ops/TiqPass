import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import User from "@/app/domain/User";

interface UserState {
    user: User | null;
}

const initialState: UserState = {
    user: JSON.parse(localStorage.getItem("user") || "null"),
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUserLogged(state, action: PayloadAction<{ user: any }>) {
            state.user = action.payload.user;
            localStorage.setItem("user", JSON.stringify(action.payload.user)); // Save to localStorage
        },
        clearUser(state) {
            state.user = null;
            localStorage.removeItem("user"); // Remove from localStorage
        },
    },
});

export const { setUserLogged, clearUser } = userSlice.actions;
export default userSlice.reducer;
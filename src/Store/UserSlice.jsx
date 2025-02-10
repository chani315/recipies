import { createSlice } from '@reduxjs/toolkit';

const initialValue = {
    name: "אורח",
    email: ""
};

const UserSlice = createSlice({
    name: "user",
    initialState: initialValue,
    reducers: {
        updateUser:(state,action)=>{
            state.name=action.payload.name;
            state.email=action.payload.email;
        },
        updateName: (state, action) => {
            state.name = action.payload; // קבלת שם מהפעולה
        },
        updateEmail: (state, action) => {
            state.email = action.payload; // קבלת אימייל מהפעולה
        },
        createUser: (state) => {
            state.name = ""; // איפוס השם
            state.email = ""; // איפוס האימייל
        },
        resetUser: () => initialValue, // איפוס המשתמש לערכי ברירת המחדל
    }
});

export const { updateName, updateEmail, createUser, resetUser,updateUser } = UserSlice.actions;
export default UserSlice.reducer;



// import { createSlice } from '@reduxjs/toolkit'

// const initialValue = {
//     name: "aaa",
//     email: ""
// }

// const reducer = (state = initialValue, action) => {
//     debugger
//     switch (action.type) {
//         case "UpdateName":
//             return {
//                 ...state,
//                 name: action.payload
//             };
//         case "UpdateEmail":
//             return {
//                 ...state,
//                 email: action.payload,
//             };
//         default:
//             return state;

//     }
// }

// // export default reducer

// // const userSlice = createSlice({
// //     name: "user",
// //     initialState: initialValue,
// //     reducers: {
// //         updateUser: (state, action) => {
// //             debugger
// //             state.name = action.payload.name;
// //             state.email = action.payload.email;
// //         },
// //         getName:(state,action) => {
// //             console.log('in')
// //             return state.name;
// //         }
// //     }

// // })

// export const {updateUser,getName} = userSlice.actions
// export default userSlice.reducer



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



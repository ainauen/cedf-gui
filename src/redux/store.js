import { configureStore } from "@reduxjs/toolkit";
import authReducer from './authSlice';

const user = JSON.parse(sessionStorage.getItem('user'));
const token = sessionStorage.getItem('token');

const preloadedState = {
    auth: {
        user: user || null,
        token: token || null,
    },
};

const store = configureStore({
    reducer: {
        auth: authReducer,
    },
    preloadedState,
});
// export default configureStore({
//     reducer: {
//         auth: authReducer,
//     },
// });

export default store;
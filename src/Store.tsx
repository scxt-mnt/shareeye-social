import { configureStore } from '@reduxjs/toolkit'
import userReducer from './Redux Slice/userSlice';
import dataReducer from './Redux Slice/detailsProfileSlice'
import searchReducer from './Redux Slice/SearchSlice'
const Reducers = configureStore({
    reducer: {
        user: userReducer,
        profile: dataReducer,
        search: searchReducer
    }
});

export default Reducers;
export type RootState = ReturnType<typeof Reducers.getState>

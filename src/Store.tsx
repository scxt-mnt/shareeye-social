    import { configureStore } from '@reduxjs/toolkit'
    import  userReducer  from './userSlice';

    const Reducers = configureStore({  
        reducer: {
            user: userReducer
        }
    });

    export default Reducers;  
    export type RootState = ReturnType<typeof Reducers.getState>

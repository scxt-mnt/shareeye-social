    import { configureStore } from '@reduxjs/toolkit'
    import  userReducer  from './userSlice';
    import dataReducer from './detailsProfileSlice'

    const Reducers = configureStore({  
        reducer: {
            user: userReducer,
            profile: dataReducer
        }
    });

    export default Reducers;  
    export type RootState = ReturnType<typeof Reducers.getState>

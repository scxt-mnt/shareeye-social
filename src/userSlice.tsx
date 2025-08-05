import { createSlice } from '@reduxjs/toolkit'

interface stateValues {
    value: {
        id: number | null
    username: string
}  
}
const initialState: stateValues = {
    value: {
        id: null,
        username: ''
    }
}

const Slice = createSlice({
    name: 'user',
    initialState,
    reducers: {
    setUser(state, action){
        state.value.id = action.payload.id
        state.value.username = action.payload.user
    },
    setLogOut(state, action){
        state.value.id = null
        state.value.username = ""
    }
}
}) 


export const {setUser, setLogOut} = Slice.actions;
export default Slice.reducer;


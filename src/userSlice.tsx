import { createSlice } from '@reduxjs/toolkit'

interface stateValues {
    value: {
        id: number | null
        username: string
        isLog: boolean | null
    }
}
const initialState: stateValues = {
    value: {
        id: null,
        username: '',
        isLog: null
    }
}

const Slice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action) {
            state.value.id = action.payload.id
            state.value.username = action.payload.user
            state.value.isLog = action.payload.isLog
        },
        setLogOut(state, action) {
            state.value.id = null
            state.value.username = ''
            state.value.isLog = action.payload.isLog
        }
    }
})


export const { setUser, setLogOut } = Slice.actions;
export default Slice.reducer;


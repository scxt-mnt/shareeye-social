import { createSlice } from "@reduxjs/toolkit";

interface dataValue{
    value: {
        name: string,
        lastName: string,
        bio: '',
        profileUrl: string,
        coverUrl: string
    }
}

const initialValue: dataValue = {
    value: {
    name: '',
    lastName: '',
    bio: '',
    profileUrl: '',
    coverUrl: ''}
}

const Slice = createSlice({
    name: 'profileDetails',
    initialState: initialValue,
    reducers: {
        setDetails(state, action){
            state.value = action.payload
        }
    }
})

export const {setDetails} = Slice.actions;
export default Slice.reducer;
import { createSlice } from "@reduxjs/toolkit";

interface dataValue{
    value: {
        name: string,
        lastName: string,
        cover: '',
        profileUrl: string,
        coverUrl: string
    }
}

const initialValue: dataValue = {
    value: {
    name: '',
    lastName: '',
    cover: '',
    profileUrl: '',
    coverUrl: ''}
}

const Slice = createSlice({
    name: 'profileDetails',
    initialState: initialValue,
    reducers: {
        setDetails(state, action){
            state.value.name = action.payload.name
        }
    }
})

export const {setDetails} = Slice.actions;
export default Slice.reducer;
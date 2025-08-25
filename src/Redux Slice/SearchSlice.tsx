import { createSlice } from "@reduxjs/toolkit";

interface stateValues {
        id: number | null,
        profileImage: string,
        name: string ,
        lastName: string 
}

interface dataValues{
    value: stateValues[]
}

const initialState: dataValues = {
    value: []
}

const searchSlice = createSlice({
    name: 'searchSlice',
    initialState: initialState,
    reducers: {
        setSearch(state, action) {
            state.value = action.payload
        },
        setClear(state){
            state.value = []
        }
    }
    
})

export const { setSearch,setClear } = searchSlice.actions;
export default searchSlice.reducer
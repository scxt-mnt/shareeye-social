import { createSlice } from "@reduxjs/toolkit";

interface stateValues {
        id: number | null,
        name: string,
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
        }
    }
})

export const { setSearch } = searchSlice.actions;
export default searchSlice.reducer
import { createSlice } from "@reduxjs/toolkit";



interface postData{
        caption: string,
        imageLink: string
}

interface valueData{
    value: postData[]
}

const posts: valueData = {
    value: []
}

const Slice = createSlice({
    name: "postDetails",
    initialState: posts,
    reducers:{
        setPost(state, action) {
            state.value = action.payload
        }
    }

});

export const {setPost} = Slice.actions;
export default Slice.reducer;

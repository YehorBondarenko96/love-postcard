import { createSlice} from "@reduxjs/toolkit";

const initialState = {
    screenWidth: 0
    };

const slice = createSlice({
    name: 'redux',
    initialState: initialState,
    reducers:{
        setScreenWidth: (state, action) => {state.screenWidth = action.payload},
    }
});

export const reducer = slice.reducer;
export const {setScreenWidth} = slice.actions;
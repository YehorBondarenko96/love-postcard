import { createSlice} from "@reduxjs/toolkit";

const initialState = {
    screenWidth: 0,
    screenHeight: 0
    };

const slice = createSlice({
    name: 'redux',
    initialState: initialState,
    reducers:{
        setScreenWidth: (state, action) => { state.screenWidth = action.payload },
        setScreenHeight: (state, action) => {state.screenHeight = action.payload},
    }
});

export const reducer = slice.reducer;
export const {setScreenWidth, setScreenHeight} = slice.actions;
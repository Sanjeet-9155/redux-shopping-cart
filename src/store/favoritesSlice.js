import { createSlice } from '@reduxjs/toolkit';

const favoritesSlice = createSlice({
    name: 'favorites',
    initialState: [],
    reducers: {
        add(state, action) {
            state.push(action.payload);
        },
        // You can add more actions like remove, clear, etc.
    },
});

export const { add } = favoritesSlice.actions;
export default favoritesSlice.reducer;

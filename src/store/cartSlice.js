const { createSlice } = require('@reduxjs/toolkit');

const cartSlice = createSlice({
    name: 'cart',
    initialState: [],
    reducers: {
        add(state, action) {
            state.push(action.payload);
        },
        remove(state, action) {
            return state.filter((item) => item.id !== action.payload);
        },
    },
});

export const { add, remove } = cartSlice.actions;
export default cartSlice.reducer;


//{add,remove} ye ak indivisal functinalty hai age 10 reduces hai 
             // to 10 export karne parge much pata ki kon components kon reducer use ho jaye

// ak chahye main sare reducer {export default} krna isliye esko krna hai isko kam lina hai state ke under
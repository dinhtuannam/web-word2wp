import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getCategories } from '../services/category-service';

const initialState = {
    category: [],
    list: []
};

export const getCategoriesThunk = createAsyncThunk('getCategoriesThunk', async () => {
    const response = await getCategories();
    return response;
});

export const dropdownSlice = createSlice({
    name: 'dropdown',
    initialState,
    reducers: {
        selectCategory: (state, action) => {
            state.category = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCategoriesThunk.pending, (state) => {
                state.list = state.list
            })
            .addCase(getCategoriesThunk.fulfilled, (state, action) => {
                state.list = action.payload
            })
            .addCase(getCategoriesThunk.rejected, (state, action) => {
                state.list = []
            });
    },
});

export const { selectCategory } = dropdownSlice.actions;

export const dropdownReducer = dropdownSlice.reducer;

export default dropdownReducer;
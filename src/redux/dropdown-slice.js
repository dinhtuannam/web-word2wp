import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getCategories } from '../services/category-service';

const initialState = {
    category: [],
    list: [],
    loading: false,
    url: 'https://development.matbao.website'
};

export const getCategoriesThunk = createAsyncThunk('getCategoriesThunk', async (url) => {
    const response = await getCategories(url);
    return response;
});

export const dropdownSlice = createSlice({
    name: 'dropdown',
    initialState,
    reducers: {
        selectCategory: (state, action) => {
            state.category = action.payload;
        },
        updateUrl: (state, action) => {
            state.url = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCategoriesThunk.pending, (state) => {
                state.loading = true
                state.list = state.list
            })
            .addCase(getCategoriesThunk.fulfilled, (state, action) => {
                state.loading = false
                state.list = action.payload
            })
            .addCase(getCategoriesThunk.rejected, (state, action) => {
                state.loading = false
                state.list = []
            });
    },
});

export const { selectCategory, updateUrl } = dropdownSlice.actions;

export const dropdownReducer = dropdownSlice.reducer;

export default dropdownReducer;
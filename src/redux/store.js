import { configureStore } from '@reduxjs/toolkit';
import dropdownReducer from './dropdown-slice';

export const store = configureStore({
    reducer: {
        dropdownReducer: dropdownReducer,
    },
});


import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../../app/store";

const initialState = [
    {
        id: '1',
        title: 'Learning Redux Toolkit',
        content: "I've heard good things.",
    },
    {
        id: '2',
        title: 'Slices...',
        content: "The more I say slice, the more I want pizza.",
    }
];

const postSlice = createSlice({
        name: 'posts',
        initialState,
        reducers: {},
    }
);

// reference: https://redux.js.org/usage/usage-with-typescript#define-root-state-and-dispatch-types
// export const selectAllPosts = (state: any) => state.posts;
export const selectAllPosts = (state: RootState) => state.posts;

export default postSlice.reducer;
import {createSlice, nanoid, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../../app/store";
import {sub} from "date-fns";

interface Post {
    userId: string;
    id: string;
    title: string;
    content: string;
    date: string;
}

const initialState: Post[] = [
    {
        id: '1',
        title: 'Learning Redux Toolkit',
        content: "I've heard good things.",
        userId: '',
        date: sub(new Date(), {minutes: 10}).toISOString()
    },
    {
        id: '2',
        title: 'Slices...',
        content: "The more I say slice, the more I want pizza.",
        userId: '',
        date: sub(new Date(), {minutes: 5}).toISOString()
    }
];

const postSlice = createSlice({
        name: 'posts',
        initialState,
        reducers: {
            postAdded: {
                reducer(state, action: PayloadAction<Post>) {
                    state.push(action.payload);
                },
                prepare(title: string, content: string, userId: string) {
                    return {
                        payload: {
                            id: nanoid(),
                            title,
                            content,
                            userId,
                            date: new Date().toISOString(),
                        }
                    };
                }
            }
            // postAdded(state, action: PayloadAction<Post>) {
            //     state.push(action.payload);
            // }
        },
    }
);

// reference: https://redux.js.org/usage/usage-with-typescript#define-root-state-and-dispatch-types
// export const selectAllPosts = (state: any) => state.posts;
export const selectAllPosts = (state: RootState) => state.posts;
export const {postAdded} = postSlice.actions;

export default postSlice.reducer;
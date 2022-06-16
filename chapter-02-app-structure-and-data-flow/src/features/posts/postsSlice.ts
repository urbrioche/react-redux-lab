import {createSlice, nanoid, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../../app/store";
import {sub} from "date-fns";

interface Reactions {
    thumbsUp: number;
    wow: number;
    heart: number;
    rocket: number;
    coffee: number;
}

export interface Post {
    userId: string;
    id: string;
    title: string;
    content: string;
    date: string;
    reactions: Reactions;
}

const initialState: Post[] = [
    {
        id: '1',
        title: 'Learning Redux Toolkit',
        content: "I've heard good things.",
        userId: '',
        date: sub(new Date(), {minutes: 10}).toISOString(),
        reactions: {
            thumbsUp: 0,
            wow: 0,
            heart: 0,
            rocket: 0,
            coffee: 0
        }
    },
    {
        id: '2',
        title: 'Slices...',
        content: "The more I say slice, the more I want pizza.",
        userId: '',
        date: sub(new Date(), {minutes: 5}).toISOString(),
        reactions: {
            thumbsUp: 0,
            wow: 0,
            heart: 0,
            rocket: 0,
            coffee: 0
        }
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
                            reactions: {
                                thumbsUp: 0,
                                wow: 0,
                                heart: 0,
                                rocket: 0,
                                coffee: 0
                            }
                        }
                    };
                }
            },
            // postAdded(state, action: PayloadAction<Post>) {
            //     state.push(action.payload);
            // }
            reactionAdded(state, action: PayloadAction<{ postId: string, reaction: keyof Reactions }>) {
                const {postId, reaction} = action.payload;
                const existingPost = state.find(post => post.id === postId);
                if (existingPost) {
                    existingPost.reactions[reaction]++;
                }
            }
        },
    }
);

// reference: https://redux.js.org/usage/usage-with-typescript#define-root-state-and-dispatch-types
// export const selectAllPosts = (state: any) => state.posts;
export const selectAllPosts = (state: RootState) => state.posts;
export const {postAdded, reactionAdded} = postSlice.actions;

export default postSlice.reducer;
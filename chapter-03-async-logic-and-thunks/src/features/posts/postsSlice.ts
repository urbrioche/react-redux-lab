import {createAsyncThunk, createSlice, nanoid, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../../app/store";
import axios from "axios";
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

type status = 'idle' | 'loading' | 'succeeded' | 'failed'

const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts';

const initialState: {
    posts: Post[];
    status: status;
    error: string | null;
} = {
    posts: [],
    status: 'idle',
    error: null,
};

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    const response = await axios.get(POSTS_URL);
    return response.data;
});

const postSlice = createSlice({
        name: 'posts',
        initialState,
        reducers: {
            postAdded: {
                reducer(state, action: PayloadAction<Post>) {
                    state.posts.push(action.payload);
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
                const existingPost = state.posts.find(post => post.id === postId);
                if (existingPost) {
                    existingPost.reactions[reaction]++;
                }
            }
        },
        extraReducers(builder) {
            builder
                .addCase(fetchPosts.pending, (state, action) => {
                    state.status = 'loading';
                })
                .addCase(fetchPosts.fulfilled, (state, action: PayloadAction<Post[]>) => {
                    state.status = 'succeeded';
                    let min = 1;
                    const loadedPosts = action.payload.map(post => {
                        post.date = sub(new Date(), {minutes: min++}).toISOString();
                        post.reactions = {
                            thumbsUp: 0,
                            wow: 0,
                            heart: 0,
                            rocket: 0,
                            coffee: 0,
                        };
                        return post;
                    });

                    state.posts = state.posts.concat(loadedPosts);
                })
                .addCase(fetchPosts.rejected, (state, action) => {
                    state.status = 'failed';
                    state.error = action.error.message || '';
                });

        }
    }
);

// reference: https://redux.js.org/usage/usage-with-typescript#define-root-state-and-dispatch-types
// export const selectAllPosts = (state: any) => state.posts;
export const selectAllPosts = (state: RootState) => state.posts.posts;
export const getPostStatus = (state: RootState) => state.posts.status;
export const getPostsError = (state: RootState) => state.posts.error;

export const {postAdded, reactionAdded} = postSlice.actions;

export default postSlice.reducer;
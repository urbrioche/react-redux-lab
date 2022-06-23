import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
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
    userId: number;
    id: number | string;
    title: string;
    body: string;
    date: string;
    reactions: Reactions;
}

export type Status = 'idle' | 'loading' | 'succeeded' | 'failed' | 'pending'

const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts';

const initialState: {
    posts: Post[];
    status: Status;
    error: string | null;
    count: number;
} = {
    posts: [],
    status: 'idle',
    error: null,
    count: 0,
};

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    const response = await axios.get(POSTS_URL);
    return response.data;
});

export const addNewPost = createAsyncThunk('posts/addNewPost', async (initialPost: Post) => {
    const response = await axios.post(POSTS_URL, initialPost);
    return response.data;
});

export const updatePost = createAsyncThunk('posts/updatePost', async (initialPost: Omit<Post, "date">) => {
    const {id} = initialPost;
    try {
        const response = await axios.put(`${POSTS_URL}/${id}`, initialPost);
        return response.data;
    } catch (err) {
        //return err.message;
        return initialPost; // only for testing Redux! since we cannot really updatePost through the fake API
    }
});

export const deletePost = createAsyncThunk('posts/deletePost', async (initialPost: Partial<Post>) => {
    const {id} = initialPost;
    try {
        const response = await axios.delete(`${POSTS_URL}/${id}`);
        if (response?.status === 200) {
            return initialPost;
        }
        return `${response?.status}: ${response?.statusText}`;
    } catch (err: any) {
        return err.message;
    }
});

const postSlice = createSlice({
        name: 'posts',
        initialState,
        reducers: {
            reactionAdded(state, action: PayloadAction<{ postId: string | number, reaction: keyof Reactions }>) {
                const {postId, reaction} = action.payload;
                const existingPost = state.posts.find(post => post.id === postId);
                if (existingPost) {
                    existingPost.reactions[reaction]++;
                }
            },
            increaseCount(state) {
                state.count = state.count + 1;
            }
        },
        extraReducers: function (builder) {
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

                    // state.posts = state.posts.concat(loadedPosts);
                    state.posts = loadedPosts;
                })
                .addCase(fetchPosts.rejected, (state, action) => {
                    state.status = 'failed';
                    state.error = action.error.message || '';
                })
                .addCase(addNewPost.fulfilled, (state, action: PayloadAction<Post>) => {
                    const post = action.payload;
                    post.date = new Date().toISOString();
                    post.reactions = {
                        thumbsUp: 0,
                        wow: 0,
                        heart: 0,
                        rocket: 0,
                        coffee: 0,
                    };
                    console.log(action.payload);
                    state.posts.push(action.payload);
                })
                .addCase(updatePost.fulfilled, (state, action: PayloadAction<Post>) => {
                    if (!action.payload?.id) {
                        console.log('Update could not complete');
                        console.log(action.payload);
                        return;
                    }

                    const {id} = action.payload;
                    action.payload.date = new Date().toISOString();
                    const posts = state.posts.filter(post => post.id !== id);
                    state.posts = [...posts, action.payload];
                })
                .addCase(deletePost.fulfilled, (state, action: PayloadAction<Post>) => {
                    if (!action.payload?.id) {
                        console.log('Delete could not complete');
                        console.log(action.payload);
                        return;
                    }
                    const {id} = action.payload;
                    state.posts = state.posts.filter(post => post.id !== id);
                });

        }
    }
);

// reference: https://redux.js.org/usage/usage-with-typescript#define-root-state-and-dispatch-types
// export const selectAllPosts = (state: any) => state.posts;
export const selectAllPosts = (state: RootState) => state.posts.posts;
export const getPostStatus = (state: RootState) => state.posts.status;
export const getPostsError = (state: RootState) => state.posts.error;
export const getCount = (state: RootState) => state.posts.count;
export const selectPostById = (state: RootState, postId: number) => state.posts.posts.find(post => post.id === postId);

export const {increaseCount, reactionAdded} = postSlice.actions;

export default postSlice.reducer;
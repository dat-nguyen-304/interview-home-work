import { RootState } from '../index';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Comment = {
    email: string;
    content: string;
    createdAt: number;
};

export interface Post {
    id: number;
    ownerId: number;
    title: string;
    content: string;
    comments: Comment[];
    owner: {
        email: string;
        name: string;
    };
    createdAt: number;
}

interface PostsState {
    posts: Post[];
    keyword: string;
    loading: boolean;
    error: string | null;
    page: number;
    hasMore: boolean;
}

const initialState: PostsState = {
    posts: [],
    keyword: '',
    loading: false,
    error: null,
    page: 1,
    hasMore: true
};

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        fetchPostsStart(state) {
            state.loading = true;
            state.error = null;
        },
        fetchPostsSuccess(state, action: PayloadAction<Post[]>) {
            state.loading = false;
            state.posts = action.payload;
        },
        fetchPostsFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },
        loadMorePostsStart(state) {
            state.loading = true;
        },
        loadMorePostsSuccess(state, action: PayloadAction<Post[]>) {
            state.loading = false;
            state.posts = [...state.posts, ...action.payload];
            state.page++;
            state.hasMore = action.payload.length > 0;
        },
        searchPostsStart(state, action: PayloadAction<string>) {
            state.loading = true;
            state.keyword = action.payload;
        }
    }
});

export const {
    fetchPostsStart,
    fetchPostsSuccess,
    fetchPostsFailure,
    loadMorePostsStart,
    loadMorePostsSuccess,
    searchPostsStart
} = postsSlice.actions;

export const selectPosts = (state: RootState) => state.posts;
export default postsSlice.reducer;

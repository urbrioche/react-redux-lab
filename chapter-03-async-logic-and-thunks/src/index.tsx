import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import PostList from "./features/posts/PostList";
import {Provider} from "react-redux";
import {store} from "./app/store";
import AddPostForm from "./features/posts/AddPostForm";
import {fetchUsers} from "./features/users/usersSlice";

store.dispatch(fetchUsers());

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <AddPostForm/>
            <PostList/>
        </Provider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

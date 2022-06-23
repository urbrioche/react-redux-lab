import React from 'react';
import './App.css';
import AddPostForm from "./features/posts/AddPostForm";
import PostList from "./features/posts/PostList";
import {Route, Routes, Navigate} from "react-router-dom";
import Layout from "./components/Layout";
import SinglePostPage from "./features/posts/SinglePostPage";
import EditPostForm from "./features/posts/EditPostForm";
import UserPage from "./features/users/UserPage";
import UserList from "./features/users/UsersList";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout/>}>
                <Route index element={<PostList/>}/>
                <Route path="post">
                    <Route index element={<AddPostForm/>}/>
                    <Route path=":postId" element={<SinglePostPage/>}/>
                    <Route path="edit/:postId" element={<EditPostForm/>}/>
                </Route>

                <Route path="user">
                    <Route index element={<UserList/>}/>
                    <Route path=":userId" element={<UserPage/>}/>
                </Route>

                {/* Catch all - replace with 404 component if you want */}
                <Route path="*" element={<Navigate to="/" replace/>}/>
            </Route>
        </Routes>
    );
}

export default App;

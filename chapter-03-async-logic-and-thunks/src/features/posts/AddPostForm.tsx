import {ChangeEvent, useState} from "react";
import {useAppDispatch} from "../../hooks/useAppDispatch";
import {postAdded} from "./postsSlice";
import {selectAllUsers} from "../users/usersSlice";
import {useAppSelector} from "../../hooks/useAppSelector";

const AddPostForm = () => {
    const dispatch = useAppDispatch();

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [userId, setUserId] = useState('');
    const users = useAppSelector(selectAllUsers);

    const onTitleChanged = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value);
    const onContentChanged = (e: ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value);
    const onAuthorChange = (e: ChangeEvent<HTMLSelectElement>) => setUserId(e.target.value);
    const onSavePostClicked = () => {
        if (title && content) {
            dispatch(postAdded(
                title,
                content,
                userId,
            ));
            setTitle('');
            setContent('');
        }
    };

    const canSave = Boolean(title) && Boolean(content) && Boolean(userId);

    const usersOptions = users.map(user => (
        <option key={user.id} value={user.id}>
            {user.name}
        </option>
    ));
   
    return (
        <section>
            <h2>Add a New Post</h2>
            <form className="form">
                <label htmlFor="postTitle">Post Title:</label>
                <input
                    type="text"
                    id="postTitle"
                    name="postTitle"
                    value={title}
                    onChange={onTitleChanged}
                />
                <label htmlFor="postAuthor">Author:</label>
                <select id="postAuthor" value={userId} onChange={onAuthorChange}>
                    <option value=""></option>
                    {usersOptions}
                </select>
                <label htmlFor="postContent">Content:</label>
                <textarea
                    id="postContent"
                    name="postContent"
                    value={content}
                    onChange={onContentChanged}
                />
                <button
                    type="button"
                    onClick={onSavePostClicked}
                    disabled={!canSave}
                >Save Post
                </button>
            </form>
        </section>);
};

export default AddPostForm;
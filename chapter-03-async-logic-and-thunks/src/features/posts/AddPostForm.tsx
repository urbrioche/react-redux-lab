import {ChangeEvent, useState} from "react";
import {useAppDispatch} from "../../hooks/useAppDispatch";
import {postAdded, addNewPost, Status, Post} from "./postsSlice";
import {selectAllUsers} from "../users/usersSlice";
import {useAppSelector} from "../../hooks/useAppSelector";

const AddPostForm = () => {
    const dispatch = useAppDispatch();

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [userId, setUserId] = useState(0);
    const [addRequestStatus, setAddRequestStatus] = useState<Status>('idle');
    const users = useAppSelector(selectAllUsers);

    const onTitleChanged = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value);
    const onContentChanged = (e: ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value);
    const onAuthorChange = (e: ChangeEvent<HTMLSelectElement>) => setUserId(Number(e.target.value));

    const canSave = [title, content, userId].every(Boolean) && addRequestStatus === 'idle';

    const onSavePostClicked = () => {
        if (canSave) {
            try {
                setAddRequestStatus('pending');
                const post: Post = {
                    title,
                    body: content,
                    userId,
                    date: '',
                    reactions: {
                        thumbsUp: 0,
                        wow: 0,
                        heart: 0,
                        rocket: 0,
                        coffee: 0,
                    },
                    id: '',
                };
                dispatch(addNewPost(post)).unwrap();
                setTitle('');
                setContent('');
                setUserId(0);
            } catch (err) {
                console.error('Failed to save the post', err);
            } finally {
                setAddRequestStatus('idle');
            }
        }
    };


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
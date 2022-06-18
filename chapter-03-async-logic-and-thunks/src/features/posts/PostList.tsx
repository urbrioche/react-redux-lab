import {useAppSelector} from "../../hooks/useAppSelector";
import {useAppDispatch} from "../../hooks/useAppDispatch";
import React, {useEffect} from "react";
import {selectAllPosts, getPostStatus, getPostsError, fetchPosts} from "./postsSlice";
import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButtons";
import PostsExcerpt from "./PostsExcerpt";

const PostList = () => {
    const dispatch = useAppDispatch();
    // const posts = useSelector<RootState, { id: string, title: string, content: string }[]>(state => state.posts);
    const posts = useAppSelector(selectAllPosts);
    const postsStatus = useAppSelector(getPostStatus);
    const error = useAppSelector(getPostsError);

    useEffect(() => {
        if (postsStatus === 'idle') {
            dispatch(fetchPosts());
        }
    }, [postsStatus, dispatch]);

    let content: React.ReactElement | React.ReactElement[] | null = null;
    if (postsStatus === 'loading') {
        content = <p>Loading</p>;
    } else if (postsStatus === 'succeeded') {
        const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date));
        content = orderedPosts.map(post => <PostsExcerpt key={post.id} post={post}/>);
    } else if (postsStatus == 'failed') {
        content = <p>{error}</p>;
    }

    return <>
        <section>
            <h2>Posts</h2>
            {content}
        </section>
    </>;
};

export default PostList;
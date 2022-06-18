import {useAppSelector} from "../../hooks/useAppSelector";
import {useAppDispatch} from "../../hooks/useAppDispatch";
import {useEffect} from "react";
import {selectAllPosts, getPostStatus, getPostsError, fetchPosts} from "./postsSlice";
import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButtons";

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

    const renderPosts = posts.map(post => (
        <article key={post.id}>
            <h3>{post.title}</h3>
            <h3>{post.content?.substring(0, 100)}</h3>
            <p className="postCredit">
                <PostAuthor userId={post.userId}/>
                <TimeAgo timestamp={post.date}/>
            </p>
            <ReactionButtons post={post}/>
        </article>
    ));
    return <>
        <section>
            <h2>Posts</h2>
            {renderPosts}
        </section>
    </>;
};

export default PostList;
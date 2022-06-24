import {useAppSelector} from "../../hooks/useAppSelector";
import React from "react";
import {getPostStatus, getPostsError, selectPostIds} from "./postsSlice";
import PostsExcerpt from "./PostsExcerpt";

const PostList = () => {
    // const posts = useSelector<RootState, { id: string, title: string, content: string }[]>(state => state.posts);
    const orderedPostIds = useAppSelector(selectPostIds);
    const postsStatus = useAppSelector(getPostStatus);
    const error = useAppSelector(getPostsError);

    let content: React.ReactElement | React.ReactElement[] | null = null;
    if (postsStatus === 'loading') {
        content = <p>Loading</p>;
    } else if (postsStatus === 'succeeded') {
        content = orderedPostIds.map(postId => <PostsExcerpt key={postId} postId={postId}/>);
    } else if (postsStatus === 'failed') {
        content = <p>{error}</p>;
    }

    return <>
        <section>
            {content}
        </section>
    </>;
};

export default PostList;
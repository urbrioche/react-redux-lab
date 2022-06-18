import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButtons";
import {Post} from "./postsSlice";

const PostsExcerpt = ({post}: { post: Post }) => {
    return (
        <article>
            <h3>{post.title}</h3>
            <h3>{post.body?.substring(0, 100)}</h3>
            <p className="postCredit">
                <PostAuthor userId={post.userId}/>
                <TimeAgo timestamp={post.date}/>
            </p>
            <ReactionButtons post={post}/>
        </article>
    );
};

export default PostsExcerpt;
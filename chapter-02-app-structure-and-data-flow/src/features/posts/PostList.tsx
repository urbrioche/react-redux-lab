import {useSelector} from "react-redux";
import {RootState} from "../../app/store";

const PostList = () => {
    const posts = useSelector<RootState, { id: string, title: string, content: string }[]>(state => state.posts);
    const renderPosts = posts.map(post => (
        <article key={post.id}>
            <h3>{post.title}</h3>
            <h3>{post.content.substring(0, 100)}</h3>
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
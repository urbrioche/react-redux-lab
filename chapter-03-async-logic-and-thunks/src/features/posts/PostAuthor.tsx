import {useAppSelector} from "../../hooks/useAppSelector";
import {selectAllUsers} from "../users/usersSlice";

const PostAuthor = ({userId}: { userId: number }) => {
    const users = useAppSelector(selectAllUsers);
    const author = users.find(user => user.id === userId);

    return <span>
            {author ? author.name : 'Unknown author'}
        </span>;

};

export default PostAuthor; 
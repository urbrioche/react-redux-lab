import {useAppSelector as useSelector} from "../../hooks/useAppSelector";
import {selectAllUsers} from "./usersSlice";
import {Link} from "react-router-dom";

const UsersList = () => {
    let users = useSelector(selectAllUsers);

    let renderedUsers = users.map(user => (
        <li key={user.id}>
            <Link to={`/user/${user.id}`}>{user.name}</Link>
        </li>
    ));

    return (
        <section>
            <h2>Users</h2>
            <ul>{renderedUsers}</ul>
        </section>
    );
};

export default UsersList;
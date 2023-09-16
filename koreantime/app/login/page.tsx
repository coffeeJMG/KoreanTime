import getCurrentLocation from "../actions/getCurrentLocation";
import getCurrentUser from "../actions/getCurrentUser";
import Login from "../components/LoginForm";

const loginPage = async () => {
    const currentUser = await getCurrentUser();

    return (
        <>
            <Login currentUser={currentUser} />
        </>
    );
};

export default loginPage;

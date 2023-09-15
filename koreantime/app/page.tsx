import getCurrentUser from "./actions/getCurrentUser";
import LoginForm from "./login/LoginForm";

export default async function Home() {
    const currentUser = await getCurrentUser();

    return (
        <>
            <LoginForm currentUser={currentUser} />
        </>
    );
}

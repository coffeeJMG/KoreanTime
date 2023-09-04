import getCurrentUser from "./actions/getCurrentUser";
import LoginForm from "./login/page";

export default async function Home() {
    const currentUser = await getCurrentUser();
    return <LoginForm currentUser={currentUser} />;
}

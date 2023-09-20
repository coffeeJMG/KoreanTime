import React from "react";

import getCurrentUser from "../actions/getCurrentUser";
import Login from "../components/LoginForm";

const LoginPage = async () => {
    const currentUser = await getCurrentUser();

    return (
        <>
            <Login currentUser={currentUser} />
        </>
    );
};

export default LoginPage;

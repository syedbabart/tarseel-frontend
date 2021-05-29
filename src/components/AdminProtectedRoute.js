import React from "react";
import {Route, Redirect} from "react-router-dom";
import auth from "../auth/auth";

const AdminProtectedRoute = ({
                            component: Component,
                            ...rest
                        }) => {
    return (
        <Route
            {...rest}
            render={props => {
                if (auth.isLoggedIn() && auth.getUserType() === 'admin') {
                    return <Component {...props} />;
                } else {
                    return (
                        <Redirect
                            to={{
                                pathname: "/",
                                state: {
                                    from: props.location
                                }
                            }}
                        />
                    );
                }
            }}
        />
    );
};
export default AdminProtectedRoute

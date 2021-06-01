import React from "react";
import {Route, Redirect} from "react-router-dom";
import auth from "./auth";
// import auth from "";

const CustomerOnlyRoute = ({
                            component: Component,
                            ...rest
                        }) => {
    return (
        <Route
            {...rest}
            render={props => {
                if (!auth.isLoggedIn() || (auth.isLoggedIn() && auth.getUserType() !== 'admin' && auth.getUserType() !== 'employee')) {
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
export default CustomerOnlyRoute

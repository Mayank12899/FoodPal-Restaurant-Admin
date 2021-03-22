import React from 'react';
import { connect, useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
// import { isLoggedIn } from '../reducers/signinSlice';

const PrivateRoute = ({
    component: Component,
    ...rest
}) => {

    var isAuthenticated = useSelector((state) => state.signin.isLoggedIn)
    return (
        <Route {...rest} component={(props) => (
            isAuthenticated ? (
                <div>
                    <div className="bodyComponent">
                        <Component {...props} />
                    </div>
                </div>
            ) : (
                    <Redirect to="/" />
                )
        )} />
    );
}

export default PrivateRoute;

// const mapStateToProps = (state) => ({
//     isAuthenticated: !!state.auth.isLoggedIn
// });

// export default connect(mapStateToProps)(PrivateRoute);
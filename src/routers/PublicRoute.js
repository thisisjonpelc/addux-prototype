import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const PublicRoute = ({
    isAuthenticated,
    component: Component,
    ...rest
}) => {

    return (
        <Route {...rest} component={(props) => {
            
            return (
                isAuthenticated ? (
                    <Redirect to="/" />
                ) : (
                        <Component {...props} />
                    )
            )
        }} />
    );

};

// const PublicRoute = (props) => {

//     console.log(props);

//     return (
//         <Route {...rest} component={(props) => (
//             props.isAuthenticated ? (
//                 <Redirect to="/" />
//             ) : (
//                 <Component {...props} />
//             )
//         )} />
//     );
// }

const mapStateToProps = (state) => {
    return {
        isAuthenticated: '_id' in state.auth
    };
};

export default connect(mapStateToProps)(PublicRoute);
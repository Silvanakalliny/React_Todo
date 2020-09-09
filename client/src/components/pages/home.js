import React from 'react';
import { AuthUserContext } from '../session'
import MyList from '../pages/myList'
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes'

function Navigation() {
    return (
    <div>
        <AuthUserContext.Consumer>
            {authUser => authUser ? <MyList authUser={authUser} /> : <GenericLanding />}
        </AuthUserContext.Consumer>
    </div>
    )
}

function GenericLanding() {
    return (
        <React.Fragment>
            <h1> Log in to see your To-Do items. </h1>
            <Link to={ROUTES.SIGN_IN}>Log In</Link>
        </React.Fragment>    
    )
}

export default Navigation
import React from 'react';
import { AuthUserContext } from '../session'
import MyList from '../pages/myList'

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
        <h1> Log in to see your To-Do items. </h1>
    )
}

export default Navigation
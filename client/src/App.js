import { BrowserRouter as Router, Route } from 'react-router-dom'
import React, { Component } from 'react';
import './App.css';
import Header from './components/layout/header'
import signUp from './components/pages/signUp'
import logIn from './components/SignIn/index'
import * as ROUTES from './constants/routes'
import { withFirebase } from './components/firebase'
import { AuthUserContext } from './components/session'
import MyList from './components/pages/myList'
import about from './components/pages/about';
import home from './components/pages/home'


class App extends Component {
  constructor(props) {
    super(props)
    this.state = { authUser: null }
  }

  componentDidMount() {
    this.listener = this.props.firebase.auth.onAuthStateChanged(authUser => {
      authUser
        ? this.setState({ authUser })
        : this.setState({ authUser: null });
    })

  }

  componentWillUnmount() {
    this.listener()
  }

  render() {

    return (
      <AuthUserContext.Provider value={this.state.authUser}>
        <Router>
          <div className='container'>
            <div className="App">
              <Header />
              
              <Route path={ROUTES.ABOUT} component={about} />
              <Route path={ROUTES.SIGN_IN} component={logIn} />
              <Route path={ROUTES.SIGN_UP} component={signUp} />
              <Route exact path={ROUTES.HOME} component={home}/>

            </div>
          </div>
        </Router>
      </AuthUserContext.Provider>
    );
  }

}

export default withFirebase(App);

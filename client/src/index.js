import React from 'react'
import ReactDOM from 'react-dom'


import App from './components/App'
import SignIn from './components/auth/signin'
import SignOut from './components/auth/signout'
import SignUp from './components/auth/signup'
import DashBoard from './components/dashboard'
import RequireAuth from './components/auth/require_auth'
import Home from './components/Home'

import './stylesheet/signup.css'
import './stylesheet/signin.css'
import './stylesheet/modal.css'

import { Provider } from 'react-redux'
import reducers from './reducers'

import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import './stylesheet/index.css';

const user = JSON.parse(localStorage.getItem('user'))
var correctDataHandler = (transition, replace) => {
if( user && Number(transition.params.id) !== user.userId ) {
  //console.log('!!!!!! WRONG !!!!!!!')
  replace({ nextPathname: transition.location.pathname }, '/', transition.location.query)
 }
};

ReactDOM.render(
  <Provider store={reducers}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
      	<IndexRoute component={Home}/>
        <Route path="signin" component={SignIn}/>
        <Route path="signout" component={SignOut}/>
        <Route path="signup" component={SignUp}/>
        <Route path="dashboard/user/:id" component={RequireAuth(DashBoard)} onEnter={ correctDataHandler }/>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);

//registerServiceWorker();

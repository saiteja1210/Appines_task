import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Auth from './Components/Auth';
import Dashboard from './Components/Dashboard';
import { connect } from 'react-redux';
import { authenticated, unAuthorised } from './ReduxStore/Action';
import userData from './Config/Data.json';
import './App.css'

const App = (props) => {
  useEffect(() => {
    const authCheck = JSON.parse(localStorage.getItem("user"));
    if (authCheck && authCheck.auth) {
      props.authenticated(userData);
    } else {
      props.unAuthorised();
      localStorage.removeItem("user");
    }
  })
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Auth} />
        <AuthRoute exact path="/dashboard" component={Dashboard} isAuth={props.isAuth} />
        <Redirect to="/" />
      </Switch>
    </Router>
  )
}

const mapStateToProps = (state) => ({
  isAuth: state.auth
})

export default connect(mapStateToProps, { authenticated, unAuthorised })(App);

const AuthRoute = ({ component: Component, isAuth, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      return !isAuth ? <Redirect to="/" /> : <Component {...props} />
    }}
  />
)
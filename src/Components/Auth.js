import React, { Component } from 'react';
import credentials from '../Config/auth.json';
import userData from '../Config/Data.json';
import { connect } from 'react-redux';
import { authenticated, unAuthorised } from '../ReduxStore/Action';

class Auth extends Component {
    state = {
        email: "",
        password: ""
    }
    componentDidMount() {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user !== null && user.auth) {
            this.props.history.push('/dashboard');
        }
    }
    setInput = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }
    submitForm = (event) => {
        const { email, password } = this.state;
        event.preventDefault();
        if (email.trim() !== "" || password.trim() !== "") {
            if (email === credentials.email && password === credentials.password) {
                this.props.authenticated(userData);
                localStorage.setItem("user", JSON.stringify({ auth: true }));
                this.props.history.push("/dashboard");
            } else {
                alert("Invalid credentials");
                this.props.unAuthorised();
                localStorage.removeItem("user");
            }
        } else {
            alert("Please enter email and password")
        }
    }
    render() {
        return (
            <div className="auth_container">
                <div className="paper">
                    <h2>Sign in</h2>
                    <form onSubmit={this.submitForm}>
                        <input
                            type="text"
                            name="email"
                            placeholder="Email"
                            onChange={this.setInput}
                            required
                        />
                        <br />
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            onChange={this.setInput}
                            required
                            autoComplete=""
                        />
                        <br />
                        <button className="btn" type="submit" >Login</button>
                    </form>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    isAuth: state.auth
});

export default connect(mapStateToProps, { authenticated, unAuthorised })(Auth);
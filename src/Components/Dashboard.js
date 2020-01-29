import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { unAuthorised } from '../ReduxStore/Action';

const Dashboard = (props) => {
    const logoutUser = () => {
        props.unAuthorised();
        localStorage.removeItem("user");
    }
    return (
        <Fragment>

            <h1 style={{textAlign:'center'}}>Welcome to the dashboard <button className="btn-danger" onClick={logoutUser}>Logout</button> </h1>
            <div style={{ margin: "50px 25px" }}>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Age</th>
                            <th>Gender</th>
                            <th>Email</th>
                            <th>Phone Number</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            props.userData && props.userData.map(user => (
                                <tr key={user.id}>
                                    <td>{user.name}</td>
                                    <td>{user.age}</td>
                                    <td>{user.gender}</td>
                                    <td>{user.email}</td>
                                    <td>{user.phoneNo}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </Fragment>
    )
}

const mapStateToProps = (state) => ({
    userData: state.data
})
export default connect(mapStateToProps, { unAuthorised })(Dashboard);

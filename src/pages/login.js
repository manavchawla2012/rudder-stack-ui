import React, {useState} from "react";
import {FaUserCircle, FaUser, FaLock} from "react-icons/fa";
import PageHOC from "../hoc/PageHOC";
import {checkAuthenticationServerSide} from "../lib/login";
import {connect} from "react-redux";
import {loginAction} from "../redux/actions/authAction";

const LoginPage = ({login}) => {
    const [user_name, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const loginOnClick = (e) => {
        e.preventDefault()
        login(user_name, password)
    }
    return (
        <div className={"login"}>
            <div className="login-container">
                <div className="form-box">
                    <div className="header-form">
                        <h4 className="text-primary text-center"><FaUserCircle fontSize={"110px"}/></h4>
                        <div className="image">
                        </div>
                    </div>
                    <div className="body-form">
                        <form>
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"><FaUser/></span>
                                </div>
                                <input type="text" className="form-control" placeholder="Username"
                                       onChange={e => setUserName(e.target.value)} value={user_name}/>
                            </div>
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"><FaLock/></span>
                                </div>
                                <input type="password" className="form-control" placeholder="Password"
                                       onChange={e => setPassword(e.target.value)} value={password}/>
                            </div>
                            <button type="button" className="btn btn-secondary btn-block"
                                    onClick={loginOnClick}>LOGIN
                            </button>
                            <div className="message">
                                <div><input type="checkbox"/> Remember ME</div>
                                <div><a href="#">Forgot your password</a></div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export async function getServerSideProps(context) {
    await checkAuthenticationServerSide(context)
    return {props: {}}
}

const mapStateToProps = state => {
    return {}
}

const mapDispatchToProps = dispatch => {
    return {
        login: (user_name, password) => dispatch(loginAction(user_name, password))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage)


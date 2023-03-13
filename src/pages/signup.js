import {FaLock, FaMobileAlt, FaUser, FaUserCircle} from "react-icons/fa";
import {checkAuthenticationServerSide} from "../lib/login";
import {connect} from "react-redux";
import {useEffect, useRef, useState} from "react";
import {Alert, Button, Col, Form, Row} from "react-bootstrap";
import {MdEmail} from "react-icons/md";
import axios from "../lib/axios";
import {clientRedirect} from "../lib/redirect";
import {setLoader} from "../redux/actions/commonAction";

const Signup = ({setLoader}) => {
    const defaultFields = {
        email_id: '',
        password: '',
        password2: '',
        first_name: '',
        last_name: '',
        mobile: ''
    }
    const [formData, setFormData] = useState(defaultFields)
    const [buttonDisabled, setButtonDisabled] = useState(true)
    const [error, setError] = useState('')
    const form = useRef()
    const setFormValues = (key, value) => {
        const tempFormData = {...formData}
        tempFormData[key] = value
        setFormData(tempFormData)
    }

    const signUp = (e) => {
        setLoader(true)
        e.preventDefault()
        setError('')
        if (e.target.checkValidity()) {
            axios.post('/auth/register', formData).then(_ => {
                clientRedirect('/login')
            }).catch((err) => {
                setError(err.data.error.message)
                setLoader(false)
            })
        }
    }

    useEffect(() => {
        if (form.current) {
            setButtonDisabled(!form.current.checkValidity() || formData.password !== formData.password2)
        }
    }, [formData])

    return (<div className={"login sign-up"}>
        <div className="login-container">
            <div className="form-box">
                <div className="header-form">
                    <h4 className="text-primary text-center"><FaUserCircle fontSize={"110px"}/></h4>
                    <div className="image">
                    </div>
                </div>
                <div className="body-form">
                    <Form noValidate validated={true} onSubmit={signUp} ref={form}>
                        <Row>
                            <Col className={'col-6'}>
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"><FaUser/></span>
                                    </div>
                                    <input required type="text" className="form-control" placeholder="First Name"
                                           onChange={e => setFormValues('first_name', e.target.value)}
                                           value={formData.first_name}/>
                                    <Form.Control.Feedback type={"invalid"}>This Field is
                                        Required</Form.Control.Feedback>
                                </div>
                            </Col>
                            <Col className={'col-6'}>
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"><FaUser/></span>
                                    </div>
                                    <input required type="text" className="form-control" placeholder="Last Name"
                                           onChange={e => setFormValues('last_name', e.target.value)}
                                           value={formData.last_name}/>
                                </div>
                            </Col>
                        </Row>
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text"><MdEmail/></span>
                            </div>
                            <input required type="text" className="form-control" placeholder="Username"
                                   onChange={e => setFormValues('email_id', e.target.value)} value={formData.email_id}/>
                        </div>
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text"><FaMobileAlt/></span>
                            </div>
                            <input required type="number" className="form-control" placeholder="Mobile Number"
                                   onChange={e => setFormValues('mobile', e.target.value)} value={formData.mobile}
                                   maxLength={10} minLength={10}/>
                        </div>
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text"><FaLock/></span>
                            </div>
                            <input required type="password" className="form-control" placeholder="Password"
                                   onChange={e => setFormValues('password', e.target.value)} value={formData.password}/>
                        </div>
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text"><FaLock/></span>
                            </div>
                            <Form.Control required type="password" className="form-control" placeholder="Password2"
                                          onChange={e => setFormValues('password2', e.target.value)}
                                          value={formData.password2}
                                          isInvalid={formData.password !== formData.password2}
                                          isValid={formData.password === formData.password2}/>
                            <Form.Control.Feedback type={"invalid"}>Password Should Be same</Form.Control.Feedback>
                        </div>
                        {error ?
                            <Alert variant={"danger"}>
                                {error}
                            </Alert> : ''}
                        <Button type="submit" variant={'secondary'} disabled={buttonDisabled} style={{width: '100%'}}>SIGN
                            UP</Button>
                    </Form>
                </div>
            </div>
        </div>
    </div>)
}

export async function getServerSideProps(context) {
    await checkAuthenticationServerSide(context)
    return {props: {}}
}

const mapStateToProps = () => {
    return {}
}

const mapDispatchToProps = dispatch => {
    return {
        setLoader: (state) => dispatch(setLoader(state)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup)

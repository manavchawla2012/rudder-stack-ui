import PageHOC from "../../hoc/PageHOC";
import {Button, Col, Form} from "react-bootstrap";
import {useState} from "react";
import {setLoader} from "../../redux/actions/commonAction";
import {connect} from "react-redux";
import axios from "../../lib/axios";
import {showErrorMessageFromAxios} from "../../lib/common";

const CreateUserPage = ({setLoader}) => {
    const [validated, setValidated] = useState(false)
    const [form_data, setFormData] = useState({
        username: "",
        password: "",
        is_superuser: false,
        is_staff: false,
        mobile: ""
    })


    const createUser = (e) => {
        e.preventDefault();
        setValidated(false)
        const form = e.target
        if (form.checkValidity()) {
            setLoader(true)
            axios.post("/users/", form_data).then(res => {
                alert("User Created Successfully")
                window.location.reload()
            }).catch(err => {
                setLoader(false)
                alert(showErrorMessageFromAxios(err, "Some error Occurred..."))
            })
        } else {
            setValidated(true)
        }
    }
    return (
        <>
            <Form noValidate validated={validated} onSubmit={createUser}>
                <Form.Row>
                    <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" placeholder="Enter Username" required value={form_data.username}
                                      onChange={e => {
                                          setFormData({
                                              ...form_data,
                                              username: e.target.value
                                          })
                                      }}/>
                        <Form.Control.Feedback type={"invalid"}>Required Field</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label>Mobile</Form.Label>
                        <Form.Control type="text" placeholder="Enter Mobile" required value={form_data.mobile}
                                      onChange={e => {
                                          setFormData({
                                              ...form_data,
                                              mobile: e.target.value
                                          })
                                      }}/>
                        <Form.Control.Feedback type={"invalid"}>Required Field</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" required value={form_data.password}
                                      onChange={e => {
                                          setFormData({
                                              ...form_data,
                                              password: e.target.value
                                          })
                                      }}/>
                        <Form.Control.Feedback type={"invalid"}>Required Field</Form.Control.Feedback>
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group id="formGridCheckbox" as={Col}>
                        <Form.Check type="checkbox" label="Is Superuser" checked={form_data.is_superuser}
                                    onChange={e => {
                                        setFormData({
                                            ...form_data,
                                            is_superuser: !form_data.is_superuser
                                        })
                                    }}/>
                    </Form.Group>
                    <Form.Group id="formGridCheckbox" as={Col}>
                        <Form.Check type="checkbox" label="Is Staff" hecked={form_data.is_staff}
                                    onChange={e => {
                                        setFormData({
                                            ...form_data,
                                            is_staff: !form_data.is_staff
                                        })
                                    }}/>
                    </Form.Group>
                </Form.Row>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </>
    )
}
const mapStateToProps = state => {
    return {}
}

const mapDispatchToProps = dispatch => {
    return {
        setLoader: (state) => dispatch(setLoader(state))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PageHOC(CreateUserPage, {
    heading: "Create User",
    navigation: "User| Create"
}))

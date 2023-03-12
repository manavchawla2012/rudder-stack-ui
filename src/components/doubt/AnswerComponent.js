import {Button, Col, Form} from "react-bootstrap";
import React, {useState} from "react";
import {setLoader} from "../../redux/actions/commonAction";
import {connect} from "react-redux";
import axios from "../../lib/axios";
import {showErrorMessageFromAxios} from "../../lib/common";

const AnswerComponent = ({doubt_data, setLoader, user_details}) => {
    const [answer, setAnswer] = useState("")
    const [validate, setValidate] = useState(false)

    const submitAnswer = async (e) => {
        e.preventDefault();
        const form = e.target
        setValidate(false)
        if (form.checkValidity()) {
            setLoader(true)
            axios.post("/doubt/qna", {
                text: answer,
                doubt: doubt_data.id,
                is_answer: true
            }).then(res => {
                window.location.reload();
            }).catch(err => {
                setLoader(false)
                alert(showErrorMessageFromAxios(err, "Some Error Occurred..."))
            })

        } else {
            setValidate(true)
        }
    }

    const escalateDoubt = async (e) => {
        const confirm_escalate = confirm("Are You Sure you want to escalate?")
        if(confirm_escalate){
            setLoader(true)
            axios.patch(`/doubt/${doubt_data.id}`, {
                state: 3
            }).then(res=>{
                window.location.reload();
            }).catch(err=>{
                setLoader(false)
                alert(showErrorMessageFromAxios(err, "Some Error Occurred..."))
            })
        }
    }

    return (
        doubt_data.state === 2 && user_details.id === doubt_data.ta  ?
            <>
                <div className={"data-component"}>
                    <Form noValidate className={"col-12"} validated={validate} onSubmit={submitAnswer}>
                        <Form.Row>
                            <Form.Group controlId="title" as={Col} className={"col-12"} style={{marginTop: "38px"}}>
                                <Form.Label>Answer</Form.Label>
                                <Form.Control type="text" placeholder="Answer" required value={answer}
                                              onChange={e => setAnswer(e.target.value)}/>
                                <Form.Control.Feedback type={"invalid"}>This Field is Required</Form.Control.Feedback>
                            </Form.Group>
                            <div className={"col-12"}>
                                <div className={"col-4 float-right"}>
                                    <Button className={"cn-button"} type={"submit"}>
                                        Answer
                                    </Button>
                                </div>
                            </div>
                        </Form.Row>
                    </Form>
                </div>
                <Button className={"cn-button type-2 col-4"} style={{float: "right"}} onClick={escalateDoubt}>Escalate</Button>
            </> : ""
    )
}
const mapStateToProps = state => {
    return {
        user_details: state.auth.user_details
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setLoader: (state) => dispatch(setLoader(state))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AnswerComponent)

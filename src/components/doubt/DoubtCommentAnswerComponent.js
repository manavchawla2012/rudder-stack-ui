import React, {useEffect, useState} from "react";
import {getUserDetails} from "../../lib/functions/user";
import {getQnA} from "../../lib/functions/doubt";
import axios from "../../lib/axios";
import {convertDate, showErrorMessageFromAxios} from "../../lib/common";
import {Button, Col, Form} from "react-bootstrap";
import {setLoader} from "../../redux/actions/commonAction";
import {connect} from "react-redux";

const DoubtCommentAnswerComponent = ({doubt_data, setLoader, hide_commenting}) => {
    const [doubt_user_details, setDoubtUserDetails] = useState({})
    const [questions, setQuestions] = useState([])
    const [answers, setAnswers] = useState([])
    const [comment, setComment] = useState("")
    const [validate, setValidate] = useState(false)

    useEffect(() => {
        getUserDetails(doubt_data.user).then(res => {
            setDoubtUserDetails(res)
        })
        getQnA(doubt_data.id).then(res => {
            const new_answers = []
            const new_questions = []
            for (const qna of res) {
                if (qna.is_answer) {
                    new_answers.push(qna)
                } else {
                    new_questions.push(qna)
                }
            }
            setQuestions(new_questions)
            setAnswers(new_answers)
        })
    }, [])

    const addComment = (e) => {
        e.preventDefault()
        const form = e.target;
        setValidate(false)
        if (form.checkValidity()) {
            setLoader(true)
            axios.post("/doubt/qna", {
                text: comment,
                doubt: doubt_data.id,
                is_answer: false
            }).then(res => {
                setQuestions([res.data, ...questions])
                setLoader(false)
                setComment("")
            }).catch(err => {
                setLoader(false)
                alert(showErrorMessageFromAxios(err, "Some error in submitting comment.."))
            })
        } else {
            setValidate(true)
        }
    }


    return (
        <div className={"qna data-component"}>
            <div className={"col-12"} style={{position: "relative"}}>
                {doubt_data.state === 4 ?
                    <div style={{position: "absolute", top: 0, right: 20}}>
                        <div
                            style={{backgroundColor: "#559143", height: "40px", lineHeight: "40px", padding: "0 20px"}}>
                            Resolved
                        </div>
                    </div> : ""}
                <div className={"title"}>{doubt_data.title}</div>
                <div>{doubt_data.question}</div>
                <div className={"owner-details"}>Asked
                    By: {doubt_user_details.username} on {convertDate(doubt_data.created_on)}</div>
                <div className={"clearfix"}/>

                {answers.map((answer, i) => {
                    return (
                        <div key={i}>
                            <b>Answer: </b> {answer.text}
                            <div>Answered By: {answer.username} on {convertDate(answer.created_on)}</div>
                        </div>
                    )
                })}
            </div>
            <hr/>
            <div className={"col-12"} style={{position: "relative"}}>
                <div>{questions.length} Comments</div>
                <div style={{height: "250px", overflowY: "auto"}}>
                    {questions.map((question, i) => {
                        return (
                            <div key={i} style={{
                                minHeight: "40px",
                                backgroundColor: "#F8F8F8",
                                marginBottom: "20px",
                                lineHeight: "40px",
                                paddingLeft: "10px"
                            }}>{question.username}: {question.text} <span
                                style={{
                                    float: "right",
                                    paddingRight: "20px",
                                    color: "#7e7e7e"
                                }}>{convertDate(question.created_on)}</span>
                            </div>
                        )
                    })}
                </div>
                {!hide_commenting ?
                    <Form noValidate className={"col-12"}
                          validated={validate} onSubmit={addComment}>
                        <Form.Row>
                            <Form.Group controlId="title" as={Col} className={"col-10"} style={{marginTop: "38px"}}>
                                <Form.Control type="text" placeholder="Add Comment" required value={comment}
                                              onChange={e => setComment(e.target.value)}/>
                                <Form.Control.Feedback type={"invalid"}>This Field is Required</Form.Control.Feedback>
                            </Form.Group>
                            <div className={"col-2"}>
                                <Button className={"cn-button"} type={"submit"}>
                                    Comment
                                </Button>
                            </div>
                        </Form.Row>
                    </Form> : ""}
            </div>
        </div>
    )
}
const mapStateToProps = state => {
    return {}
}

const mapDispatchToProps = dispatch => {
    return {
        setLoader: (state) => dispatch(setLoader(state)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DoubtCommentAnswerComponent)

import React, {useState} from "react";
import {Button, Col, Container, Form} from "react-bootstrap";
import axios from "../../lib/axios";
import {connect} from "react-redux";
import {setLoader} from "../../redux/actions/commonAction";
import {addDoubtAction} from "../../redux/actions/doubtsAction";

const CreateDoubtComponent = ({setLoader, createDoubtAction}) => {

    const [description, setDescription] = useState("")
    const [title, setTitle] = useState("")
    const [form_validate, setFormValidate] = useState(false)
    const [disabled, setDisabled] = useState(false)
    const [doubt_details, setDoubtDetails] = useState(null)

    const createDoubt = async (e) => {
        e.preventDefault()
        setFormValidate(false)
        const is_form_valid = e.target.checkValidity();
        if (!is_form_valid) {
            setFormValidate(true)
        } else {
            setLoader(true)
            const doubt_action = await createDoubtAction({
                question: description,
                title: title
            }, setDisabled)
            setDoubtDetails(doubt_action.doubt)
        }
    }

    return (
        <>
            <div className={"create-doubt data-component"}>
                <Form noValidate validated={form_validate} onSubmit={createDoubt}>
                    <Container>
                        <Form.Row>
                            <Form.Group controlId="title" as={Col} className={"col-12"} md={12}>
                                <Form.Label>Title</Form.Label>
                                <Form.Control disabled={disabled} type="text" placeholder="Title" required value={title}
                                              onChange={e => setTitle(e.target.value)}/>
                                <Form.Control.Feedback type={"invalid"}>This Field is Required</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group controlId="description" as={Col} className={"col-12"} md={12}>
                                <Form.Label>Description</Form.Label>
                                <Form.Control disabled={disabled} type="text" placeholder="Description" required
                                              value={description}
                                              onChange={e => setDescription(e.target.value)}/>
                                <Form.Control.Feedback type={"invalid"}>This Field is Required</Form.Control.Feedback>
                            </Form.Group>
                        </Form.Row>
                        {doubt_details ?
                            <Button className={"cn-button col-3"} style={{float: "left"}} href={`/doubt/${doubt_details.id}`}
                                    target={"_blank"}>
                                Go To Doubt
                            </Button> : ""}
                        <Button className={"cn-button col-3"} style={{float: "right"}} type={"submit"} disabled={disabled}>
                            Ask Doubt
                        </Button>
                    </Container>
                </Form>
            </div>
        </>
    )
}
const mapStateToProps = state => {
    return {}
}

const mapDispatchToProps = dispatch => {
    return {
        setLoader: (state) => dispatch(setLoader(state)),
        createDoubtAction: (data, setDisabled) => dispatch(addDoubtAction(data, setDisabled))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateDoubtComponent)

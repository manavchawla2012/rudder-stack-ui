import {useEffect, useState} from "react";
import {Alert, Button, Col, Container, Form} from "react-bootstrap";
import {MdAutoDelete, MdPostAdd} from 'react-icons/md';
import {setLoader} from "../../redux/actions/commonAction";
import {connect} from "react-redux";
import {addTrackingPlan} from "../../redux/actions/trackingPlanAction";
import {clientRedirect} from "../../lib/redirect";

const eventConfigDefaultData = {
    name: '',
    description: '',
    rules: '{}',
}
const AddTrackingPlan = ({viewForm = false, defaultData = undefined, setLoader, createTrackingPlan}) => {
    const [formData, setFormData] = useState({name: '', description: '', event_configurations: []})
    const [disabled, setDisabled] = useState(false)
    const [form_validate, setFormValidate] = useState(false)
    const [error, setError] = useState('')

    useEffect(() => {
        setDisabled(viewForm)
    }, [viewForm])

    useEffect(() => {
        if (defaultData) {
            setFormData(defaultData)
        }
    }, [defaultData])
    const submitForm = (e) => {
        e.preventDefault();
        setError('');
        setFormValidate(false)
        const isFormValid = e.target.checkValidity();
        if (!isFormValid) {
            setFormValidate(true)
        } else {
            //  setLoader(true)
            createTrackingPlan(formData, setDisabled).then(_ => {
                clientRedirect(`/tracking-plan`)
            }).catch((err) => {
                setLoader(false)
                setError(err.data.error.message)
            })
        }
    }

    const updateFormData = (value, key) => {
        const newFormData = {...formData}
        newFormData[key] = value
        setFormData(newFormData)
    }

    const updateEventConfigData = (value, key, index) => {
        const eventConfigData = [...formData.event_configurations]
        const indexData = {...eventConfigData[index]}
        indexData[key] = value
        eventConfigData[index] = indexData
        setFormData({
            ...formData,
            event_configurations: eventConfigData
        })
    }

    const addEventConfig = () => {
        const eventConfigData = [...formData.event_configurations]
        eventConfigData.push(eventConfigDefaultData)
        setFormData({
            ...formData,
            event_configurations: eventConfigData
        })
    }

    const removeEventConfig = (index) => {
        const eventConfigData = [...formData.event_configurations]
        eventConfigData.splice(index, 1)
        setFormData({
            ...formData,
            event_configurations: eventConfigData
        })
    }

    return (
        <Container style={{marginTop: '20px'}}>
            <Form noValidate validated={form_validate} onSubmit={submitForm}
                  style={{width: '80%', border: '1px solid #d7d7d7', padding: '20px', position: 'relative'}}>
                <div>
                    <Form.Label><b>{!viewForm ?  'Add Tracking Plan' : 'View Tracking Plan'}:</b></Form.Label>
                    <Form.Row style={{borderBottom: '1px solid rgba(0, 0, 0, .1)'}}>
                        <Form.Group controlId="title" as={Col} className={"col-12"} md={12}>
                            <Form.Label>Name:</Form.Label>
                            <Form.Control disabled={disabled} type="text" placeholder="Name" required
                                          value={formData.name ?? ''}
                                          onChange={e => updateFormData(e.target.value, 'name')}/>
                            <Form.Control.Feedback type={"invalid"}>This Field is Required</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="description" as={Col} className={"col-12"} md={12}>
                            <Form.Label>Description:</Form.Label>
                            <Form.Control disabled={disabled} type="text" placeholder="Description" required
                                          value={formData.description}
                                          onChange={e => updateFormData(e.target.value, 'description')}/>
                            <Form.Control.Feedback type={"invalid"}>This Field is Required</Form.Control.Feedback>
                        </Form.Group>
                    </Form.Row>
                    <Form.Label><b>Events:</b></Form.Label>
                    <div style={{padding: '20px'}}>
                        {formData.event_configurations.map((config, i) => {
                            return (
                                <Form.Row key={i} style={{
                                    position: 'relative',
                                    borderBottom: '1px solid #b3b3b3',
                                    padding: '10px'
                                }}>
                                    <Form.Group controlId="title" as={Col} className={"col-12"} md={12}>
                                        <Form.Label>Name:</Form.Label>
                                        <Form.Control disabled={disabled} type="text" placeholder="Name" required
                                                      value={config.name ?? ''}
                                                      onChange={e => updateEventConfigData(e.target.value, 'name', i)}/>
                                        <Form.Control.Feedback type={"invalid"}>This Field is
                                            Required</Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group controlId="description" as={Col} className={"col-12"} md={12}>
                                        <Form.Label>Description:</Form.Label>
                                        <Form.Control disabled={disabled} type="text" placeholder="Description" required
                                                      value={config.description}
                                                      onChange={e => updateEventConfigData(e.target.value, 'description', i)}/>
                                        <Form.Control.Feedback type={"invalid"}>This Field is
                                            Required</Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group controlId="description" as={Col} className={"col-12"} md={12}>
                                        <Form.Label>Rules:</Form.Label>
                                        <Form.Control disabled={disabled} as="textarea" placeholder='{JSON SCHEMA}'
                                                      rows={10}
                                                      required
                                                      value={function () {
                                                          if (typeof config.rules === "object") {
                                                              return JSON.stringify(config.rules)
                                                          } else {
                                                              return config.rules
                                                          }
                                                      }()
                                                      }
                                                      onChange={e => updateEventConfigData(function () {
                                                          try {
                                                              return JSON.parse(e.target.value)
                                                          } catch {
                                                              return e.target.value
                                                          }
                                                      }(), 'rules', i)}/>
                                        <Form.Control.Feedback type={"invalid"}>This Field is
                                            Required</Form.Control.Feedback>
                                    </Form.Group>
                                    {!viewForm ?
                                        <MdAutoDelete
                                            style={{position: 'absolute', right: 0, bottom: 0, cursor: 'pointer'}}
                                            color={'red'}
                                            onClick={() => removeEventConfig(i)}/> : ''}
                                </Form.Row>
                            )
                        })}
                        {error ?
                            <Alert variant={"danger"}>
                                {error}
                            </Alert> : ''}
                    </div>
                    {!viewForm ?
                        <Button variant={'outline-secondary'} onClick={addEventConfig}
                                style={{border: 'none'}}>
                            <MdPostAdd color={'#7979fd'} size={'30px'}/>
                        </Button> : ''}
                </div>
                {!viewForm ?
                    <Button className={"cn-button col-3"} style={{float: "right"}} type={"submit"} disabled={disabled}>
                        Create Plan
                    </Button> : ''}
            </Form>
        </Container>
    )
}

const mapStateToProps = (_) => {
    return {}
}

const mapDispatchToProps = dispatch => {
    return {
        setLoader: (state) => dispatch(setLoader(state)),
        createTrackingPlan: (data, setDisabled) => dispatch(addTrackingPlan(data, setDisabled))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddTrackingPlan)

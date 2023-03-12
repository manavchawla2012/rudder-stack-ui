import React, {useEffect} from "react";
import {setLoader} from "../../redux/actions/commonAction";
import {getAllDoubtsAction} from "../../redux/actions/doubtsAction";
import {connect} from "react-redux";
import {Button, Row} from "react-bootstrap";
import axios from "../../lib/axios";
import {showErrorMessageFromAxios} from "../../lib/common";
import {clientRedirect} from "../../lib/redirect";

const GetAllDoubtsComponent = ({doubts = [], getAllDoubtsAction, user_details, setLoader}) => {
    useEffect(() => {
        getAllDoubtsAction()
    }, [])


    const acceptDoubt = (doubt) => {
        setLoader(true)
        axios.patch(`/doubt/${doubt.id}`, {
            state: 2
        }).then(res => {
            clientRedirect(`/doubt/solve/${doubt.id}`)
        }).catch(err => {
            alert(showErrorMessageFromAxios(err, "Some Error in Accepting Please Refresh the page."))
            setLoader(false)
        })
    }

    const getStaffActionButton = (doubt) => {
        const is_user_question = doubt.ta === user_details.id
        const can_accept = doubt.state === 1
        let button = (
            <Button href={`/doubt/${doubt.id}`} target={"_blank"} className={"cn-button"}>Go To Doubt</Button>)
        if (can_accept) {
            button = <Button onClick={e => acceptDoubt(doubt)} style={{margin: 0}}
                             className={"cn-button"}>Accept</Button>
        } else {
            if (doubt.state === 2 && is_user_question) {
                button = <Button href={`/doubt/solve/${doubt.id}`} target={"_blank"}
                                 className={"cn-button"}>Answer</Button>
            }
        }
        return button
    }
    return (
        <div style={{marginTop: "20px"}}>
            <div style={{fontSize: "40px", fontWeight: "600"}}>Doubts</div>
            {
                doubts.map((doubt, i) => {
                    return (
                        <div className={"col-5 data-component data-component"} key={i} style={{
                            minHeight: "60px",
                            marginBottom: "10px",
                        }}>
                            <Row>
                                <div className={"col-8"}>
                                    <div style={{marginTop: "5px"}}><b>Title: </b>{doubt.title}</div>
                                    <div style={{
                                        width: "200ch",
                                        overflow: "hidden",
                                        whiteSpace: "nowrap"
                                    }}><b>Description:</b> {doubt.question}
                                    </div>
                                </div>
                                <div className={"col-4"} style={{marginTop: "10px"}}>
                                    {user_details.is_superuser || user_details.is_staff ?
                                        getStaffActionButton(doubt) :
                                        <Button href={`/doubt/${doubt.id}`} target={"_blank"} className={"cn-button"}>Go
                                            To
                                            Doubt</Button>}
                                </div>
                            </Row>
                        </div>
                    )
                })
            }
        </div>
    )
}
const mapStateToProps = state => {
    return {
        doubts: state.doubt.doubts,
        user_details: state.auth.user_details
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setLoader: (state) => dispatch(setLoader(state)),
        getAllDoubtsAction: () => dispatch(getAllDoubtsAction())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GetAllDoubtsComponent)

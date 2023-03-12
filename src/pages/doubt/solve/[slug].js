import React from "react";
import {AnswerComponent, DoubtCommentAnswerComponent} from "../../../components/doubt";
import {checkAuthenticationServerSide} from "../../../lib/login";
import axiosInstance from "../../../lib/axios-server";
import {Container, Row} from "react-bootstrap";
import PageHOC from "../../../hoc/PageHOC";

const SolveDoubtPage = ({doubt_data}) => {
    return (
            <Row>
                <div className={"col-7"}>
                    <DoubtCommentAnswerComponent doubt_data={doubt_data} hide_commenting/>
                </div>
                <div className={"col-5"} style={{marginTop: "20px"}}>
                    <AnswerComponent doubt_data={doubt_data}/>
                </div>
            </Row>
    )
}

export default PageHOC(SolveDoubtPage, {
    heading: "Solve Doubts",
    navigation: "Raise Doubt | Solve Doubts"
})


export async function getServerSideProps(context) {
    await checkAuthenticationServerSide(context)
    const query_params = context.query
    const doubt_data = await axiosInstance(context).get(`/doubt/${query_params.slug}`).then(res => {
        return res.data
    }).catch(err => {
        return null
    })
    if (doubt_data && doubt_data.id) {
        return {
            props: {
                doubt_data: doubt_data
            }
        }
    }
    return {props: {}, notFound: true}
}


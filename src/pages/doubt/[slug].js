import {checkAuthenticationServerSide} from "../../lib/login";
import axiosInstance from "../../lib/axios-server";
import PageHOC from "../../hoc/PageHOC";
import React from "react";
import {DoubtCommentAnswerComponent} from "../../components/doubt";

const DoubtChatPage = ({doubt_data}) => {
    return (
        <DoubtCommentAnswerComponent doubt_data={doubt_data}/>
    )
}

export default PageHOC(DoubtChatPage, {
    heading: "QnA",
    navigation: "Doubt | QnA"
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

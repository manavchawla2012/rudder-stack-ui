import {checkAuthenticationServerSide} from "../lib/login";
import PageHOC from "../hoc/PageHOC";

const IndexPage = (props) => {
    return(
        <>
        </>
    )
}

export async function getServerSideProps(context) {
    await checkAuthenticationServerSide(context)
    return {props: {}}
}

export default PageHOC(IndexPage, {heading: "Create Tracking Plan", navigation: "Create Tracking Plan"})

import {checkAuthenticationServerSide} from "../lib/login";
import PageHOC from "../hoc/PageHOC";
import {CreateDoubtComponent, GetAllDoubtsComponent} from "../components/doubt"


const IndexPage = (props) => {
    return(
        <>
            {!(props.user_details.is_superuser || props.user_details.is_staff) ?
            <CreateDoubtComponent/>: ""}
            <GetAllDoubtsComponent/>
        </>
    )
}

export async function getServerSideProps(context) {
    await checkAuthenticationServerSide(context)
    return {props: {}}
}

export default PageHOC(IndexPage, {heading: "Raise Doubt", navigation: "Raise Doubt"})

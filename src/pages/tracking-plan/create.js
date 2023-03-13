import AddTrackingPlan from "../../components/tracking_plan/addTrackingPlan";
import PageHOC from "../../hoc/PageHOC";
import {checkAuthenticationServerSide} from "../../lib/login";

const Create = () => {
    return (
        <AddTrackingPlan/>
    )
}

export async function getServerSideProps(context) {
    await checkAuthenticationServerSide(context)
    return {props: {}}
}

export default PageHOC(Create)

import PageHOC from "../../hoc/PageHOC";
import {Button, Table} from "react-bootstrap";
import {checkAuthenticationServerSide} from "../../lib/login";
import {setLoader} from "../../redux/actions/commonAction";
import {getAllTrackingPlans} from "../../redux/actions/trackingPlanAction";
import {useEffect} from "react";
import {connect} from "react-redux";

const TrackingPlan = ({trackingPlans, getAllTrackingPlans}) => {
    useEffect(() => {
        getAllTrackingPlans()
    }, [])
    return (
        <div>
            <Table striped bordered hover style={{marginTop: '10px'}}>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Description</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {trackingPlans.data && trackingPlans.data.map((plan) => {
                    return (
                        <tr key={plan.id}>
                            <td>{plan.name}</td>
                            <td>{plan.description}</td>
                            <td><a href={`/tracking-plan/${plan.id}`}>View</a></td>
                        </tr>
                    )
                })}

                </tbody>
            </Table>
            <Button style={{position: 'fixed', bottom: 10, right: 10}} href={'/tracking-plan/create'}>Create</Button>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        trackingPlans: state.trackingPlan.trackingPlans,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setLoader: (state) => dispatch(setLoader(state)),
        getAllTrackingPlans: () => dispatch(getAllTrackingPlans())
    }
}

export async function getServerSideProps(context) {
    await checkAuthenticationServerSide(context)
    return {props: {}}
}

export default PageHOC(connect(mapStateToProps, mapDispatchToProps)(TrackingPlan), {heading: 'Tracking Plans'})

import PageHOC from "../../hoc/PageHOC";
import {useRouter} from 'next/router'
import axios from "../../lib/axios";
import {useEffect, useState} from "react";
import {setLoader} from "../../redux/actions/commonAction";
import {connect} from "react-redux";
import AddTrackingPlan from "../../components/tracking_plan/addTrackingPlan";

const Read = ({setLoader}) => {
    const [data, setData] = useState(undefined);
    const router = useRouter()
    const {slug} = router.query
    const fetchDetails = async (id) => {
        await axios.get(`/tracking-console/tracking-plan/${id}`).then(res => {
            setData(res.data.data)
        })
    }

    useEffect(() => {
        if (slug) {
            setLoader(true)
            void fetchDetails(slug)
            setLoader(false)
        }
    }, [slug])
    return (
        <div>
            {data ?
            <AddTrackingPlan viewForm={true} defaultData={data}/> : ''}
        </div>
    )
}

const mapStateToProps = () => {
    return {}
}

const mapDispatchToProps = dispatch => {
    return {
        setLoader: (state) => dispatch(setLoader(state)),
    }
}

export default PageHOC(connect(mapStateToProps, mapDispatchToProps)(Read))

import PageHOC from "../hoc/PageHOC";
import {useEffect, useState} from "react";
import axios from "../lib/axios";
import {showErrorMessageFromAxios} from "../lib/common";
import {Container, Row} from "react-bootstrap";

const DashboardInfoComponent = ({heading, data}) => {
    return (
        <div className={"data-component text-center"} style={{height: "280px", position: "relative"}}>
            <div style={{marginTop: "100px", fontWeight: "600", fontSize: "30px"}}>{data}</div>
            <div style={{position: "absolute", bottom: "10px", left: 0, right: 0}}>{heading}</div>
        </div>
    )
}

const DashboardPage = () => {
    const [dashboard_data, setDashboardData] = useState({
        doubts_solved: 0,
        doubts_asked: 0,
        doubts_escalated: 0,
        avg_doubt_resolution_time: 0,
        ta_report: []
    })
    useEffect(() => {
        axios.get("/doubt/dashboard").then(res => {
            setDashboardData(res.data)
        }).catch(err => {
            alert(showErrorMessageFromAxios(err, "Some Error Occourec"))
        })
    }, [])
    return (
        <Row style={{marginTop: "20px"}}>
            <div className={"col-3"}>
                <DashboardInfoComponent heading={"Doubts Asked"} data={dashboard_data.doubts_asked}/>
            </div>
            <div className={"col-3"}>
                <DashboardInfoComponent heading={"Doubts Resolved"} data={dashboard_data.doubts_solved}/>
            </div>
            <div className={"col-3"}>
                <DashboardInfoComponent heading={"Doubts Escalated"} data={dashboard_data.doubts_escalated}/>
            </div>
            <div className={"col-3"}>
                <DashboardInfoComponent heading={"Avg Doubt Resolution Time"}
                                        data={`${dashboard_data.avg_doubt_resolution_time} min`}/>
            </div>
            <div className={"col-12 mt-5"}>
                <div className={"data-component"} style={{padding: "0 20px"}}>
                    <div style={{marginTop: "20px"}}>TA's Report</div>
                    <div style={{
                        border: "1px solid #000000",
                        backgroundColor: "#FFFFFF",
                        minHeight: "150px",
                        margin: "20px 0"
                    }}>
                        {dashboard_data.ta_report.map((ta, i) => {
                            return (
                                <div key={ta.id}
                                     style={{padding: "30px 20px", height: "150px", borderBottom: "1px solid #000000"}}>
                                    <div><i><b>{ta.username}</b></i></div>
                                    <div style={{marginTop: "20px"}}><b>Doubts Accepted: </b>{ta.doubts_accepted} | <b>Doubts
                                        Resolved:</b> {ta.doubts_solved} | <b>Doubts
                                        Escalated: </b> {ta.doubts_escalated} | <b>Avg Doubt Activity
                                        Time:</b>{ta.avg_time_taken} min
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </Row>
    )
}

export default PageHOC(DashboardPage, {
    heading: "Dashboard",
    navigation: "Dashboard"
})

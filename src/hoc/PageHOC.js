import {Component} from "react";
import {getUserDetailsAction} from "../redux/actions/authAction";
import {connect} from "react-redux";
import {WebsiteNavbarComponent} from "../components/common"
import {setLoader} from "../redux/actions/commonAction";
import LoaderComponent from "../components/common/LoaderComponent";

const PageHOC = (WrappedComponent, extra={}) => {
    class BasePage extends Component {
        constructor(props) {
            super(props);
        }

        componentDidMount() {
            this.props.userDetails()
        }

        render() {
            return (
                <>
                    <WebsiteNavbarComponent navigation={extra.navigation}/>
                    <LoaderComponent/>
                    <div className={"col-12"} style={{padding: "0 50px"}}>
                        {extra.heading ?
                            <div className={"hoc-heading"}>{extra.heading}</div> : ""}
                        <WrappedComponent {...this.props}/>
                    </div>
                </>
            )
        }

    }

    const mapStateToProps = state => {
        return {
            user_details: state.auth.user_details
        }
    }

    const mapDispatchToProps = dispatch => {
        return {
            userDetails: () => dispatch(getUserDetailsAction()),
            setLoader: (state) => dispatch(setLoader(state))
        }
    }

    return connect(mapStateToProps, mapDispatchToProps)(BasePage)
}


export default PageHOC

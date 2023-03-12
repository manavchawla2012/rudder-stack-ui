import React from "react";
import {Modal, Spinner} from "react-bootstrap";
import {connect} from "react-redux";


const LoaderComponent = ({loader_state}) => {
    return (
        <Modal show={loader_state} centered dialogClassName={"modal-custom-dialog payment-loader"}
               backdrop={"static"}>
            <Spinner animation="border" role="status" style={{color: "#000000", margin: "auto"}}>
                <span className="sr-only">Loading...</span>
            </Spinner>
        </Modal>
    )
}
const mapStateToProps = state => {
    return {
        loader_state: state.common.loader
    }
}

const mapDispatchToProps = dispatch => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoaderComponent)

import {Button, Nav, Navbar} from "react-bootstrap";
import {logoutAction} from "../../redux/actions/authAction";
import {connect} from "react-redux";
import { useRouter } from 'next/router'

const WebsiteNavBarComponent = ({logout, navigation, user_details}) => {
    const router = useRouter()
    return (
        <>
            <Navbar bg="light" variant="light">
                <Navbar.Brand href="/">
                    <img
                        alt=""
                        src={"http://localhost:3000/logo.svg"}
                        width="80px"
                        height="60px"
                        className="d-inline-block align-top"
                    />
                </Navbar.Brand>
                <Nav className="mr-auto" activeKey={router.pathname}>
                    <Nav.Link active disabled>Home | {navigation}</Nav.Link>
                    {user_details.is_superuser || user_details.is_staff ?
                        <>
                            <Nav.Link href="/dashboard">Dashboard</Nav.Link>
                            <Nav.Link href="/user/create">Create User</Nav.Link>
                        </> : ""}
                </Nav>
                <Nav>
                    <Nav.Link eventKey={2}>
                        <Button onClick={logout} style={{margin: 0}}>Logout</Button>
                    </Nav.Link>
                </Nav>
            </Navbar>
        </>
    )
}
const mapStateToProps = state => {
    return {
        user_details: state.auth.user_details
    }
}

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(logoutAction())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WebsiteNavBarComponent)

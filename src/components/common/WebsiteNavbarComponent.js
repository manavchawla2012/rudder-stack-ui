import {Button, Nav, Navbar} from "react-bootstrap";
import {logoutAction} from "../../redux/actions/authAction";
import {connect} from "react-redux";
import { useRouter } from 'next/router'

const WebsiteNavBarComponent = ({logout, navigation}) => {
    const router = useRouter()
    const navs = [
        {
          name: 'Home',
          url: '/'
        },
        {
            name: 'View Plans',
            url: '/plans'
        },
    ]
    return (
        <>
            <Navbar bg="light" variant="light">
                <Navbar.Brand href="/">
                    <img
                        alt=""
                        src={"http://localhost:3000/logo.png"}
                        width="80px"
                        height="60px"
                        className="d-inline-block align-top"
                    />
                </Navbar.Brand>
                <Nav className="mr-auto" activeKey={router.pathname}>
                    {navs.map((nav, i) => {
                        return (
                            <Nav.Link href={nav.url} key={i}>{nav.name}</Nav.Link>
                        )
                    })}
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

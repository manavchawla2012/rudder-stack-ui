import { Fragment } from "react";
import Link from "next/link";
import { Container, Row, Col } from "react-bootstrap";
import PageHOC from "../hoc/PageHOC"

const NotFound = () => {
    return (
        <Fragment>
            <div
                className="nothing-found-area bg-404"
            >
                <Container>
                    <Row>
                        <Col lg={6}>
                            <div className="nothing-found-content">
                                <h1>Oops!</h1>
                                <h1 className="space-mb--50">Page not found!</h1>
                                <p className="direction-page">
                                    PLEASE GO BACK TO{" "}
                                    <Link href="/" as={"/"}>
                                        <a>homepage</a>
                                    </Link>
                                </p>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </Fragment>
    );
};

export default PageHOC(NotFound);

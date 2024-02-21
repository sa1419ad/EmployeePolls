import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <Row>
        <Col>
          <h1>404: Page Not Found</h1>
          <p>Sorry, the page you were looking for could not be found.</p>
          <div className="d-flex justify-content-center">
            <Button as={Link} to="/">
              Return to Main Page
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default NotFound;

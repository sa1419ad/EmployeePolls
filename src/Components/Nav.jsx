import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button, Image } from "react-bootstrap";
import { handleLogOut } from "../Actions/AuthedUser";

const Navigation = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.Users[state.authedUser]);

  const location = useLocation();

  function logout() {
    dispatch(handleLogOut());
  }

  return (
    <Navbar bg="light" expand="lg" className="p-4">
      <Container>
        <Navbar.Brand as={Link} to="/">
          Employee Polls
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav variant="underline" className="me-auto">
            <Nav.Item>
              <Nav.Link as={Link} to="/">
                Home
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={Link} to="/leaderboard">
                Leaderboard
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={Link} to="/addNewQuestion">
                New Question
              </Nav.Link>
            </Nav.Item>
          </Nav>
          <Navbar.Text className="d-flex align-items-center">
            <Image
              src={user.avatarURL}
              roundedCircle
              width="50px"
              height="50px"
              className="me-2"
            />
            Signed in as: {user.name}
            <Button variant="outline-danger" className="ms-2" onClick={logout}>
              Logout
            </Button>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;

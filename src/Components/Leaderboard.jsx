import { connect } from "react-redux";
import Table from "react-bootstrap/Table";
import { Card, Button } from "react-bootstrap";

const Leaderboard = ({ users }) => {
  return (
    <Card>
      <Card.Header as="h5">Leaderboard</Card.Header>
      <Card.Body>
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>#</th>
              <th>Users</th>
              <th>Answered</th>
              <th>Created</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user.id}>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.answered}</td>
                <td>{user.created}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};

const mapStateToProps = ({ Users }) => {
  const users = Object.values(Users).map((user) => ({
    id: user.id,
    name: user.name,
    answered: Object.keys(user.answers).length,
    created: user.questions.length,
  }));
  const sortedUsers = users.sort(
    (a, b) => b.answered + b.created - a.answered - a.created
  );

  return {
    users: sortedUsers,
  };
};

export default connect(mapStateToProps)(Leaderboard);

import { connect } from "react-redux";
import Question from "./Question";
import Container from "react-bootstrap/Container";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import { Col, Row } from "react-bootstrap";

const Dashboard = ({ NewQuestions, DoneQuestions }) => {
  return (
    <Tabs defaultActiveKey="New Qusetion" className="mb-3">
      <Tab eventKey="New Qusetion" title="New Qusetion">
        <Container>
          <Row className="g-3">
            {NewQuestions.map((question) => (
              <Col xs={12} md={4} key={question.id}>
                <Question question={question} />
              </Col>
            ))}
          </Row>
        </Container>
      </Tab>

      <Tab eventKey="Done" title="Done">
        <Container>
          <Row className="g-4">
            {DoneQuestions.map((question) => (
              <Col xs={12} md={4} key={question.id}>
                <Question question={question} />
              </Col>
            ))}
          </Row>
        </Container>
      </Tab>
    </Tabs>
  );
};

const mapStateToProps = ({ Questions, authedUser }) => {
  const questionId = Object.keys(Questions).sort(
    (a, b) => Questions[b].timestamp - Questions[a].timestamp
  );

  const NewQuestions = questionId
    .filter(
      (id) =>
        !Questions[id].optionOne.votes.includes(authedUser) &&
        !Questions[id].optionTwo.votes.includes(authedUser)
    )
    .map((id) => Questions[id]);

  const DoneQuestions = questionId
    .filter(
      (id) =>
        Questions[id].optionOne.votes.includes(authedUser) ||
        Questions[id].optionTwo.votes.includes(authedUser)
    )
    .map((id) => Questions[id]);

  return {
    NewQuestions,
    DoneQuestions,
  };
};

export default connect(mapStateToProps)(Dashboard);

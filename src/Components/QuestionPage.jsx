import { connect } from "react-redux";
import {
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { Button, Card, Col, Image, Row, ProgressBar } from "react-bootstrap";
import { formatDate } from "../../utils/helpers";
import { handleAnswerQuestion } from "../Actions/Questions";

const QuestionPage = ({
  question,
  autherAvatar,
  authorName,
  VotedOption,
  votes,
  optionOnePercentage,
  optionTwoPercentage,
  dispatch,
}) => {
  if (question === null) {
    return <div>Loading...</div>;
  }

  if (question === undefined) {
    return <Navigate to="/404" />;
  }

  const handleClick = (e) => {
    e.preventDefault();
    const selectedOption = e.target.value;

    dispatch(
      handleAnswerQuestion({
        qid: question.id,
        answer: selectedOption,
      })
    );
  };

  return (
    <Card className="text-center" key={question.id} style={{ flexGrow: 1 }}>
      <Card.Body>
        <Image
          src={autherAvatar}
          roundedCircle
          width={"75px"}
          height={"75px"}
        />
        <Card.Title className="mb-3">{authorName}</Card.Title>
        <Card.Text className="mb-3">{formatDate(question.timestamp)}</Card.Text>

        <h2 className="mb-3">Would you rather</h2>
        <Row>
          <Col xs={6}>
            <Card>
              <Card.Body>
                <Card.Title> {question.optionOne.text}</Card.Title>

                <Row className="mb-2">
                  <Col>
                    <Button
                      onClick={handleClick}
                      value={"optionOne"}
                      disabled={VotedOption === "optionOne"}
                    >
                      Click
                    </Button>
                  </Col>
                </Row>

                {VotedOption && (
                  <>
                    <Row>
                      <Col>
                        <p>{votes.optionOne} person/s voted this option</p>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <ProgressBar
                          now={optionOnePercentage}
                          label={`${optionOnePercentage}%`}
                        />
                      </Col>
                    </Row>
                  </>
                )}
              </Card.Body>
            </Card>
          </Col>
          <Col xs={6}>
            <Card>
              <Card.Body>
                <Card.Title> {question.optionTwo.text}</Card.Title>

                <Row className="mb-2">
                  <Col>
                    <Button
                      onClick={handleClick}
                      value={"optionTwo"}
                      disabled={VotedOption === "optionTwo"}
                    >
                      Click
                    </Button>
                  </Col>
                </Row>

                {VotedOption && (
                  <>
                    <Row>
                      <Col>
                        <p>{votes.optionTwo} person/s voted this option</p>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <ProgressBar
                          now={optionTwoPercentage}
                          label={`${optionTwoPercentage}%`}
                        />
                      </Col>
                    </Row>
                  </>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

const withRouter = (Component) => {
  const ComponentWithRouterProp = (props) => {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return <Component {...props} router={{ location, navigate, params }} />;
  };

  return ComponentWithRouterProp;
};

const mapStateToProps = ({ Questions, Users, authedUser }, props) => {
  const { id } = props.router.params;
  const question = Questions[id];
  if (question === undefined) {
    return {
      question: undefined,
      autherAvatar: "",
      authorName: "",
      VotedOption: null,
      optionOnePercentage: 0,
      optionTwoPercentage: 0,
    };
  }
  const VotedOption = question.optionOne.votes.includes(authedUser)
    ? "optionOne"
    : question.optionTwo.votes.includes(authedUser)
    ? "optionTwo"
    : null;

  const NumOfVotes =
    question.optionOne.votes.length + question.optionTwo.votes.length;
  const optionOnePercentage = Math.round(
    (question.optionOne.votes.length / NumOfVotes) * 100
  );
  const optionTwoPercentage = Math.round(
    (question.optionTwo.votes.length / NumOfVotes) * 100
  );

  const votes = {
    optionOne: question.optionOne.votes.length,
    optionTwo: question.optionTwo.votes.length,
  };

  return {
    question,
    autherAvatar: Users[question.author].avatarURL,
    authorName: Users[question.author].name,
    VotedOption,
    votes,
    optionOnePercentage,
    optionTwoPercentage,
  };
};

export default withRouter(connect(mapStateToProps)(QuestionPage));

import React from "react";
import { Button, Card, Image } from "react-bootstrap";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../../utils/helpers";

function Question({ question, name, avatarURL }) {
  const navigate = useNavigate();
  return (
    <Card className="text-center">
      <Card.Body>
        <Image src={avatarURL} roundedCircle width={"75px"} height={"75px"} />
        <Card.Title>{name}</Card.Title>
        <Card.Text>{formatDate(question.timestamp)}</Card.Text>
        <Button
          variant="primary"
          onClick={() => {
            navigate(`/question/${question.id}`);
          }}
        >
          Show
        </Button>
      </Card.Body>
    </Card>
  );
}

const mapStateToProps = ({ Users }, { question }) => {
  const name = Users[question.author].name;
  const avatarURL = Users[question.author].avatarURL;
  return {
    name,
    avatarURL,
  };
};

export default connect(mapStateToProps)(Question);

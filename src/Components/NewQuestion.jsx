import { Button, Card } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useDispatch, useSelector } from "react-redux";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { handleAddQuestion } from "../Actions/Questions";
import { useNavigate } from "react-router-dom";

const formSchema = z.object({
  firstOption: z.string().min(2, "First option is required"),
  secondOption: z.string().min(2, "Second option is required"),
});

const NewQuestion = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstOption: "",
      secondOption: "",
    },
  });

  function onSubmit({ firstOption, secondOption }) {
    try {
      dispatch(handleAddQuestion(firstOption, secondOption));
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Card className="p-4">
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Card.Header as="h5" className="text-center">
          Create New Poll
        </Card.Header>

        <Card.Body>
          <Form.Group as={Row} controlId="firstOption">
            <Form.Label data-testid="firstOption" column sm={3}>
              First Option
            </Form.Label>
            <Col sm={9}>
              <Form.Control
                data-testid="firstOptionInput"
                placeholder="Enter first option"
                {...register("firstOption")}
                isInvalid={!!errors.firstOption}
              />
              <Form.Control.Feedback type="invalid">
                {errors.firstOption?.message}
              </Form.Control.Feedback>
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="secondOption">
            <Form.Label column data-testid="secondOption" sm={3}>
              Second Option
            </Form.Label>
            <Col sm={9}>
              <Form.Control
                data-testid="SecendOptionInput"
                placeholder="Enter second option"
                {...register("secondOption")}
                isInvalid={!!errors.secondOption}
              />
              <Form.Control.Feedback type="invalid">
                {errors.secondOption?.message}
              </Form.Control.Feedback>
            </Col>
          </Form.Group>
        </Card.Body>

        <Card.Footer className="text-center">
          <Button variant="primary" type="submit" data-testid="submitQuestion">
            Create Poll
          </Button>
        </Card.Footer>
      </Form>
    </Card>
  );
};

export default NewQuestion;

import { Button } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { useDispatch } from "react-redux";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { handleLogin } from "../Actions/AuthedUser";

const formSchema = z.object({
  username: z.string().min(2, "First option is required"),
  password: z.string().min(2, "Second option is required"),
});

const Login = () => {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userName: "",
      password: "",
    },
  });

  function onSubmit({ username, password }) {
    dispatch(handleLogin(username, password)).catch((error) => {
      setError(error.type, { message: error.message });
    });
  }

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <Form
        className="mx-auto my-5 p-4 border rounded"
        style={{ width: "30%" }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="text-center mb-4">Login</h1>

        <Form.Group className="mb-3" as={Col} controlId="username">
          <Form.Label data-testid="UserNameLable">User name</Form.Label>
          <Form.Control
            data-testid="Username"
            placeholder="Enter User name"
            {...register("username", { required: true })}
            isInvalid={!!errors.username}
          />
          <Form.Control.Feedback type="invalid">
            {errors.username?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" as={Col} controlId="password">
          <Form.Label data-testid="passwordLable">Password</Form.Label>
          <Form.Control
            data-testid="password"
            type="password"
            placeholder="Enter Password"
            {...register("password", { required: true })}
            isInvalid={!!errors.password}
          />
          <Form.Control.Feedback type="invalid">
            {errors.password?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Button
          className="w-100"
          variant="primary"
          type="submit"
          data-testid="LoginKlick"
        >
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default Login;

import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../store";
import { BrowserRouter } from "react-router-dom";
import Login from "./login";

describe("Login", () => {
  it("should render the component", () => {
    const { asFragment } = render(
      <Provider store={store}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </Provider>
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it("should display all elements", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </Provider>
    );

    const UsernameLable = screen.getByTestId("UserNameLable");
    const passwordLable = screen.getByTestId("passwordLable");
    expect(UsernameLable.textContent).toBe("User name");
    expect(passwordLable.textContent).toBe("Password");
  });
  it("should clear input elements after clicking submit button", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </Provider>
    );

    const Usernameinput = screen.getByTestId("Username");
    const password = screen.getByTestId("password");
    const LoginKlick = screen.getByTestId("LoginKlick");

    expect(Usernameinput.value).toBe("");
    expect(password.value).toBe("");

    fireEvent.change(Usernameinput, { target: { value: "sarahedo" } });
    fireEvent.change(password, {
      target: { value: "password123" },
    });

    expect(Usernameinput.value).toBe("sarahedo");
    expect(password.value).toBe("password123");

    fireEvent.click(LoginKlick);

    expect(Usernameinput.value).toBe("sarahedo");
    expect(password.value).toBe("password123");
  });
});

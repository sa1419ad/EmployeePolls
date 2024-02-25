import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../store";
import { BrowserRouter } from "react-router-dom";
import React from "react";
import NewQuestion from "./NewQuestion";
import { setAuthedUser } from "../Actions/AuthedUser";

describe("NewQuestion", () => {
  it("should render the component", () => {
    const component = render(
      <Provider store={store}>
        <BrowserRouter>
          <NewQuestion />
        </BrowserRouter>
      </Provider>
    );
    expect(component).toBeDefined();
  });

  it("should display all elements", () => {
    const component = render(
      <Provider store={store}>
        <BrowserRouter>
          <NewQuestion />
        </BrowserRouter>
      </Provider>
    );

    const firstOption = component.getByTestId("firstOption");
    const secondOption = component.getByTestId("secondOption");
    const firstOptionInput = component.getByTestId("firstOptionInput");
    const SecendOptionInput = component.getByTestId("SecendOptionInput");
    const submitQuestion = component.getByTestId("submitQuestion");

    expect(firstOption.textContent).toBe("First Option");
    expect(secondOption.textContent).toBe("Second Option");
    expect(submitQuestion.textContent).toBe("Create Poll");

    let value1 = "Learn React";
    let value2 = "Learn Redux";

    fireEvent.change(firstOptionInput, {
      target: { value: value1 },
    });
    fireEvent.change(SecendOptionInput, {
      target: { value: value2 },
    });
    expect(firstOptionInput.value).toBe(value1);
    expect(SecendOptionInput.value).toBe(value2);
  });
});

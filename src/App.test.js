import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import App from "./App";

global.confirm = () => true;

describe("App Tests", () => {
  it("Should render the page title", () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    const ceElement = screen.getByTestId("app-title");
    expect(ceElement).toHaveTextContent("The awesome Q/A Tool");
  });

  it("Should render add/sort buttons", () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    const sortBtn = screen.getByTestId("sort-button");
    const addBtn = screen.getByTestId("add-button");
    expect(sortBtn).not.toBe(null);
    expect(addBtn).not.toBe(null);
  });

  it("Should render the form modal clicking the create question button", () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    const addBtn = screen.getByTestId("add-button");
    const modal = screen.getByTestId("modal-container");

    fireEvent.click(addBtn);
    expect(modal).not.toBe(null);
  });

  it("Should handle create a question", () => {
    const { container, getByTestId } = render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    const addBtn = getByTestId("add-button");
    fireEvent.click(addBtn);

    const question = getByTestId("form-question");
    const answer = getByTestId("form-answer");
    const submitBtn = getByTestId("form-submit");

    expect(
      container.getElementsByClassName("questionBox__container").length
    ).toEqual(1);

    fireEvent.change(question, { target: { value: "question 1" } });
    fireEvent.change(answer, { target: { value: "answer 1" } });
    fireEvent.click(submitBtn);

    expect(
      container.getElementsByClassName("questionBox__container").length
    ).toEqual(2);
  });

  it("Should display an error if the user tries to save a question with empty values", async () => {
    const { container, getByTestId } = render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    const addBtn = getByTestId("add-button");
    fireEvent.click(addBtn);

    const question = getByTestId("form-question");
    const submitBtn = getByTestId("form-submit");

    expect(
      container.getElementsByClassName("questionBox__container").length
    ).toEqual(2);

    fireEvent.change(question, { target: { value: "question 1" } });
    fireEvent.click(submitBtn);

    expect(getByTestId("form-error")).not.toBe(null);
    expect(
      container.getElementsByClassName("questionBox__container").length
    ).toEqual(2);
  });

  it("Should handle sort questions", () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    var question1 = screen.getByTestId("question-title-1");
    expect(question1).toHaveTextContent(
      "Which house was Harry Potter almost put into by the sorting hat?"
    );

    const sortBtn = screen.getByTestId("sort-button");
    fireEvent.click(sortBtn);

    question1 = screen.getByTestId("question-title-1");
    expect(question1).toHaveTextContent("question 1");
  });

  it("Should handle delete questions", () => {
    const { container, getByTestId } = render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    expect(
      container.getElementsByClassName("questionBox__container").length
    ).toEqual(2);

    const deleteBtn = getByTestId("delete-question-2");
    fireEvent.click(deleteBtn);

    expect(
      container.getElementsByClassName("questionBox__container").length
    ).toEqual(1);
  });

  it("Should handle edit questions", () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    var question1 = screen.getByTestId("question-title-1");
    expect(question1).toHaveTextContent("question 1");

    const editBtn = screen.getByTestId("edit-question-1");
    fireEvent.click(editBtn);

    const question = screen.getByTestId("form-question");
    const submitBtn = screen.getByTestId("form-submit");

    fireEvent.change(question, { target: { value: "Updated question" } });
    fireEvent.click(submitBtn);

    question1 = screen.getByTestId("question-title-1");
    expect(question1).toHaveTextContent("Updated question");
  });

  it("Should handle add delayed questions", () => {
    const { container, getByTestId } = render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    const addBtn = getByTestId("add-button");
    fireEvent.click(addBtn);

    const question = getByTestId("form-question");
    const answer = getByTestId("form-answer");
    const delay = getByTestId("form-add-delay");
    const submitBtn = getByTestId("form-submit");

    expect(
      container.getElementsByClassName("questionBox__container").length
    ).toEqual(1);

    fireEvent.change(question, { target: { value: "question 1" } });
    fireEvent.change(answer, { target: { value: "answer 1" } });
    fireEvent.change(delay);
    fireEvent.click(submitBtn);

    expect(
      container.getElementsByClassName("questionBox__container").length
    ).toEqual(2);
  });
});

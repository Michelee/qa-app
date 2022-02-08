import questionsReducer, {
  add,
  addDelayedQuestion,
  edit,
  remove,
  sort,
} from "./questions";
import { addDelay } from "../../helpers/addDelay";

jest.mock("../../helpers/addDelay");
jest.mock("../../helpers/generateId", () => ({
  generateId: jest.fn().mockImplementation(() => "1234"),
}));

const initialState = {
  list: [
    {
      question:
        "Which house was Harry Potter almost put into by the sorting hat?",
      answer: "Slytherin",
      id: "1234",
    },
  ],
  loading: false,
};

describe("Questions reducer tests", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should set initial state", () => {
    expect(questionsReducer(undefined, {})).toEqual(initialState);
  });

  it("should handle remove question", () => {
    const resp = questionsReducer(initialState, remove("1234"));
    expect(resp.list.length).toEqual(0);
  });

  it("Should handle add question", () => {
    const resp = questionsReducer(
      initialState,
      add({ question: "this is a second question", answer: "hello world" })
    );
    expect(resp.list.length).toEqual(2);
  });

  it("should handle edit question", () => {
    const updatedQuestion = {
      ...initialState.list[0],
      answer: "Ravenclaw",
    };
    const resp = questionsReducer(initialState, edit(updatedQuestion));
    expect(resp.list[0].answer).toEqual("Ravenclaw");
  });

  it("should handle sort the questions", () => {
    const list = [
      { question: "z question", answer: "this is a test", id: "1" },
      { question: "a question", answer: "this is a test", id: "2" },
      { question: "m question", answer: "this is a test", id: "3" },
    ];
    const resp = questionsReducer(
      {
        list,
        loading: false,
      },
      sort()
    );
    expect(resp.list[0].question).toEqual("a question");
    expect(resp.list[1].question).toEqual("m question");
    expect(resp.list[2].question).toEqual("z question");
  });

  it("should handle add delayed question", async () => {
    const dispatch = jest.fn();
    const getState = () => ({ ...initialState });
    const thunk = addDelayedQuestion({
      question: "this is a delayed question",
      answer: "hello world",
    });
    await thunk(dispatch, getState, null);

    expect(addDelay).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledTimes(2);
  });

  it("Should modify state to loading if addDelayedQuestion is pending", () => {
    const action = { type: addDelayedQuestion.pending };
    const state = questionsReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      loading: true,
    });
  });

  it("Should modify state with the new values if addDelayedQuestion is fullfiled", () => {
    const action = {
      type: addDelayedQuestion.fulfilled,
      payload: {
        question: "this is a delayed question",
        answer: "hello world",
        id: "1234",
      },
    };
    const state = questionsReducer(initialState, action);
    expect(state).toEqual({
      list: [...initialState.list, action.payload],
      loading: false,
    });
  });
});

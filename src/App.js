import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "./components/Button";
import Form from "./components/Form";
import Modal from "./components/Modal";
import QuestionBox from "./components/QuestionBox";
import Tooltip from "./components/Tooltip";
import {
  add,
  addDelayedQuestion,
  edit,
  remove,
  sort,
} from "./redux/module/questions";
import "./styles/App.css";

const App = () => {
  const [openModal, setOpenModal] = useState(false);
  const [addDelay, setAddDelay] = useState(false);
  const [error, setError] = useState("");
  const [formValues, setFormValues] = useState({
    question: "",
    answer: "",
    id: "",
  });

  const dispatch = useDispatch();
  const questions = useSelector((state) => state.questions.list);
  const loading = useSelector((state) => state.questions.loading);

  useEffect(() => {
    if (questions.length) {
      setOpenModal(false);
    }
  }, [questions]);

  useEffect(() => {
    if (!openModal) {
      setFormValues({
        question: "",
        answer: "",
        id: "",
      });
      setAddDelay(false);
      setError("");
    }
  }, [openModal]);

  const handleSubmit = (ev) => {
    ev.preventDefault();
    const { question, answer, id } = formValues;

    if (!question || !answer) {
      setError("Please complete all the values");
      return;
    }

    if (addDelay) {
      dispatch(addDelayedQuestion(formValues));
    } else {
      dispatch(id ? edit(formValues) : add(formValues));
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("Do you really want to delete the question?")) {
      dispatch(remove(id));
    }
  };

  const handleChange = (ev) => {
    const { name, value } = ev.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
    setError("");
  };

  const handleEdit = (values) => {
    setFormValues(values);
    setOpenModal(true);
  };

  return (
    <div className="app__container">
      <header className="app__header">
        <h1 data-testid="app-title">The awesome Q/A Tool</h1>
      </header>

      <div className="app__actions-buttons">
        {questions.length > 0 && (
          <Button
            dataTest="sort-button"
            handleClick={() => dispatch(sort())}
            label="Sort Questions"
          />
        )}
        <Button
          dataTest="add-button"
          handleClick={() => setOpenModal(true)}
          label="Create Question"
        />
      </div>

      <div className="app__content">
        <Tooltip text="Here you can find the created questions and their answers">
          <h2>Created Questions</h2>
        </Tooltip>
        <p>
          Here you can find {questions.length || "no"}{" "}
          {`question${questions.length === 1 ? "" : "s"}`}. Feel free to create
          your own questions!
        </p>

        <Modal openModal={openModal} setOpenModal={setOpenModal}>
          <Tooltip text="Here you create/edit new questions and their answers">
            <h2>{formValues.id ? "Edit your" : "Create a new"} question</h2>
          </Tooltip>
          <Form
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            error={error}
            loading={loading}
            formValues={formValues}
            handleDelay={setAddDelay}
            addDelay={addDelay}
          />
        </Modal>

        {questions?.length ? (
          <div className="app__questions-list">
            {questions.map((item, index) => (
              <QuestionBox
                key={item.id}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
                number={index + 1}
                {...item}
              />
            ))}
          </div>
        ) : (
          <div className="app__no-questions-box">No questions yet :-(</div>
        )}
      </div>
    </div>
  );
};

export default App;

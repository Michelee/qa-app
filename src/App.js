import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Form from "./components/Form";
import Modal from "./components/Modal";
import QuestionBox from "./components/QuestionBox";
import { add, edit, remove, sort } from "./reducers/module/questions";
import "./styles/App.css";

const App = () => {
  const [openModal, setOpenModal] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState({
    question: "",
    answer: "",
    id: "",
  });

  const dispatch = useDispatch();
  const questions = useSelector((state) => state.questions.list);

  const handleSubmit = (ev) => {
    ev.preventDefault();
    const { question, answer, id } = formValues;

    if (!question || !answer) {
      setError("Please complete all the values");
      setLoading(false);
      return;
    }

    dispatch(id ? edit(formValues) : add(formValues));
    setFormValues({
      question: "",
      answer: "",
      id: "",
    });
    setOpenModal(false);
  };

  const handleDelete = (val) => {
    if (window.confirm("Do you really want to delete the question?")) {
      dispatch(remove(val));
    }
  };

  const handleChange = (ev) => {
    const { name, value } = ev.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleEdit = (values) => {
    setFormValues(values);
    setOpenModal(true)
  };

  return (
    <div className="app__container">
      <header className="app__header">
        <h1>The awesome Q/A Tool</h1>
      </header>
      <h2>List of Questions</h2>
      <div>
        {questions.length ? (
          <button onClick={() => dispatch(sort())}>Sort Questions</button>
        ) : (
          ""
        )}
        <button onClick={() => setOpenModal(true)}>Add Question</button>
      </div>
      <div className="app__content">
        <Modal openModal={openModal} setOpenModal={setOpenModal}>
          <h2>Add Question</h2>
          <Form
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            error={error}
            loading={loading}
            formValues={formValues}
          />
        </Modal>

        {questions?.length ? (
          <div className="app__list">
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
          <div>No questions asked. Create the first one!</div>
        )}
      </div>
    </div>
  );
};

export default App;

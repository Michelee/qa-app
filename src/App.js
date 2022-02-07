import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Form from "./components/Form";
import Modal from "./components/Modal";
import QuestionBox from "./components/QuestionBox";
import { add } from "./reducers/module/questions";
import "./styles/App.css";

const App = () => {
  const [openModal, setOpenModal] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const dispatch = useDispatch();
  const questions = useSelector((state) => state.questions.list);

  const handleSubmit = (ev) => {
    ev.preventDefault();

    if (!question || !answer) {
      setError("Please complete all the values");
      setLoading(false);
      return;
    }

    dispatch(add({ question, answer }));
    setAnswer("");
    setQuestion("");
    setOpenModal(false)
  };

  return (
    <div className="app__container">
      <header className="app__header">
        <h1>The awesome Q/A Tool</h1>
      </header>
      <h2>List of Questions</h2>
      <div>
        <button>Sort Questions</button>
        <button onClick={() => setOpenModal(true)}>Add Question</button>
      </div>
      <div className="app__content">
        <Modal openModal={openModal} setOpenModal={setOpenModal}>
          <h2>Add Question</h2>
          <Form
            handleSubmit={handleSubmit}
            error={error}
            loading={loading}
            question={question}
            answer={answer}
            setAnswer={setAnswer}
            setQuestion={setQuestion}
          />
        </Modal>

        {questions?.length ? (
          <div className="app__list">
            {questions.map((item, index) => (
              <QuestionBox
                key={index}
                question={item.question}
                answer={item.answer}
                number={index + 1}
              />
            ))}
          </div>
        ) : (
          <div>snnsns</div>
        )}
      </div>
    </div>
  );
};

export default App;

import React from "react";
import Input from "../Input";

const Form = ({ error, question, answer, setQuestion, setAnswer, loading, handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit}>
      <Input label="Question" value={question} handleChange={setQuestion} />
      <Input label="Answer" value={answer} handleChange={setAnswer} />
      {error && <span className="app__form-error">{error}</span>}
      {loading ? (
        <span className="app__form-loading">Loading...</span>
      ) : (
        <input
          data-test="submit-button"
          type="submit"
          className="app__form-submit-button"
          value="Submit"
        />
      )}
    </form>
  );
};

export default Form;

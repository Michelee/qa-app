import React from "react";
import Input from "../Input";

const Form = ({ error, formValues, handleChange, setAnswer, loading, handleSubmit }) => {
  const { question, answer } = formValues;
  return (
    <form onSubmit={handleSubmit}>
      <Input label="Question" name="question" value={question} handleChange={handleChange} />
      <Input label="Answer" name="answer" value={answer} handleChange={handleChange} />
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

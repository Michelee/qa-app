import React from "react";
import Button from "../Button";
import Checkbox from "../Checkbox";
import Input from "../Input";
import Textarea from "../Textarea";
import './Form.css'

const Form = ({
  error,
  formValues,
  handleChange,
  loading,
  addDelay,
  handleDelay,
  handleSubmit,
}) => {
  const { question, answer } = formValues;
  return (
    <form className="form__container" onSubmit={handleSubmit}>
      <Input
        label="Question"
        name="question"
        value={question}
        handleChange={handleChange}
        dataTest="form-question"
      />
      <Textarea
        label="Answer"
        name="answer"
        value={answer}
        handleChange={handleChange}
        dataTest="form-answer"
      />
      {!formValues?.id && (
        <Checkbox
          label="Add 5s delay"
          name="delay"
          value={addDelay}
          handleChange={handleDelay}
          dataTest="form-add-delay"
        />
      )}

      {error && <span className="form__error" data-testid="form-error">{error}</span>}
      <Button dataTest="form-submit" type="submit" label="Submit" loading={loading} />
    </form>
  );
};

export default Form;

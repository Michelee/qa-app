import React, { useState } from "react";
import { ReactComponent as EditIcon } from '../../assets/icons/edit-icon.svg'
import { ReactComponent as DeleteIcon } from '../../assets/icons/delete-icon.svg'
import "./QuestionBox.css";

const QuestionBox = ({
  question,
  answer,
  number,
  id,
  handleDelete,
  handleEdit,
}) => {
  const [showQuestion, setShowQuestion] = useState();
  return (
    <div className="questionBox__container">
      <div className="questionBox__title-actions">
        <h3 onClick={() => setShowQuestion(!showQuestion)} data-testid={`question-title-${number}`}>
          {number}. {question}
        </h3>
        <div className="questionBox__actions">
          <div onClick={() => handleEdit({ question, answer, id })} data-testid={`edit-question-${number}`}>
            <EditIcon />
          </div>
          <div onClick={() => handleDelete(id)} data-testid={`delete-question-${number}`}>
            <DeleteIcon />
          </div>
        </div>
      </div>
      <p
        className={showQuestion ? "questionBox__active" : "questionBox__hidden"}
      >
        {answer}
      </p>
    </div>
  );
};

export default QuestionBox;

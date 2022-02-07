import React, { useState } from "react";
import './QuestionBox.css'

const QuestionBox = ({ question, answer, number, id, handleDelete, handleEdit }) => {
  const [showQuestion, setShowQuestion] = useState();
  return (
    <div className="questionBox__container" onClick={() => setShowQuestion(!showQuestion)}>
      <button onClick={() => handleDelete(id)}>Delete</button>
      <button onClick={() => handleEdit({ question, answer, id})}>Edit</button>
      <h3>{number}. {question}</h3>
      <p className={showQuestion ? 'questionBox__active': 'questionBox__hidden'}>{answer}</p>

    </div>
  );
};

export default QuestionBox;

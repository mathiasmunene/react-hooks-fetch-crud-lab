import React from "react";

function QuestionItem({ question, onDeleteQuestion, onUpdateQuestion }) {
  const { id, prompt, answers, correctIndex } = question;

  function handleDelete() {
    return fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) throw new Error("Failed to delete question");
        return response.json();
      })
      .then(() => onDeleteQuestion(id))
      .catch((error) => console.error("DELETE error:", error));
  }

  function handleCorrectIndexChange(event) {
    const newCorrectIndex = parseInt(event.target.value);
    console.log(`Patching question ${id} with correctIndex: ${newCorrectIndex}`);
    return fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ correctIndex: newCorrectIndex }),
    })
      .then((response) => {
        if (!response.ok) throw new Error(`Failed to update question: ${response.status}`);
        return response.json();
      })
      .then((updatedQuestion) => {
        console.log(`Updated question ${id}:`, updatedQuestion);
        onUpdateQuestion(updatedQuestion);
        return updatedQuestion;
      })
      .catch((error) => {
        console.error(`PATCH error for question ${id}:`, error);
        throw error;
      });
  }

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select
          value={correctIndex.toString()}
          onChange={handleCorrectIndexChange}
        >
          {options}
        </select>
      </label>
      <button onClick={handleDelete}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;


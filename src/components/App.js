import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([]);

  const fetchQuestions = () => {
    fetch("http://localhost:4000/questions")
      .then((response) => {
        if (!response.ok) throw new Error("Failed to fetch questions");
        return response.json();
      })
      .then((data) => {
        console.log("Fetched questions:", data);
        setQuestions(data);
      })
      .catch((error) => console.error("Fetch error:", error));
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  function handleAddQuestion(newQuestion) {
    setQuestions((prevQuestions) => [...prevQuestions, newQuestion]);
  }

  function handleDeleteQuestion(id) {
    setQuestions((prevQuestions) =>
      prevQuestions.filter((question) => question.id !== id)
    );
  }

  function handleUpdateQuestion(updatedQuestion) {
    console.log("Updating question in state:", updatedQuestion);
    setQuestions((prevQuestions) =>
      prevQuestions.map((question) =>
        question.id === updatedQuestion.id ? updatedQuestion : question
      )
    );
    // Re-fetch to ensure server state is reflected
    fetchQuestions();
  }

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? (
        <QuestionForm onAddQuestion={handleAddQuestion} />
      ) : (
        <QuestionList
          questions={questions}
          onDeleteQuestion={handleDeleteQuestion}
          onUpdateQuestion={handleUpdateQuestion}
        />
      )}
    </main>
  );
}

export default App;


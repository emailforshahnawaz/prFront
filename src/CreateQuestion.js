import React, { useState } from "react";
import DropDown from "./DropDown";
import Input from "./Input";
import MDEditor from "@uiw/react-md-editor";
import "./Questions.css";
import { useHistory } from "react-router-dom";
import Goals from "./Goals";
const addShadow = {
  width: "30vw",
  border: "0px",
  boxShadow:
    "0 0 0 1px rgba(16, 22, 26, 0.1), 0 0 0 rgba(16, 22, 26, 0), 0 1px 1px rgba(16, 22, 26, 0.2)",
};
function CreateQuestion() {
  let history = useHistory();
  const [question, setQuestion] = useState({
    title: "",
    difficulty: "",
    gitCloneLink: "",
    goals: [],
  });
  const [error, setError] = useState(null);
  const [value, setValue] = useState("**Description of a Problem**");
  const [showEditor, setShowEditor] = useState(true);
  const setGoalsHandler = (goals) => {
    setQuestion({ ...question, goals });
  };
  const isNoU = (val) => val === null || val === undefined || val.trim() === "";
  const postQuestion = () => {
    const gotoHome = async () => {
      history.push("/");
    };
    if (validateQuestion()) {
      const body = JSON.stringify({ ...question, description: value });
      console.log({ body });
      fetch("http://localhost:9999/question", {
        method: "POST",
        headers: {
          "x-jtoken": localStorage.getItem("letsLearnJWT"),
          "Content-Type": "application/json",
        },
        body: body,
      })
        .then((r) => {
          if (r.ok) {
            return { ...r.json(), success: true };
          }
          return r.json();
        })
        .then((r) => {
          if (!r.success) {
            setError(r.er);
          } else {
            gotoHome();
          }
        });
    }
  };
  const validateQuestion = () => {
    const stringProp = ["title", "difficulty", "gitCloneLink"];
    if (isNoU(value) || value.trim() === "**Description of a Problem**") {
      setError("Update the Description!");
      return false;
    }
    for (const i of stringProp) {
      if (isNoU(question[i])) {
        setError("Fill all the fields!");
        return false;
      }
    }
    console.log("cleaar");
    return true;
  };
  return (
    <div className="qts-container">
      <div className="qts-header" style={{ position: "sticky", top: "40px" }}>
        <h1>Create a Question</h1>

        <button className="post" onClick={postQuestion}>
          Submit Question
        </button>

        {error && <span>{error}</span>}
      </div>

      <div className="qts-title">
        <Input
          type="text"
          style={addShadow}
          value={question.title}
          required
          label="Title"
          onChange={(event) => {
            setQuestion({ ...question, title: event.target.value });
          }}
        />

        <div style={{ position: "relative" }}>
          <DropDown
            title="Difficulty"
            selectHandler={(select) =>
              setQuestion({ ...question, difficulty: select })
            }
            options={["Easy", "Medium", "Hard"]}
          />
        </div>
      </div>
      <div className="editor">
        <div className="toggle-editor">
          {showEditor ? "Hide Editor" : "Show Editor"}
          <button
            className="toggler"
            onClick={() => setShowEditor(!showEditor)}
          >
            {showEditor ? "-" : "+"}
          </button>
        </div>
        {showEditor && (
          <MDEditor value={value} onChange={setValue} preview="edit" />
        )}
      </div>
      <Input
        type="text"
        value={question.gitCloneLink}
        style={addShadow}
        required
        label="GitHub repo link"
        onChange={(event) => {
          setQuestion({ ...question, gitCloneLink: event.target.value.trim() });
        }}
      />
      <Goals setGoalsHandler={setGoalsHandler} />
    </div>
  );
}

export default CreateQuestion;

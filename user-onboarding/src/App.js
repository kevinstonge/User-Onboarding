import React, { useState } from "react";
import "./App.scss";
import Form from "./Form";

function App() {
  const [members, setMembers] = useState([]);
  const addMember = (member) => {
    setMembers([...members, member]);
  };
  return (
    <div className="App">
      <div className="formContainer">
        <Form addMember={addMember} />
      </div>
      <div className="membersContainer">
        {members.map((m) => (
          <p>{m.name}</p>
        ))}
      </div>
    </div>
  );
}

export default App;

import React, { useState } from "react";
import "./App.scss";
import Form from "./Form";

function App() {
  const [members, setMembers] = useState([
    { name: "John Doe", email: "johndoe@gmail.com", password: "password" },
    { name: "Jane Doe", email: "janedoe@gmail.com", password: "password" },
  ]);
  const addMember = (member) => {
    setMembers([...members, member]);
  };
  return (
    <div className="App">
      <div className="formContainer">
        <Form addMember={addMember} />
      </div>
      <div className="membersContainer">
        <h2>Members</h2>
        {members.map((m) => (
          <div className="member" key={`${m.email}`}>
            <p>
              {m.name} ({m.email})
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;

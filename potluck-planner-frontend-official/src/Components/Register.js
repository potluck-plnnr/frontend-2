import React, { useState, useEffect } from "react";
import Input from "../Utilities/ChangeInput";
import Auth from "../Utilities/AxiosWithAuth";
import { useHistory } from "react-router-dom";

let Register = () => {
  let [setNewUser] = useState([]);
  let [userName, setUsername] = Input("");
  let [pass, setPassword] = Input("");
  let history = useHistory();

  useEffect(() => {
    Auth()
      .get("/register")
      .then((response) => {
        console.log(response);
        setNewUser(response);
      })
      .catch((error) => console.log(error));
  }, []);

  let handleSubmit = (e) => {
    e.preventDefault();

    let userData = {
      username: userName,
      password: pass,
    };

    setUsername("");
    setPassword("");

    Auth()
      .post("/register", userData)
      .then((response) => {
        console.log(response, "post");
        setNewUser(response.userData);
        history.push("/protected");
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="username"
          onChange={(e) => setUsername(e.target.value)}
          value={userName}
        />
        <input
          type="text"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
          value={pass}
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;

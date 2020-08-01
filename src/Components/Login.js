import React from "react";

import Input from "../Utilities/ChangeInput";
import Auth from "../Utilities/AxiosWithAuth";
import { useHistory } from "react-router-dom";

let Login = () => {
  let [username, handleUsername] = Input("");
  let [password, handlePassword] = Input("");
  let history = useHistory();

  let handleSubmit = (e) => {
    e.preventDefault();

    let data = {
      username: username,
      password: password,
    };

    Auth()
      .post("/login", data)
      .then((response) => {
        console.log(response);
        localStorage.setItem("token", response.data.token);
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
          onChange={(e) => handleUsername(e.target.value)}
          value={username}
        />
        <input
          type="text"
          placeholder="password"
          onChange={(e) => handlePassword(e.target.value)}
          value={password}
        />
        <button type="submit">Submit</button> 
      </form>
    </div>
  );
};

// {
// 	"username": "joejoe",
// 	"password": "testpass123"
// }

export default Login;

import React from "react";

import { useHistory } from "react-router-dom";

import List from "./PotluckListAll";

let PotluckDashboard = () => {
  let history = useHistory();

const logOut = () => {
  localStorage.clear();
  history.push("/");
};

  return (
    <div>
      <List />
      {/* GUESTFORM HERE */}
      {/* POTLUCK HERE */}
      <button onClick={logOut}>Log Out</button>
    </div>
  );
};

export default PotluckDashboard;

import React from "react";

import { useHistory } from "react-router-dom";

import List from "./PotluckListAll";

// import GuestForm from "./GuestForm";
import Potluck from "../../Potluck";

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

      {<button onClick={Potluck}>Create</button>}
      {/* {<button onClick={GuestForm}>GuestForm</button>} */}

      <button onClick={logOut}>Log Out</button>
    </div>
  );
};

export default PotluckDashboard;

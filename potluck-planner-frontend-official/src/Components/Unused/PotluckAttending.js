import React, { useEffect } from "react";
import Auth from "../../Utilities/AxiosWithAuth";
import Input from "../../Utilities/ChangeInput";

let Attending = () => {
  let [guest, setGuest] = Input("");

  useEffect(() => {
    Auth()
      .get("/guests")
      .then((response) => {
        console.log(response);
        setGuest(response);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div>
      {guest.map((guest) => (
        <h2>{guest}</h2>
      ))}
      <form>{/* form here */}</form>
    </div>
  );
};

export default Attending;

import React, { useEffect } from "react";
import Input from "../../Utilities/ChangeInput";
import Auth from "../../Utilities/AxiosWithAuth";

let PotluckList = () => {
  let [list, setList] = Input([]);

  useEffect(() => {
    Auth()
      .get("/potlucks")
      .then((response) => {
        console.log(response.data, "coming from auth");
        setList(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  console.log(list, "coming from the list");

  const deletePotluck = (potluck) => {
    Auth()
      .delete(`/potluck/${potluck.id}`)
      .then((res) => {
        console.log(res);
        window.location.reload();
      });
  };

  return (
    <div>
      {list.map((data) => (
        <div key={data.id}>
          <h1>{data.name}</h1>
          <h3>
            {data.date} | {data.time}
          </h3>
          <p>{data.items}</p>
          <button
            onClick={(e) => {
              e.stopPropagation();
              deletePotluck(data);
            }}
          >
            Delete Event
          </button>
        </div>
      ))}
    </div>
  );
};

export default PotluckList;



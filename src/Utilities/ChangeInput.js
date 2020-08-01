import { useState } from "react";

const Input = (initialState) => {
  const [state, setState] = useState(initialState);

  const handleChange = (updatedValue) => {
    setState(updatedValue);
  };

  return [state, setState, handleChange];
};

export default Input;

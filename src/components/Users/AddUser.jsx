import React, { useState, useRef } from "react";

import Card from "../UI/Card";
import Wrapper from "../Helpers/Wrapper";

import classes from "./AddUser.module.css";
import Button from "../UI/Button";
import ErrorModal from "../UI/ErrorModal";

const AddUser = ({ onAddUser }) => {
  const nameInputRef = useRef();
  const ageInputRef = useRef();

  const [error, setError] = useState("");

  const AddUserHandler = (event) => {
    event.preventDefault("");
    const enteredName = nameInputRef.current.value;
    const enteredUserAge = ageInputRef.current.value;

    if (enteredName.trim().length === 0 || enteredUserAge.trim().length === 0) {
      setError({
        title: "invalid input!",
        message: "Please enter a valid name and age(non-empity values)",
      });
      return;
    }
    if (+enteredUserAge < 1) {
      setError({
        title: "invalid age!",
        message: "Please enter a valid age(> 0)",
      });
      return;
    }
    onAddUser(enteredName, enteredUserAge);
    nameInputRef.current.value = "";
    ageInputRef.current.value = "";
  };

  const errorHandler = () => {
    setError(null);
  };

  return (
    <Wrapper>
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onConfirm={errorHandler}
        />
      )}
      <Card className={classes.input}>
        <form onSubmit={AddUserHandler}>
          <label htmlFor="username">Username</label>
          <input id="username" type="text" ref={nameInputRef} />
          <label htmlFor="age">age (Year)</label>
          <input id="age" type="number" ref={ageInputRef} />
          <Button type="submit">Add User</Button>
        </form>
      </Card>
    </Wrapper>
  );
};

export default AddUser;

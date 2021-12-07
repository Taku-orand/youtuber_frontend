import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import { createYoutuber } from "../lib/api/post";
import { Form } from "./Form";

export const CreateYoutuber = () => {
  const [value, setValue] = useState({});
  const history = useHistory();

  const onChangeValue = (e) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await createYoutuber({youtuber: value});
      console.log(res);
      history.push("/");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <h1>NEW</h1>
      <Form
        onChange={onChangeValue}
        handleSubmit={handleSubmit}
        value={value}
        buttonType="登録"
      />
    </>
  );
};

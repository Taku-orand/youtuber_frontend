import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import { createYoutuber } from "../../lib/api/youtuber";
import { Form } from "../Form";
import { Search } from "../molecules/search/Search";
import { youtubeSearch } from "../../lib/api/youtubeSearch";

export const CreateYoutuber = () => {
  const [value, setValue] = useState({});
  const [keyword, setKeyWord] = useState("");
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
      const res = await createYoutuber({ youtuber: value });
      console.log(res);
      history.push("/");
    } catch (e) {
      console.log(e);
    }
  };

  const onClickSearchYoutuber = (word) => {
    const youtubers = youtubeSearch(word);
    console.log(youtubers);
  };

  const onChangeKeyword = (e) => {
    setKeyWord(e.target.value);
  };

  return (
    <>
      <h1>NEW</h1>
      <Search keyword={keyword} onClick={onClickSearchYoutuber} onChange={onChangeKeyword} />
      <Form
        onChange={onChangeValue}
        handleSubmit={handleSubmit}
        value={value}
        buttonType="登録"
      />
    </>
  );
};

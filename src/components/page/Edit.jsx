import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { updateYoutuber, getYoutuberDetail } from "../../lib/api/youtuber";
import { Form } from "../Form";

export const Edit = () => {
  // apiで取得したデータを管理する為のstate
  const [value, setValue] = useState({
    channelTitle: "",
    channelId: "",
    channelThumbnail: "",
    lastEditor: "",
    createdAt: "",
    updatedAt: "",
  });
  // 一覧からreact-router-domを使ってidを取得
  const query = useParams();

  const history = useHistory();
  // 画面が描画された時、queryが更新された時に関数を実行
  useEffect(() => {
    handleGetData(query);
  }, [query]);
  // idをapiクライアントに渡し、/api/v1/posts/:idのエンドポイントからデータ取得
  const handleGetData = async (query) => {
    try {
      const res = await getYoutuberDetail(query.id);
      console.log(res.data);
      // 使う値のみstateにセットする
      setValue({
        channelTitle: res.data.youtuber.channelTitle,
        channelId: res.data.youtuber.channelId,
        channelThumbnail: res.data.youtuber.channelThumbnail,
        lastEditor: res.data.youtuber.lastEditor,
        createdAt: res.data.youtuber.createdAt,
        updatedAt: res.data.youtuber.updatedAt,
        content: res.data.youtuber.content,
      });
    } catch (e) {
      console.log(e);
    }
  };
  // テキストフィールドの変更を検知し値を書き換えstateで管理
  const onChangeValue = (e) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
  };
  // 更新ボタン押下後、idとparameterをapiクライアントに渡しリクエストを投げる
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await updateYoutuber(query.id, value);
      console.log(response);
      // リクエストが成功したら'/'にリダイレクトさせる
      history.push("/");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <h1>Edit</h1>
      <Form
        onChange={onChangeValue}
        handleSubmit={handleSubmit}
        value={value}
        buttonType="更新"
      />
    </>
  );
};

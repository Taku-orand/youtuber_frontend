import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Button } from "@chakra-ui/react"

import { getYoutuberDetail } from "../../lib/api/youtuber";
import { countup, getCollabList } from "../../lib/api/collab";

export const YoutuberDetail = () => {
  const [data, setData] = useState({});
  const [collab, setCollab] = useState([]);
  const [loading, setLoading] = useState(false);
  // { id: "1" }を取得する
  const query = useParams();
  // 戻るボタン用
  const history = useHistory(); // useEffectの副作用を使い、処理をもう一度実行させる

  // 画面描画時にidがundefinedだとデータ取得できないので
  // 依存配列にidを入れて、idがundifined => 1と更新された時に
  useEffect(() => {
    handleGetYoutuberDetail(query);
    handleGetCollabList(query);
  }, [query]);

  const handleGetYoutuberDetail = async (query) => {
    try {
      const response = await getYoutuberDetail(query.id);
      console.log(response.data);
      setData(response.data.youtuber);
    } catch (e) {
      console.log(e);
    }
  };

  const handleGetCollabList = async (query) => {
    setLoading(true);
    try {
      const res = await getCollabList(query.id);
      console.log(res.data);
      setCollab(res.data.collaborations);
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  const onClickCountup = async (item) => {
    try {
      const res = await countup(item.id);
      console.log(res.data);
      handleGetCollabList(query);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <>
      <h1>DETAIL</h1>
      <div>ID：{data.id}</div>
      <div>チャンネル名：{data.channelTitle}</div>
      <div>概要：{data.content}</div>
      <div>編集者：{data.lastEditor}</div>
      <h2>コラボ希望Youtuber</h2>
      {loading ? (
        <div>データがありません。</div>
      ) : (
        <div>
          {collab.map((item) => (
            <div key={item.id}>
              <span>ID:{item.id}, </span>
              <span>{item.channelTitle}, </span>
              <span>{item.count}人 </span>
              <Button size="xs" onClick={()=>onClickCountup(item)}>👍</Button>
            </div>
          ))}
        </div>
      )}
      <button onClick={() => history.push("/")}>戻る</button>
    </>
  );
};

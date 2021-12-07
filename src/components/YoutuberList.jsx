// List.jsx
/* eslint-disable react-hooks/exhaustive-deps*/
import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { deleteYoutuber, getYoutuberList } from "../lib/api/post";

export const YoutuberList = () => {
  const [dataList, setDataList] = useState([]);
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  useEffect(() => {
    handleGetYoutuberList();
  }, []);

  const handleGetYoutuberList = async () => {
    setLoading(true);
    try {
      const response = await getYoutuberList();
      setDataList(response.data.youtubers);
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  // 削除する関数を追加
  const handleYoutuberDelete = async (item) => {
    // 引数にitemを渡してitem.idで「1」など取得できればOK
    console.log("click", item.id);
    try {
      const res = await deleteYoutuber(item.id);
      console.log(res.data); // データを再取得
      handleGetYoutuberList();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <h1>HOME</h1>
      <button onClick={() => history.push("/create")}>新規作成</button>
      {loading ? (
        <div>データがありません{loading}</div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>チャンネル名</th>
              <th>チャンネルID</th>
              <th colSpan="1"></th>
              <th colSpan="1"></th>
              <th colSpan="1"></th>
            </tr>
          </thead>
          {dataList.map((item, index) => (
            <tbody key={index}>
              <tr>
                <td>{item.channelTitle}</td>
                <td>{item.channelId}</td>
                <td>
                  <Link to={`/edit/${item.id}`}>更新</Link>
                </td>
                <td>
                  <Link to={`/post/${item.id}`}>詳細へ</Link>
                </td>
                <td>
                  <button onClick={() => handleYoutuberDelete(item)}>
                    削除
                  </button>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      )}
    </>
  );
};

/* eslint-disable react-hooks/exhaustive-deps*/
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import {
  Input,
  Flex,
  Box,
  Textarea,
  Button,
  Image,
  Spacer,
} from "@chakra-ui/react";

import { updateYoutuber, getYoutuberDetail } from "../../lib/api/youtuber";
import { useMessage } from "../../hooks/useMessage";
import TextareaAutosize from "react-textarea-autosize";

// Youtuber記事の編集ページ
export const Edit = () => {
  // apiで取得したデータを管理する為のstate
  const [channelTitle, setChannelTitle] = useState("");
  const [channelThumbnail, setChannelThumbnail] = useState("");
  const [channelId, setChannelId] = useState("");
  const [lastEditor, setLastEditor] = useState("");
  const [content, setContent] = useState("");
  const { showMessage } = useMessage();

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
      if (!res.data.youtuber) {
        showMessage({ title: "データの取得に失敗しました", status: "error" });
      }
      // 使う値のみstateにセットする
      setChannelTitle(res.data.youtuber.channelTitle);
      setChannelId(res.data.youtuber.channelId);
      setChannelThumbnail(res.data.youtuber.channelThumbnail);
      setLastEditor(res.data.youtuber.lastEditor);
      setContent(res.data.youtuber.content);
    } catch (e) {
      showMessage({ title: "データの取得に失敗しました", status: "error" });
    }
  };

  // テキストフィールドの変更を検知し値を書き換えstateで管理
  const onChangeChannelTitle = (e) => {
    setChannelTitle(e.target.value);
  };
  const onChangeLastEditor = (e) => {
    setLastEditor(e.target.value);
  };
  const onChangeContent = (e) => {
    setContent(e.target.value);
  };

  // 更新ボタン押下後、idとparameterをapiクライアントに渡しリクエストを投げる
  const onClickSubmit = async () => {
    try {
      const response = await updateYoutuber(query.id, {
        youtuber: {
          channelTitle: channelTitle,
          channelId: channelId,
          channelThumbnail: channelThumbnail,
          lastEditor: lastEditor,
          content: content,
        },
      });
      if (response.data.updated)
        showMessage({ title: "編集しました", status: "success" });
      // リクエストが成功したら'/'にリダイレクトさせる
      history.push("/youtuber/detail/" + query.id);
    } catch (e) {
      console.log(e);
      showMessage({ title: "編集に失敗しました", status: "error" });
    }
  };

  const onClickCancel = () => {
    history.push("/youtuber/detail/" + query.id);
  };

  return (
    <>
      <Image
        borderRadius="full"
        boxSize="160px"
        src={channelThumbnail}
        alt={channelTitle}
        m="auto"
      />

      <Box bg="white" px={100} py={50} borderRadius="md">
        <form>
          <div>
            <label>チャンネル名</label>
            <Input
              name="channelTitle"
              onChange={(e) => onChangeChannelTitle(e)}
              value={channelTitle}
            />
          </div>
          <div>
            <label>チャンネルURL</label>
            <br />
            <Input
              isReadOnly
              isDisabled
              name="channelUrl"
              value={`https://www.youtube.com/channel/${channelId}`}
            />
          </div>
          <div>
            <label>編集者</label>
            <Input
              name="lastEditor"
              onChange={(e) => onChangeLastEditor(e)}
              value={lastEditor}
            />
          </div>
          <div>
            <label htmlFor="content">概要</label>
            <Textarea
              minH="unset"
              overflow="hidden"
              w="100%"
              resize="none"
              minRows={1}
              onChange={(e) => onChangeContent(e)}
              value={content}
              as={TextareaAutosize}
            />
          </div>
          <Flex mt={4}>
            <Button onClick={onClickCancel}>キャンセル</Button>
            <Spacer />
            <Button onClick={onClickSubmit}>更新する</Button>
          </Flex>
        </form>
      </Box>
    </>
  );
};

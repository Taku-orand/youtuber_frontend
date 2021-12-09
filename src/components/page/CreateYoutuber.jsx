/* eslint-disable react-hooks/exhaustive-deps*/
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import {
  Button,
  Wrap,
  WrapItem,
  Box,
  Stack,
  Image,
  Text,
  Flex,
  Input,
  Link,
  Tooltip,
  InputLeftElement,
  InputGroup,
  Textarea,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import TextareaAutosize from "react-textarea-autosize";

import { createYoutuber } from "../../lib/api/youtuber";
import { youtubeSearch } from "../../lib/api/youtubeSearch";
import { useMessage } from "../../hooks/useMessage";

// Youtuber記事の新規登録
export const CreateYoutuber = () => {
  const [channelId, setChannelId] = useState("");
  const [channelThumbnail, setChannelThumbnail] = useState("");
  const [lastEditor, setLastEditor] = useState("");
  const [content, setContent] = useState("");
  const [keyword, setKeyWord] = useState("");
  const [isFound, setIsFound] = useState(false);
  const history = useHistory();
  const { showMessage } = useMessage();

  useEffect(() => {
    showMessage({ title: "検索して新規追加してください", status: "info" });
  }, []);

  // 新規記事の登録
  const onClickSubmit = async () => {
    try {
      const res = await createYoutuber({
        youtuber: {
          channelTitle: keyword,
          channelId: channelId,
          channelThumbnail: channelThumbnail,
          lastEditor: lastEditor,
          content: content,
        },
      });

      if (res.data.title) {
        showMessage({ title: res.data.title, status: "warning" });
        return;
      }
      showMessage({ title: "新規作成しました", status: "success" });
      history.push("/");
    } catch (e) {
      showMessage({ title: "新規作成に失敗しました", status: "error" });
      console.log(e);
    }
  };

  // 検索ワードからYoutube Data APIにチャンネルを検索する
  const onClickSearchYoutuber = async () => {
    const youtuber = await youtubeSearch(keyword);
    if (youtuber) {
      setChannelId(youtuber[0].id.channelId);
      setChannelThumbnail(youtuber[0].snippet.thumbnails.default.url);
      setIsFound(true);
      showMessage({
        title: "正しいチャンネルか確かめてください",
        status: "info",
      });
    } else {
      setIsFound(false);
      showMessage({
        title: "チャンネルは見つかりませんでした",
        status: "error",
      });
    }
  };

  // Inputの値を変えるため
  const onChangeLastEditor = (e) => {
    // 編集者用
    setLastEditor(e.target.value);
  };
  const onChangeContent = (e) => {
    // 紹介用
    setContent(e.target.value);
  };
  const onChangeKeyword = (e) => {
    //検索ワード用
    setKeyWord(e.target.value);
  };

  return (
    <>
      <Wrap justify="center">
        <Flex>
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              children={<SearchIcon color="gray.300" />}
            />
            <Input
              bgColor="white"
              borderRadius="16px"
              value={keyword}
              placeholder="チャンネル名を検索*"
              onChange={(e) => onChangeKeyword(e)}
            />
          </InputGroup>
          <Button onClick={onClickSearchYoutuber}>検索</Button>
        </Flex>
      </Wrap>

      {!isFound ? (
        <br />
      ) : (
        <Wrap p={{ base: 4, md: 10 }} justify="center">
          <WrapItem mx="auto">
            <Box
              w="260px"
              h="260px"
              bg="white"
              borderRadius="10px"
              shadow="md"
              p={4}
            >
              <Stack textAlign="center">
                <Image
                  borderRadius="full"
                  boxSize="160px"
                  src={channelThumbnail}
                  alt={keyword}
                  m="auto"
                />
                <Text fontSize="lg" fontWeight="bold">
                  {keyword}
                </Text>
                <Link
                  href={`https://www.youtube.com/channel/${channelId}`}
                  fontSize="sm"
                  isExternal
                  color="blue"
                >
                  Youtubeチャンネルを確認
                </Link>
              </Stack>
            </Box>
          </WrapItem>
        </Wrap>
      )}

      <Box bg="white" p={10}>
        <form>
          <div>
            <label htmlFor="channelTitle">チャンネル名</label>
            <Input
              readOnly
              isDisabled
              type="text"
              name="channelTitle"
              id="channelTitle"
              value={keyword}
              border="blue"
            />
          </div>
          <div>
            <label htmlFor="channelId">チャンネルID</label>
            <Input
              readOnly
              isDisabled
              type="text"
              name="channelId"
              id="channelId"
              value={channelId}
            />
          </div>
          <div>
            <label htmlFor="lastEditor">編集者*</label>
            <Input onChange={(e) => onChangeLastEditor(e)} value={lastEditor} />
          </div>
          <div>
            <label htmlFor="content">概要*</label>
            <Textarea
              minH="unset"
              overflow="hidden"
              w="100%"
              resize="none"
              minRows={1}
              value={content}
              onChange={onChangeContent}
              as={TextareaAutosize}
            />
          </div>

          <Wrap justify="center" mt={4}>
            <Tooltip label="検索して*に入力してください" bg="red.600">
              <div>
                <Button
                  isDisabled={
                    channelId === "" || content === "" || lastEditor === ""
                  }
                  onClick={onClickSubmit}
                >
                  新規作成
                </Button>
              </div>
            </Tooltip>
          </Wrap>
        </form>
      </Box>
    </>
  );
};

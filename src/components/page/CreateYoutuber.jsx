import React, { useState } from "react";
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
} from "@chakra-ui/react";

import { createYoutuber } from "../../lib/api/youtuber";
import { Search } from "../molecules/search/Search";
import { youtubeSearch } from "../../lib/api/youtubeSearch";

export const CreateYoutuber = () => {
  // const [value, setValue] = useState({});
  const [channelId, setChannelId] = useState("");
  const [channelTitle, setChannelTitle] = useState("");
  const [keyword, setKeyWord] = useState("");
  const [searchYoutubers, setSearchYoutubers] = useState([]);
  const [selectYoutuber, setSelectYoutuber] = useState({});
  const history = useHistory();

  // const onChangeValue = (e) => {
  //   setValue({
  //     ...value,
  //     [e.target.name]: e.target.value,
  //   });
  // };

  // const onChangeChannelId = (id) => {
  //   setChannelId(id);
  // }

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const res = await createYoutuber({ youtuber: value });
  //     console.log(res);
  //     history.push("/");
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  const onClickSearchYoutuber = async () => {
    const youtubers = await youtubeSearch(keyword);
    const filteredYoutubers = youtubers.map((value) => {
      return {
        channelId: value.id.channelId,
        thumbnail: value.snippet.thumbnails.default.url,
      };
    });
    console.log(filteredYoutubers);
    // const test = youtubers[0].snippet
    // console.log("JSON.stringify()なし",test.channelId);
    // console.log("JSON.stringify()あり", JSON.stringify(test.channelId));

    setSearchYoutubers(filteredYoutubers);
  };

  const onChangeKeyword = (e) => {
    setKeyWord(e.target.value);
  };

  const onClickSelectYoutuber = (youtuber) => {
    setSelectYoutuber(youtuber);
  };

  return (
    <>
      <h1>NEW</h1>
      <Wrap>
        <Flex size="sm">
          <Input
            bgColor="white"
            borderRadius="16px"
            value={keyword}
            placeholder="チャンネル名を検索"
            onChange={(e) => onChangeKeyword(e)}
          />
          <Button onClick={onClickSearchYoutuber}>検索</Button>
        </Flex>
      </Wrap>
      {false ? (
        <div>見つかりませんでした</div>
      ) : (
        <Wrap p={{ base: 4, md: 10 }}>
          {searchYoutubers.map((searchYoutuber) => (
            <WrapItem key={searchYoutuber.id} mx="auto">
              <Box
                w="260px"
                h="260px"
                bg="white"
                borderRadius="10px"
                shadow="md"
                p={4}
                _hover={{ cursor: "pointer", opacity: 0.8 }}
              >
                <Stack textAlign="center">
                  <Image
                    borderRadius="full"
                    boxSize="160px"
                    src={searchYoutuber.thumbnail}
                    alt={keyword}
                    m="auto"
                  />
                  <Text fontSize="lg" fontWeight="bold">
                    {keyword}
                  </Text>
                  <Text fontSize="sm" fontWeight="gray"></Text>
                  <Button
                    size="sm"
                    onClick={() => onClickSelectYoutuber(searchYoutuber)}
                  >
                    追加
                  </Button>
                </Stack>
              </Box>
            </WrapItem>
          ))}
        </Wrap>
      )}
      <form>
        <div>
          <label htmlFor="channelTitle">チャンネル名：</label>
          <Input
            type="text"
            name="channelTitle"
            id="channelTitle"
            value={keyword}
          />
        </div>
        <div>
          <label htmlFor="channelId">チャンネルID</label>
          <input
            type="text"
            name="channelId"
            id="channelId"
            value={selectYoutuber.id?.channelId}
          />
        </div>
        {/* <div>
          <label htmlFor="channelThumbnail">サムネイル</label>
          <input
            type="text"
            name="channelThumbnail"
            id="channelThumbnail"
            onChange={(e) => onChange(e)}
            value={value.channelThumbnail}
          />
        </div>
        <div>
          <label htmlFor="lastEditor">編集者</label>
          <input
            type="text"
            name="lastEditor"
            id="lastEditor"
            onChange={(e) => onChange(e)}
            value={value.lastEditor}
          />
        </div>
        <div>
          <label htmlFor="content">概要</label>
          <input
            type="text"
            name="content"
            id="content"
            onChange={(e) => onChange(e)}
            value={value.content}
          />
        </div>
        <input
          type="submit"
          value={buttonType}
          onClick={(e) => handleSubmit(e)}
        /> */}
      </form>
    </>
  );
};

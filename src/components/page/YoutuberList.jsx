/* eslint-disable react-hooks/exhaustive-deps*/
import {
  Center,
  Spinner,
  Wrap,
  WrapItem,
  Box,
  Stack,
  Image,
  Button,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import { getYoutuberList } from "../../lib/api/youtuber";

export const YoutuberList = () => {
  const [youtubers, setYoutubers] = useState([]);
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  useEffect(() => {
    handleGetYoutuberList();
  }, []);

  const handleGetYoutuberList = async () => {
    setLoading(true);
    try {
      const response = await getYoutuberList();
      setYoutubers(response.data.youtubers);
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  // const onClickYoutuberDetail = useCallback((youtuber) => {
  //   history.push(`/youtuber/detail/${youtuber.id}`)
  // },[])

  // 削除する関数を追加
  // const handleYoutuberDelete = async (item) => {
  //   // 引数にitemを渡してitem.idで「1」など取得できればOK
  //   console.log("click", item.id);
  //   try {
  //     const res = await deleteYoutuber(item.id);
  //     console.log(res.data); // データを再取得
  //     handleGetYoutuberList();
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  return (
    <>
      <h1>Youtuber一覧ページ</h1>
      <button onClick={() => history.push("/youtuber/create")}>新規作成</button>
      {loading ? (
        <Center h="100vh">
          <Spinner color="white" />
        </Center>
      ) : (
        <Wrap p={{ base: 4, md: 10 }}>
          {youtubers.map((youtuber) => (
            <WrapItem key={youtuber.id} mx="auto">
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
                    src="https://yt3.ggpht.com/ytc/AKedOLRZrLxmGvezBeq5xh8-gZTkclJqd6LU11Z_souH=s88-c-k-c0xffffffff-no-rj-mo"
                    alt={youtuber.channelTitle}
                    m="auto"
                  />
                  <Text fontSize="lg" fontWeight="bold">
                    {youtuber.channelTitle}
                  </Text>
                  <Text fontSize="sm" fontWeight="gray"></Text>
                  <Button size="sm">詳細</Button>
                </Stack>
              </Box>
            </WrapItem>
          ))}
        </Wrap>
      )}
    </>
  );
};

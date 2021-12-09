/* eslint-disable react-hooks/exhaustive-deps*/
import {
  Center,
  Spinner,
  Wrap,
  WrapItem,
  Box,
  Stack,
  Image,
  Text,
  Link,
  Button,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

import { getYoutuberList } from "../../lib/api/youtuber";

// Youtuber記事の一覧ページ
export const YoutuberList = () => {
  const [youtubers, setYoutubers] = useState([]);
  const [loading, setLoading] = useState(false);

  // レンダー後に実行する
  useEffect(() => {
    handleGetYoutuberList();
  }, []);

  // Youtuber記事を取得する関数
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

  return (
    <>
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
                  <Link href={`${window.location.href}/detail/${youtuber.id}`}>
                    <Button
                      _hover={{ cursor: "pointer", opacity: 0.5 }}
                      size="sm"
                    >
                      詳細
                    </Button>
                  </Link>
                </Stack>
              </Box>
            </WrapItem>
          ))}
        </Wrap>
      )}
    </>
  );
};

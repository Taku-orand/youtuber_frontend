import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import {
  Input,
  Flex,
  Box,
  Link,
  Textarea,
  Button,
  Image,
  Text,
  FormControl,
  FormLabel,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Stack,
  Wrap,
  WrapItem,
  Heading,
  Skeleton,
} from "@chakra-ui/react";
import { SmallAddIcon } from "@chakra-ui/icons";

import { getYoutuberDetail } from "../../lib/api/youtuber";
import { countup, getCollabList, postCreateCollab } from "../../lib/api/collab";
import TextareaAutosize from "react-textarea-autosize";
import { useMessage } from "../../hooks/useMessage";

export const YoutuberDetail = () => {
  const [data, setData] = useState({});
  const [collab, setCollab] = useState([]);
  const [loading, setLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [channelId, setChannelId] = useState("");
  const [channelTitle, setChannelTitle] = useState("");
  const { showMessage } = useMessage();

  // { id: "1" }を取得する
  const query = useParams();
  // 戻るボタン用
  const history = useHistory();

  // 画面描画時にidがundefinedだとデータ取得できないので
  // 依存配列にidを入れて、idがundifined => 1と更新された時に実行させる
  useEffect(() => {
    handleGetYoutuberDetail(query);
    handleGetCollabList(query);
  }, [query]);

  // query.idに合致したYoutuberの記事を取得する
  const handleGetYoutuberDetail = async (query) => {
    try {
      const response = await getYoutuberDetail(query.id);
      setData(response.data.youtuber);
    } catch (e) {
      console.log(e);
    }
  };

  // コラボしてほしいYoutuberを取得する
  const handleGetCollabList = async (query) => {
    setLoading(true);
    try {
      const response = await getCollabList(query.id);
      setCollab(response.data.collaborations);
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  // コラボしてほしいYoutuberを投票する
  // カウントアップ関数
  const onClickCountup = async (item) => {
    try {
      await countup(item.id);
      handleGetCollabList(query);
    } catch (e) {
      console.log(e);
    }
  };

  //　編集画面に遷移する
  const onClickGoEdit = () => {
    history.push("/youtuber/edit/" + data.id);
  };

  // コラボしてほしいYoutuberを追加するために
  // モーダルを表示する関数
  const onClickAddCollab = () => {
    onOpen();
  };

  // コラボしてほしいYoutuberを新規登録する
  const onClickAddCollabSubmit = async () => {
    const params = {
      youtuberId: data.id,
      channelId: channelId,
      count: 0,
      channelTitle: channelTitle,
    };
    try {
      const res = await postCreateCollab(params);
      if (res.data) {
        onClose();
        handleGetCollabList(query);
      }
      showMessage({ title: "追加しました", status: "success" });
    } catch (e) {
      console.log(e);
      showMessage({ title: "追加に失敗しました", status: "error" });
    }
  };

  // 入力用
  // Inputの値が変わればchannelIdをセットする
  const onChangeChannelId = (e) => {
    setChannelId(e.target.value);
  };
  // Inputの値が変わればchannelIdをセットする
  const onChangeChannelTitle = (e) => {
    setChannelTitle(e.target.value);
  };

  return (
    <>
      <Image
        borderRadius="full"
        boxSize="160px"
        src={data.channelThumbnail}
        alt=""
        m="auto"
      />

      <Box bg="white" px={100} py={50} borderRadius="md">
        <form>
          <div>
            <label>チャンネル名</label>
            <Input isReadOnly={true} value={data.channelTitle} />
          </div>
          <div>
            <label>チャンネルURL</label>
            <br />
            <Link
              href={`https://www.youtube.com/channel/${data.channelId}`}
              color="blue"
              isExternal
            >
              {`https://www.youtube.com/channel/${data.channelId}`}
            </Link>
          </div>
          <div>
            <label>編集者</label>
            <Input isReadOnly={true} value={data.lastEditor} />
          </div>
          <div>
            <div htmlFor="content">概要</div>
            <Textarea
              minH="unset"
              overflow="hidden"
              w="100%"
              resize="none"
              minRows={1}
              isReadOnly={true}
              value={data.content}
              as={TextareaAutosize}
            />
          </div>
          <Wrap justify="center" mt={4}>
            <Button onClick={onClickGoEdit}>編集する</Button>
          </Wrap>
        </form>
      </Box>

      <Flex alignItems="center" justifyContent="center">
        <Box bg="white" pt={4} pr={14} pl={14} pb={4} mt={4}>
          <Flex>
            <Heading as="h3">コラボ希望Youtuber</Heading>
            <Button bgColor="yellow.400" ml="4" onClick={onClickAddCollab}>
              追加
            </Button>
          </Flex>
          {loading ? (
            <Stack>
              <Skeleton height="20px" />
              <Skeleton height="20px" />
              <Skeleton height="20px" />
            </Stack>
          ) : (
            <Wrap p={{ base: 4, md: 10 }}>
              {collab.map((item) => (
                <WrapItem key={item.id}>
                  <Box m={4} p={2} shadow="md">
                    <Text
                      fontSize="md"
                      fontWeight="bold"
                      _hover={{ cursor: "pointer", opacity: 0.5 }}
                    >
                      <Link href={item.channelId} isExternal>
                        {item.channelTitle}
                      </Link>
                    </Text>
                    <Wrap justify="end">
                      <span>{item.count}人 </span>
                      <Button size="xs" onClick={() => onClickCountup(item)}>
                        <SmallAddIcon boxSize="1.5rem" color="pink.500" />
                      </Button>
                    </Wrap>
                  </Box>
                </WrapItem>
              ))}
            </Wrap>
          )}
        </Box>
      </Flex>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        motionPreset="slideInBottom"
        autoFocus={false}
      >
        <ModalOverlay />
        <ModalContent pb={2}>
          <ModalHeader>コラボ希望Youtuber</ModalHeader>
          <ModalCloseButton />
          <ModalBody mx={6}>
            <Stack spacing={4}>
              <FormControl>
                <FormLabel>チャンネル名</FormLabel>
                <Input onChange={(e) => onChangeChannelTitle(e)} />
              </FormControl>
              <FormControl>
                <FormLabel>チャンネルURL</FormLabel>
                <Input onChange={(e) => onChangeChannelId(e)} />
              </FormControl>
            </Stack>
            <Link href="https://www.youtube.com" isExternal mt={4}>
              <Text color="red" as="span" fontWeight="bold">
                Youtube
              </Text>
              サイトへ
            </Link>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClickAddCollabSubmit}>追加</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

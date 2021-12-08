/* eslint-disable react-hooks/exhaustive-deps */
import { memo, useCallback } from "react";
import { Box, Flex, Heading, Link, useDisclosure } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";

import { MenuIconButton } from "../../atoms/button/MenuIconButton";
import { MenuDrawer } from "../../molecules/drawer/MenuDrawer";

export const Header = memo(() => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const history = useHistory();

  const onClickYoutuberList = useCallback(() => history.push("/youtuber"), []);
  const onClickLogin = useCallback(() => history.push("/login"), []);
  const onClickAddYoutuber = useCallback(
    () => history.push("/youtuber/create"),
    []
  );

  return (
    <>
      <Flex
        as="nav"
        bg="red.900"
        color="gray.50"
        align="center"
        justify="space-between"
        padding={{ base: 3, md: 5 }}
      >
        <Flex
          align="center"
          as="a"
          mr={8}
          _hover={{ cursor: "pointer" }}
          onClick={onClickYoutuberList}
        >
          <MenuIconButton onOpen={onOpen} />
          <Heading as="h1" fontSize={{ base: "md", md: "lg" }}>
            YouPedia
          </Heading>
        </Flex>
        <Flex
          align="center"
          fontSize="sm"
          display={{ base: "none", md: "flex" }}
          flexGrow={2}
        >
          <Box pr={4}>
            <Link onClick={onClickYoutuberList}>Youtuber一覧</Link>
          </Box>
          <Box pr={4}>
            <Link onClick={onClickAddYoutuber}>Youtuber追加</Link>
          </Box>
          <Box pr={4}>
            <Link onClick={onClickLogin}>ログイン</Link>
          </Box>
        </Flex>
      </Flex>
      <MenuDrawer
        isOpen={isOpen}
        onClose={onClose}
        onClickYoutuberList={onClickYoutuberList}
        onClickAddYoutuber={onClickAddYoutuber}
        onClickLogin={onClickLogin}
      />
    </>
  );
});

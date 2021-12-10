import { memo } from "react";
import { Link, Heading, Box, Flex, Divider, Stack } from "@chakra-ui/react";

// 404 ページ
export const Page404 = memo(() => {
  return (
    <>
      <Flex alignItems="center" justifyContent="center" height="100vh">
        <Box bg="white" w="sm" p={4} borderRadius="md" shadow="md">
          <Heading as="h1" size="lg" textAlign="center">
            YouPedia 404ページ
          </Heading>
          <Divider my={4} />
          <Stack spacing={6} py={4} px={10}>
            <Link fontWeight="md" href={`${window.location.protocol}/youtuber`}>
              Youtuber一覧ページ戻る
            </Link>
          </Stack>
        </Box>
      </Flex>
    </>
  );
});

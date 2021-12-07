import { useState } from "react";
import {
  Divider,
  Box,
  Heading,
  Flex,
  Input,
  Stack,
  Button,
} from "@chakra-ui/react";
import { useHistory } from "react-router-dom";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const onClickLogin = () => {
    console.log("ログイン");
    history.push("/");
  };

  return (
    <Flex alignItems="center" justifyContent="center" height="100vh">
      <Box bg="white" w="sm" p={4} borderRadius="md" shadow="md">
        <Heading as="h1" size="lg" textAlign="center">
          YouPedia
        </Heading>
        <Divider my={4} />
        <Stack spacing={6} py={4} px={10}>
          <Input
            value={email}
            placeholder="メールアドレス"
            onChange={onChangeEmail}
          />
          <Input
            value={password}
            placeholder="パスワード"
            onChange={onChangePassword}
          />
          <Button
            isFullWidth
            disabled={email === "" || password === ""}
            isLoading={false}
            onClick={onClickLogin}
          >
            ログイン
          </Button>
        </Stack>
      </Box>
    </Flex>
  );
};

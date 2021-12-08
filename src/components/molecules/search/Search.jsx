import { Input, Flex, Button } from "@chakra-ui/react";

export const Search = (props) => {
  const { onClick, onChange, keyword } = props;

  return (
    <Flex size="sm">
      <Input
        bgColor="white"
        borderRadius="16px"
        value={keyword}
        placeholder="チャンネル名を検索"
        onChange={(e) => onChange(e)}
      />
      <Button onClick={onClick(keyword)}>検索</Button>
    </Flex>
  );
};

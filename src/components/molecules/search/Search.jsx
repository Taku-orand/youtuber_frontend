import { Input, Box, Button } from "@chakra-ui/react";

export const Search = (props) => {
  const { onClick, onChange, keyword } = props;

  return (
    <Box size="sm">
      <Input
        borderRadius="16px"
        value={keyword}
        placeholder="チャンネル名を検索"
        onChange={(e) => onChange(e)}
      />
      <Button onClick={onClick}>検索</Button>
    </Box>
  );
};

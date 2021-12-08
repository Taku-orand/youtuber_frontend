import { IconButton } from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";

export const MenuIconButton = (props) => {
  const { onOpen } = props;
  return (
    <IconButton
      aria-label="メニューボタン"
      icon={<HamburgerIcon />}
      variant="unstyled"
      display={{ base: "block", md: "none" }}
      onClick={onOpen}
      paddingBottom={1}
    />
  );
};

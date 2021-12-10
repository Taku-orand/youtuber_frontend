import { memo } from "react";
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
} from "@chakra-ui/react";

// 左からドロワーがでてくるもの
export const MenuDrawer = memo((props) => {
  const { isOpen, onClose, onClickYoutuberList, onClickAddYoutuber } = props;

  return (
    <Drawer placement="left" size="xs" onClose={onClose} isOpen={isOpen}>
      <DrawerOverlay>
        <DrawerContent>
          <DrawerBody as="nav" p={0} bg="gray.100">
            <Button w="100%" onClick={onClickYoutuberList}>
              Youtuber一覧
            </Button>
            <Button w="100%" onClick={onClickAddYoutuber}>
              Youtuber追加
            </Button>
          </DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
});

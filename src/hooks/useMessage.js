/* eslint-disable react-hooks/exhaustive-deps*/
import { useToast } from "@chakra-ui/react";
import { useCallback } from "react";

export const useMessage = () => {
  const toast = useToast();

  const showMessage = useCallback((props) => {
    const { title, status } = props;
    toast({
      title,
      status,
      position: "bottom",
      duration: 2000,
      isClosable: true,
    });
  }, []);

  return { showMessage };
};

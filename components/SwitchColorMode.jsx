import { Switch, HStack, useColorMode } from "@chakra-ui/react";

const SwitchColorMode = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <HStack>
      <Switch
        colorScheme="green"
        isChecked={colorMode === "dark"}
        onChange={toggleColorMode}
        ml={2}
        mr={2}
      />
    </HStack>
  );
};

export default SwitchColorMode;

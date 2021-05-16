import { Switch, useColorMode } from "@chakra-ui/react";

export const DarkModeSwitch: React.VFC = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const isDark = colorMode === "dark";
  return (
    <Switch
      color="green"
      isChecked={isDark}
      onChange={toggleColorMode}
      mr={3}
    />
  );
};

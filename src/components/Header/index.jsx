import React, { useEffect, useState, useContext } from "react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  Text,
  useColorMode,
  useColorModeValue,
  Button,
  Stack,
} from "@chakra-ui/react";
import BackLink from "../BackLink";
import ProgressCompany from "../ProgressCompany";
import { ThemeContextBkm } from "../../contexts/theme";
import { orangeTheme, purpleTheme } from "../../styles/theme";
//import ProgressCompany from '../../components/ProgressCompany'

const Header = ({ path, stage = 0 }) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const [iconToggle, setIconToggle] = useState();
  const bgColor = useColorModeValue("bgBody.light", "bgBody.dark");

  const { themebkm, setthemebkm } = useContext(ThemeContextBkm);

  const handleToggleMode = () => {
    toggleColorMode();
  };

  const selectColors = () => {
    setthemebkm(themebkm === orangeTheme ? purpleTheme : orangeTheme);
  };

  // const createProgress = () => {
  //   return <ProgressCompany stage={stage} />;
  // };

  useEffect(() => {
    return setIconToggle(
      colorMode === "dark" ? (
        <SunIcon width={"18px"} height={"18px"} />
      ) : (
        <MoonIcon width={"18px"} height={"18px"} />
      )
    );
  }, [colorMode]);

  return (
    <>
      <Flex
        as={"div"}
        width={"full"}
        minWidth={"300px"}
        position={"absolute"}
        top={0}
        left={0}
        padding={"0 22px"}
        paddingTop={"45px"}
        background={bgColor}
      >
        <Text as={"span"}>
          <BackLink backLink={path} />
        </Text>
        <Box width={"full"}></Box>
        <Text as={"span"}></Text>

        <Stack direction="row" spacing={2} align="center">
          <Button
            size="xs"
            onClick={handleToggleMode}
            color="none"
            background={"none"}
            style={{ padding: "2px" }}
          >
            {" "}
            {process.env.NODE_ENV === "development" && iconToggle}
          </Button>
          <Button
            bg="orange"
            size="xs"
            //value={orangeTheme}
            onClick={selectColors}
            color="none"
            background={"orange"}
            style={{ padding: "2px" }}
            _hover={{ background: "orange" }}
          ></Button>
          <Button
            colorScheme="purple"
            size="xs"
            onClick={selectColors}
            //value={purpleTheme}
            color="none"
            style={{ padding: "2px" }}
            background={"purple"}
            _hover={{ background: "purple" }}
          ></Button>
        </Stack>
      </Flex>
      {/* {createProgress()} */}
    </>
  );
};

export default Header;

import { Box } from "@chakra-ui/react";

const Nav = ({ children }) => {
  return (
    <Box
      as={"nav"}
      minHeight={70}
      display={"grid"}
      gridAutoFlow={"column"}
      alignItems={"center"}
      justifyContent={"space-between"}
      paddingX={"5vw"}
      paddingY={5}
    >
      {children}
    </Box>
  );
};

export { Nav };

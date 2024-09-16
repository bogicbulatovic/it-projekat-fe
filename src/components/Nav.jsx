import { Box } from "@chakra-ui/react";

const Nav = ({ children }) => {
  return (
    <Box
      as={"nav"}
      minHeight={70}
      display={"grid"}
      width={"100vw"}
      gridAutoFlow={"column"}
      alignItems={"center"}
      justifyContent={"space-between"}
      paddingX={"5vw"}
      paddingY={5}
      borderBottom={"2px solid lightGray"}
    >
      {children}
    </Box>
  );
};

export { Nav };

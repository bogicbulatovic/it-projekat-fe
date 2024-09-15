import { Box, Link } from "@chakra-ui/react";
import { Nav } from "../components/Nav";
import { logout } from "./auth/helpers";

const Doctor = () => {
  return (
    <Box minHeight={"100vh"}>
      <Nav>
        <Link href="/">My Dentist</Link>
        <Box
          display={"grid"}
          gridAutoFlow={"column"}
          alignItems={"center"}
          gap={20}
        >
          <Link href="">About us</Link>
          <Link href="">Contact</Link>
          <Link href="/login" onClick={logout}>
            Logout
          </Link>
        </Box>
      </Nav>
      {/*  */}
    </Box>
  );
};

export { Doctor };

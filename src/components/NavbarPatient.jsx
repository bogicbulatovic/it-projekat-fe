import { Box, Grid, Hide, Link, Show } from "@chakra-ui/react";
import { Nav } from "./Nav";
import { MdClose, MdMenu } from "react-icons/md";
import { useState } from "react";
import { logout } from "../pages/auth/helpers";

const NavbarPatient = () => {
  const [navOpen, setNavOpen] = useState(false);
  return (
    <>
      <Nav>
        <Link href="/">My Dentist</Link>
        <Box
          display={"grid"}
          gridAutoFlow={"column"}
          alignItems={"center"}
          gap={20}
        >
          <Show above="md">
            <Link href="">About us</Link>
            <Link href="">Contact</Link>
            <Link href="/login" onClick={logout}>
              Logout
            </Link>
          </Show>
          <Hide above="md">
            <button onClick={() => setNavOpen(true)}>
              <MdMenu fontSize={20} />
            </button>
          </Hide>
        </Box>
      </Nav>
      {navOpen && (
        <Box
          position="fixed"
          top={0}
          left={0}
          width={"100%"}
          height={"100%"}
          zIndex={50}
          backgroundColor="white"
        >
          <Nav>
            <Link href="/">My Dentist</Link>
            <button onClick={() => setNavOpen(false)}>
              <MdClose fontSize={20} />
            </button>
          </Nav>
          <Grid marginTop={15} gap={5} justifyItems="center">
            <Link href="">About us</Link>
            <Link href="">Contact</Link>
            <Link href="/login" onClick={logout}>
              Logout
            </Link>
          </Grid>
        </Box>
      )}
    </>
  );
};

export { NavbarPatient };

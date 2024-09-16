import { Box, Grid, Heading, Image, Link, Text } from "@chakra-ui/react";
import { Nav } from "../components/Nav";
import { logout } from "./auth/helpers";

function Appointments() {
  return (
    <Box minHeight={"100vh"}>
      <Nav>
        <Grid alignItems={"center"} gap={2}>
          <Link href="/doctor">
            <Image
              width={{ base: 50, md: 100 }}
              objectFit={"cover"}
              borderRadius={"20px"}
              aspectRatio={1}
              src={`http://localhost:3000/${window.localStorage.getItem(
                "user-image"
              )}`}
            />
          </Link>

          <Text fontSize={"20px"} textAlign={"center"} fontWeight={"bold"}>
            {window.localStorage.getItem("user-name")}
          </Text>
        </Grid>
        <Box
          display={"grid"}
          gridAutoFlow={"column"}
          alignItems={"center"}
          gap={{ base: 3, md: 20 }}
        >
          <Link href="/appointments">My Appointments</Link>
          <Link href="">About us</Link>
          <Link href="/login" onClick={logout}>
            Logout
          </Link>
        </Box>
      </Nav>
      <Box paddingX={{ base: "5vw", md: "3vw" }} paddingTop={10}>
        <Heading textAlign={"center"}>My appointments</Heading>
      </Box>
    </Box>
  );
}

export { Appointments };

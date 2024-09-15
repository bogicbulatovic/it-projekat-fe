import { Box, Link, Image, Card, CardBody, Text, Grid } from "@chakra-ui/react";
import { Nav } from "../components/Nav";
import { logout } from "./auth/helpers";
import { useQuery } from "react-query";
import { fetchDentistsAll } from "../fetchers/fetchDentistsAll";
import { div } from "framer-motion/client";

function Patient() {
  const { data: dentists, isLoading } = useQuery({
    queryKey: ["dentistsAll"],
    queryFn: () => fetchDentistsAll(),
  });

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
      <Box
        display={"grid"}
        gridTemplateColumns={"max-content 1fr"}
        alignItems={"center"}
        marginY={"20px"}
        marginX={"20px"}
      >
        <Box>
          <Image src={"/images/ordination.jpg"} />
        </Box>
        {isLoading ? (
          "Loading dentists..."
        ) : (
          <Grid gap={2} alignSelf="start" justifyContent="center">
            {dentists?.map((d, i) => (
              <Card>
                <CardBody>
                  <Text>{d.name}</Text>
                  <Text>{d.email}</Text>
                </CardBody>
              </Card>
            ))}
          </Grid>
        )}
      </Box>
    </Box>
  );
}

export { Patient };

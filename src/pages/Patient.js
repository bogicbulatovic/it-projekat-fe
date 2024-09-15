import {
  Box,
  Image,
  Card,
  CardBody,
  Text,
  Grid,
  Heading,
} from "@chakra-ui/react";
import { useQuery } from "react-query";
import { fetchDentistsAll } from "../fetchers/fetchDentistsAll";
import { NavbarPatient } from "../components/NavbarPatient";

function Patient() {
  const { data: dentists, isLoading } = useQuery({
    queryKey: ["dentistsAll"],
    queryFn: () => fetchDentistsAll(),
  });

  return (
    <Box minHeight={"100vh"}>
      <NavbarPatient />

      <Box paddingY={"20px"} paddingX={"20px"}>
        <Heading size={"lg"} textAlign="center">
          Our team
        </Heading>
        {isLoading ? (
          "Loading dentists..."
        ) : (
          <Grid
            gap={10}
            marginTop={15}
            alignSelf="start"
            justifyContent="center"
            gridTemplateColumns={{ base: "auto", md: "auto auto" }}
          >
            {dentists?.map((d, i) => (
              <Card key={i} maxWidth={"300px"}>
                <CardBody display={"grid"} gap={5}>
                  <Image
                    width={"100%"}
                    margin={"0 auto"}
                    maxWidth={"250px"}
                    objectFit={"contain"}
                    src={
                      d.profile_img
                        ? `http://localhost:3000/${d.profile_img}`
                        : "https://placehold.co/600x400"
                    }
                    alt="profile picture"
                    borderRadius="lg"
                  />
                  <Grid gap={5}>
                    <Text>{d.name}</Text>
                    <Text>{d.email}</Text>
                  </Grid>
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

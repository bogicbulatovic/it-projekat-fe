import {
  Box,
  Grid,
  Heading,
  Image,
  Link,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { Nav } from "../components/Nav";
import { logout } from "./auth/helpers";
import { useQuery } from "react-query";
import { fetchServicesAll } from "../fetchers/fetchServicesAll";

const Doctor = () => {
  const { data: services, isLoading } = useQuery({
    queryKey: ["servicesAll"],
    queryFn: () => fetchServicesAll(),
  });

  return (
    <Box minHeight={"100vh"} paddingBottom={20}>
      <Nav>
        <Grid alignItems={"center"} gap={2}>
          <Image
            width={{ base: 50, md: 100 }}
            objectFit={"cover"}
            borderRadius={"20px"}
            aspectRatio={1}
            src={`http://localhost:3000/${window.localStorage.getItem(
              "user-image"
            )}`}
          />
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
          <Link href="">About us</Link>
          <Link href="/login" onClick={logout}>
            Logout
          </Link>
        </Box>
      </Nav>

      <Box paddingX={{ base: "5vw", md: "3vw" }} paddingTop={10}>
        <Heading textAlign={"center"}>Ordination services</Heading>
      </Box>
      <TableContainer marginTop={10} maxWidth={"600px"} marginX={"auto"}>
        {isLoading ? (
          <Text>Loading...</Text>
        ) : (
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th>Description</Th>
                <Th isNumeric>Price</Th>
              </Tr>
            </Thead>
            <Tbody>
              {services.map((s) => (
                <Tr key={s.id}>
                  <Td>{s.name}</Td>
                  <Td>{s.description}</Td>
                  <Td isNumeric>{s.price}</Td>
                </Tr>
              ))}
              {/* <Tr>
              <Td>inches</Td>
              <Td>millimetres (mm)</Td>
              <Td isNumeric>25.4</Td>
            </Tr>
            <Tr>
              <Td>feet</Td>
              <Td>centimetres (cm)</Td>
              <Td isNumeric>30.48</Td>
            </Tr>
            <Tr>
              <Td>yards</Td>
              <Td>metres (m)</Td>
              <Td isNumeric>0.91444</Td>
            </Tr> */}
            </Tbody>
          </Table>
        )}
      </TableContainer>
    </Box>
  );
};

export { Doctor };

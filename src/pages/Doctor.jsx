import {
  Box,
  Grid,
  Heading,
  Image,
  Link,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  Editable,
  EditableInput,
  EditablePreview,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { Nav } from "../components/Nav";
import { logout } from "./auth/helpers";
import { useQuery } from "react-query";
import { fetchServicesAll } from "../fetchers/fetchServicesAll";
import { MdDelete } from "react-icons/md";
import { useState } from "react";
import { fetchClient } from "../fetchers/fetchClient";

const Doctor = () => {
  const {
    data: _services,
    isLoading,
    refetch: refetchServices,
  } = useQuery({
    queryKey: ["servicesAll"],
    queryFn: () => fetchServicesAll(),
  });

  const [modalOpen, setModalOpen] = useState(false);

  const [newService, setNewService] = useState({
    name: "",
    description: "",
    price: "",
  });

  const handleNewSeviceChange = (e) => {
    setNewService({ ...newService, [e.target.name]: e.target.value });
  };

  const [searchName, setSearchName] = useState("");

  const services = _services?.filter((s) =>
    searchName
      ? s.name.toLowerCase().startsWith(searchName.toLowerCase())
      : true
  );

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
          <Link href="#">My Appointments</Link>
          <Link href="">About us</Link>
          <Link href="/login" onClick={logout}>
            Logout
          </Link>
        </Box>
      </Nav>

      <Box
        paddingX={{ base: "5vw", md: "3vw" }}
        width={"100vw"}
        paddingTop={10}
      >
        <Heading textAlign={"center"}>Ordination services</Heading>

        <FormControl maxWidth={"250px"} marginX={"auto"} marginTop={10}>
          <FormLabel>Search name</FormLabel>
          <Input
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
          />
        </FormControl>
        <TableContainer
          marginTop={5}
          width={"100%"}
          maxWidth={"600px"}
          marginX={"auto"}
        >
          {isLoading ? (
            <Text>Loading...</Text>
          ) : (
            <Table variant="simple" colorScheme="teal">
              <Thead>
                <Tr>
                  <Th textAlign={"center"}>Name</Th>
                  <Th textAlign={"center"}>Description</Th>
                  <Th textAlign={"center"}>Price</Th>
                  <Th textAlign={"center"}>Delete</Th>
                  <Th textAlign={"center"} display={"none"}>
                    Id
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {services.map((s) => (
                  <Tr key={s.id}>
                    <Td width={"200px"}>
                      <Editable defaultValue={s.name}>
                        <EditablePreview />
                        <EditableInput />
                      </Editable>
                    </Td>
                    <Td width={"200px"}>
                      <Editable defaultValue={s.description}>
                        <EditablePreview />
                        <EditableInput />
                      </Editable>
                    </Td>
                    <Td width={"200px"} textAlign={"center"}>
                      <Editable defaultValue={s.price}>
                        <EditablePreview />
                        <EditableInput />
                      </Editable>
                    </Td>
                    <Td>
                      <button
                        onClick={async () => {
                          await fetchClient("/services/" + s.id, {
                            method: "DELETE",
                          });
                          await refetchServices();
                        }}
                        style={{
                          display: "flex",
                          width: "100%",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <MdDelete fontSize={20} />
                      </button>
                    </Td>
                    <Td display={"none"}>{s.id}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          )}
          <Box
            marginY={"20px"}
            display={"grid"}
            gridTemplateColumns={{ base: "1fr", md: "1fr 1fr 1fr 1fr" }}
            gap={{ base: 5, md: 2 }}
          >
            <Button
              colorScheme="teal"
              variant="outline"
              onClick={() => setModalOpen(true)}
            >
              Add new service
            </Button>
            <Button
              colorScheme="blue"
              onClick={async () => {
                const tableEl = document.querySelector("table");
                const rowsEl = Array.from(tableEl.querySelectorAll("tbody tr"));

                await Promise.all(
                  rowsEl.map((r) => {
                    const name = r.querySelector("td:nth-of-type(1)").innerText;
                    const description =
                      r.querySelector("td:nth-of-type(2)").innerText;
                    const price =
                      r.querySelector("td:nth-of-type(3)").innerText;
                    const id = r.querySelector("td:nth-of-type(5)").innerText;

                    return fetchClient("/services/" + id, {
                      method: "PUT",
                      contentType: "application/json",
                      body: JSON.stringify({
                        name,
                        description,
                        price,
                      }),
                    });
                  })
                );

                window.alert("Database updated");
              }}
            >
              Save
            </Button>
          </Box>
        </TableContainer>
      </Box>

      <Modal
        blockScrollOnMount={false}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>New service</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input
                value={newService.name}
                name="name"
                onChange={handleNewSeviceChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Description</FormLabel>
              <Input
                value={newService.description}
                name="description"
                onChange={handleNewSeviceChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Price</FormLabel>
              <Input
                type="number"
                maxWidth={"70px"}
                value={newService.price}
                name="price"
                onChange={handleNewSeviceChange}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              marginX={"auto"}
              onClick={async () => {
                await fetchClient("/services", {
                  method: "POST",
                  contentType: "application/json",
                  body: JSON.stringify({
                    name: newService.name,
                    description: newService.description,
                    price: newService.price,
                  }),
                });
                await refetchServices();
                setModalOpen(false);
                setNewService({
                  name: "",
                  description: "",
                  price: "",
                });
              }}
            >
              Add
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export { Doctor };

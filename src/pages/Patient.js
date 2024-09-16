import {
  Box,
  Image,
  Card,
  CardBody,
  Text,
  Grid,
  Heading,
  Select,
  FormControl,
  FormLabel,
  Input,
  Button,
} from "@chakra-ui/react";
import { useQuery } from "react-query";
import { fetchDentistsAll } from "../fetchers/fetchDentistsAll";
import { NavbarPatient } from "../components/NavbarPatient";
import { fetchServicesAll } from "../fetchers/fetchServicesAll";
import { useState } from "react";
import { fetchClient } from "../fetchers/fetchClient";

function Patient() {
  const { data: dentists, isLoading } = useQuery({
    queryKey: ["dentistsAll"],
    queryFn: () => fetchDentistsAll(),
  });

  const { data: services } = useQuery({
    queryKey: ["servicesAll"],
    queryFn: () => fetchServicesAll(),
  });

  const [values, setValues] = useState({
    service: "",
    datetime: "",
    dentistId: "",
  });

  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const service = services.find((s) => s.name === values.service);

    try {
      setSubmitting(true);
      await fetchClient("/appointments", {
        method: "POST",
        contentType: "application/json",
        body: JSON.stringify({
          total_price: service.price,
          date: values.datetime,
          dentistId: values.dentistId,
        }),
      });
      setSubmitting(false);
    } catch (err) {
      console.error(err);
      window.alert(err);
      setSubmitting(false);
    }
  };

  return (
    <Box minHeight={"100vh"}>
      <NavbarPatient />

      <Box paddingY={"20px"} paddingX={"20px"} paddingBottom={50}>
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

        <Heading fontSize={20} marginTop={20} textAlign={"center"}>
          Schedule appointment
        </Heading>

        <form
          style={{
            maxWidth: "500px",
            margin: "0 auto",
            paddingTop: "30px",
            display: "grid",
            gap: 20,
          }}
          onSubmit={handleSubmit}
        >
          <FormControl>
            <FormLabel>Choose service</FormLabel>
            <Select
              placeholder="Select service"
              borderColor="black.300"
              required
              name="service"
              value={values.service}
              onChange={handleChange}
            >
              {services?.map((s) => (
                <option key={s.name} value={s.name}>
                  {s.name} ${s.price}
                </option>
              ))}
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel>Select time</FormLabel>
            <Input
              required
              name="datetime"
              value={values.datetime}
              onChange={handleChange}
              type="datetime-local"
            />
          </FormControl>
          <FormControl>
            <FormLabel>Choose dentist</FormLabel>
            <Select
              name="dentistId"
              value={values.dentistId}
              onChange={handleChange}
              placeholder="Select dentist"
              borderColor="black.300"
              required
            >
              {dentists?.map((d, i) => (
                <option key={i} value={d.id}>
                  {d.name}
                </option>
              ))}
            </Select>
          </FormControl>
          <Button
            type="submit"
            bgColor="teal.200"
            width={"max-content"}
            minWidth={"200px"}
            marginX={"auto"}
            disabled={submitting}
            opacity={submitting ? 0.5 : 1}
          >
            {submitting ? "Submitting..." : "Submit"}
          </Button>
        </form>
      </Box>
    </Box>
  );
}

export { Patient };

import { Box, Heading, Link, Card, CardBody, Text } from "@chakra-ui/react";
import { Nav } from "../components/Nav";

function Homepage() {
  return (
    <Box minHeight={"100vh"}>
      <Nav>
        <Link href="/">My Dentist</Link>
        <Box
          display={"grid"}
          gridAutoFlow={"column"}
          alignItems={"center"}
          gap={{ base: 5, md: 10, lg: 20 }}
        >
          <Link href="/login">Login</Link>
          <Link href="/register">Register</Link>
        </Box>
      </Nav>
      <Box
        bgImage="url('/images/dental-clinic-landing.jpg')" // Replace with your background image URL
        bgSize="cover"
        bgPosition="center"
        height={"1000px"}
        maxHeight={"80vh"}
        position={"relative"}
      >
        <Box height={"100%"} background={"black"} opacity={0.5} />
        <Box
          paddingX={"5vw"}
          paddingY={"30px"}
          position={"absolute"}
          width={"100%"}
          height={"100%"}
          left={0}
          top={0}
        >
          <Heading color={"white"} fontSize={{ base: 50, md: 80, lg: 100 }}>
            THE SMILE <br /> YOU'VE ALWAYS <br /> WANTED
          </Heading>
        </Box>
      </Box>
      <Box
        display={"grid"}
        gridTemplateColumns={{ base: "auto", md: "auto auto auto" }}
        alignItems={"center"}
        paddingX={10}
        paddingY={5}
      >
        <Card maxW="sm">
          <CardBody>
            <Heading marginBottom={"10px"}>My Dentist</Heading>
            <Text>Choose My Dentist quality of dental services</Text>
            <Text>Welcome to My Dentist</Text>
          </CardBody>
        </Card>
        <Card maxW="sm">
          <CardBody>
            <Heading marginBottom={"10px"}>Adress and contact</Heading>
            <Text>Ulica 46, Niksic</Text>
            <Text>E-mail: office@my_dentist.net</Text>
            <Text>Telephone: +38267890098</Text>
          </CardBody>
        </Card>
        <Card maxW="sm">
          <CardBody>
            <Heading marginBottom={"10px"}>Working hours</Heading>
            <Text>Monday - Friday</Text>
            <Text>From 12h to 20h</Text>
            <Text>On workdays</Text>
          </CardBody>
        </Card>
      </Box>
    </Box>
  );
}

export { Homepage };

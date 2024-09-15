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
          gap={20}
        >
          <Link href="/login">Login</Link>
          <Link href="regiser">Register</Link>
        </Box>
      </Nav>
      <Box
        bgImage="url('/images/dental-clinic-landing.jpg')" // Replace with your background image URL
        bgSize="cover"
        bgPosition="center"
        height={"1000px"}
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
          <Heading color={"white"} fontSize={100}>
            THE SMILE <br /> YOU'VE ALWAYS <br /> WANTED
          </Heading>
        </Box>
      </Box>
      <Box
        as={"nav"}
        minHeight={70}
        display={"grid"}
        gridAutoFlow={"column"}
        alignItems={"center"}
        paddingX={10}
        paddingY={5}
      >
        <Card maxW="sm">
          <CardBody>
            <Heading>My Dentist</Heading>
            <Text>Choose My Dentist quality of dental services</Text>
            <Text>Welcome to My Dentist</Text>
          </CardBody>
        </Card>
        <Card maxW="sm">
          <CardBody>
            <Heading>Adress and contact</Heading>
            <Text>Ulica 46, Niksic</Text>
            <Text>E-mail: office@my_dentist.net</Text>
            <Text>Telephone: +38267890098</Text>
          </CardBody>
        </Card>
        <Card maxW="sm">
          <CardBody>
            <Heading>Working hours</Heading>
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

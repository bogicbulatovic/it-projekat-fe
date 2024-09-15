import { useState } from "react";
import axios from "axios";
import {
  Container,
  FormControl,
  FormLabel,
  Grid,
  Input,
  Heading,
  Button,
  Link,
  Box,
} from "@chakra-ui/react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post("http://localhost:3000/login", {
        email,
        raw_password: password,
      });

      const { success, token, role } = response.data;

      if (success && token) {
        localStorage.setItem("user-token", token);
        localStorage.setItem("user-role", role);
        if (role === "patient") {
          window.location.href = "/patient";
        } else if (role === "dentist") {
          window.location.href = "/doctor";
        }
      }
    } catch (error) {
      setError("Invalid email or password");
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Box
      minHeight={"100vh"}
      bgImage="url('/images/dental-clinic.jpg')" // Replace with your background image URL
      bgSize="cover"
      bgPosition="center"
      paddingTop={50}
    >
      <Container
        maxW="md"
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        padding={20}
        bgColor={"#b2f5eadb"}
        borderRadius={20}
      >
        <Heading size={"xl"}>Login</Heading>

        <form style={{ marginTop: 40 }} onSubmit={handleSubmit}>
          <Grid gap={5}>
            <FormControl htmlFor="email">
              <FormLabel>Email address</FormLabel>
              <Input
                borderColor="black.300"
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="password">Password</FormLabel>
              <Input
                borderColor="black.300"
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </FormControl>
          </Grid>
          {error && <p className="error">{error}</p>}
          <Button
            type="submit"
            marginTop={5}
            marginX={"auto"}
            disabled={loading}
            display="block"
          >
            {loading ? "Logging in..." : "Login"}
          </Button>
        </form>

        <Link href="/register" color="blue" marginTop={10}>
          Go to register.
        </Link>
      </Container>
    </Box>
  );
}

export default Login;

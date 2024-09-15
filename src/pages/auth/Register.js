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
  Select,
} from "@chakra-ui/react";

function Register() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post("http://localhost:3000/register", {
        email,
        name,
        role,
        raw_password: password,
      });

      const { success, token } = response.data;

      if (success && token) {
        localStorage.setItem("user-token", token);
        localStorage.setItem("user-role", role);
        window.location.href = "/login";
      }
    } catch (error) {
      setError("Registration failed. Please check your details and try again.");
      console.error("Registration error:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container
      maxW="md"
      minHeight={"100vh"}
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      padding={20}
      paddingTop={50}
    >
      <Heading size={"xl"}>Register</Heading>

      <form style={{ marginTop: 40 }} onSubmit={handleSubmit}>
        <Grid gap={5}>
          <FormControl htmlFor="email">
            <FormLabel>Email address</FormLabel>
            <Input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="name">Name</FormLabel>
            <Input
              type="name"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </FormControl>
          <Select
            placeholder="Select role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          >
            <option value="patient">Patient</option>
            <option value="dentist">Dentist</option>
          </Select>
          <FormControl>
            <FormLabel htmlFor="password">Password</FormLabel>
            <Input
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
          {loading ? "Logging in..." : "Register"}
        </Button>
      </form>

      <Link href="/login" color="blue" marginTop={10}>
        Go to login.
      </Link>
    </Container>
  );
}

export default Register;

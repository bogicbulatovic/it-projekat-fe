import { useState } from "react";
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
  Image,
  Box,
} from "@chakra-ui/react";
import { fetchRegister } from "../../fetchers/fetchRegister";

function Register() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState("");
  const [imageSrc, setImageSrc] = useState("");
  const [imageFile, setImageFile] = useState();

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const data = await fetchRegister({
        email,
        name,
        role,
        raw_password: password,
        imageFile,
      });

      const { success, token } = data;

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
    <Box
      minHeight={"100vh"}
      bgImage="url('/images/dental-clinic.jpg')" // Replace with your background image URL
      bgSize="cover"
      bgPosition="center"
      paddingTop={50}
      paddingX={"5vw"}
      paddingBottom={50}
    >
      <Container
        maxW="md"
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        paddingY={10}
        paddingX={{ base: "5vw" }}
        bgColor={"#b2f5eadb"}
        borderRadius={20}
      >
        <Heading size={"xl"}>Register</Heading>

        <form
          style={{ marginTop: 40, maxWidth: "215px" }}
          onSubmit={handleSubmit}
        >
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
              <FormLabel htmlFor="name">Name</FormLabel>
              <Input
                borderColor="black.300"
                type="name"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </FormControl>
            <Select
              placeholder="Select role"
              borderColor="black.300"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <option value="patient">Patient</option>
              <option value="dentist">Dentist</option>
            </Select>
            {role === "dentist" && (
              <FormControl width={"100%"}>
                <FormLabel>Upload profile picture</FormLabel>
                <Input
                  borderColor="black.300"
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      setImageFile(file);
                      const reader = new FileReader();

                      reader.onload = function (e) {
                        setImageSrc(e.target.result);
                      };

                      reader.readAsDataURL(file);
                    }
                  }}
                />
              </FormControl>
            )}

            {imageSrc && (
              <Image src={imageSrc} maxWidth={"200px"} objectFit={"contain"} />
            )}

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
            {loading ? "Logging in..." : "Register"}
          </Button>
        </form>

        <Link href="/login" color="blue" marginTop={10}>
          Go to login.
        </Link>
      </Container>
    </Box>
  );
}

export default Register;

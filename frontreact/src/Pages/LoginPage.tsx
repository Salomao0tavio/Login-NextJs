import React, { useState, useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';
import {
  Flex,
  Heading,
  Input,
  Button,
  InputGroup,
  Stack,
  InputLeftElement,
  chakra,
  Box,
  Link,
  Avatar,
  FormControl,
  FormHelperText,
  InputRightElement
} from "@chakra-ui/react";
import { FaUserAlt, FaLock } from "react-icons/fa";
import '../index.css'

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

// URL base da API
const API_BASE_URL = 'https://localhost:7063';

// Definição da estrutura dos dados do usuário
interface UserData {
  id: number;
  name?: string | null;
  email?: string | null;
  password?: string | null;
  role?: string | null;
}

// Componente principal da aplicação
const App: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState<UserData | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleShowClick = () => setShowPassword(!showPassword);

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post<{ token: string }>(
        `${API_BASE_URL}/login`,
        {
          name: username,
          password
        }
      );
      const { token } = response.data;
      setToken(token);
      localStorage.setItem('token', token);
    } catch (error) {
      console.error('Erro no login:', error);
    }
  };

  const fetchData = async () => {
    try {
      const response: AxiosResponse<UserData> = await axios.get(
        `${API_BASE_URL}/authenticated`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setData(response.data);
    } catch (error) {
      console.error('Erro ao obter dados:', error);
    }
  };

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  return (
    <Flex
      flexDirection="column"
      width="100wh"
      height="100vh"
      backgroundColor="gray.200"
      justifyContent="center"
      alignItems="center"
    >
      <Stack
        flexDir="column"
        mb="2"
        justifyContent="center"
        alignItems="center"
      >
        <Avatar />
        <Heading color="teal.400">Welcome</Heading>
        <Box minW={{ base: "90%", md: "468px" }}>
          <form onSubmit={login}>
            <Stack
              spacing={4}
              p="1rem"
              backgroundColor="whiteAlpha.900"
              boxShadow="md"
            >
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<CFaUserAlt color="gray.300" />}
                  />
                  <Input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    color="gray.300"
                    children={<CFaLock color="gray.300" />}
                  />
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                      {showPassword ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <FormHelperText textAlign="right">
                  <Link href="#">forgot password?</Link>
                </FormHelperText>
              </FormControl>
              <Button
                borderRadius={0}
                type="submit"
                variant="solid"
                colorScheme="teal"
                width="full"
              >
                Login
              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
      <Box>
        New to us?{" "}
        <Link color="teal.500" href="#">
          Sign Up
        </Link>
      </Box>
    </Flex>
  );
};

export default App;

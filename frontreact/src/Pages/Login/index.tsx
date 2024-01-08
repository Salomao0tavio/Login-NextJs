import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Center,
  VStack,
  Heading,
  Input,
  Button,
  InputGroup,
  InputLeftElement,
  Box,
  FormControl,
  FormHelperText,
  InputRightElement,
  chakra,
  Avatar,
  Link
} from "@chakra-ui/react";
import { FaUserAlt, FaLock } from "react-icons/fa";

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

const API_BASE_URL = 'http://localhost:5023';

interface User {
  id: number;
  name?: string | null;
  email?: string | null;
  password?: string | null;
  role?: string | null;
}

const Login: React.FC = () => {
  // Estado para controlar a visibilidade da senha
  const [showPassword, setShowPassword] = useState(false);

  // Estado para armazenar os dados do usuário, token, email e senha
  const [data, setData] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Função para alternar a visibilidade da senha
  const handleShowClick = () => setShowPassword(!showPassword);

  // Função para enviar solicitação de login
  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post<{ token: string }>(
        `${API_BASE_URL}/login`,
        {
          email,
          password,
        }
      );

      const { token } = response.data;
      setToken(token);
      localStorage.setItem('token', token);
      fetchData(); // Chama fetchData após o login bem-sucedido
    } catch (error) {
      console.error('Erro no login:', error);
    }
  };

  // Função para buscar dados autenticados do usuário
  const fetchData = async () => {
    try {
      const response = await axios.get<User>(
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

  // Efeito que é executado ao carregar a página para verificar se existe um token no localStorage
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
      fetchData(); // Chama fetchData ao carregar a página se o token estiver armazenado
    }
  }, []);

  return (

    <Center minH="100vh" backgroundColor="gray.100">

      <VStack
        spacing={4}
        align="center"
        bg="whiteAlpha.900"
        boxShadow="md"
        borderRadius="md"
        p={8}
        w={['100%', '80%', '60%', '40%']}
      >
        <Avatar /> {/* Componente Avatar */}
        <Heading color="teal.400" mt={2} mb={2}>
          Dados
        </Heading>
        {/* Formulário de login */}
        <form onSubmit={login} style={{ width: '100%' }}>
          <VStack spacing={4} w="100%">
            {/* Campo de email */}
            <FormControl>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={<CFaUserAlt color="gray.300" />}
                />
                <Input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </InputGroup>
            </FormControl>
            {/* Campo de senha */}
            <FormControl>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  color="gray.300"
                  children={<CFaLock color="gray.300" />}
                />
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {/* Botão para mostrar/ocultar senha */}
                <InputRightElement width="4.5rem">
                  <Button
                    h="1.75rem"
                    size="sm"
                    onClick={handleShowClick}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </Button>
                </InputRightElement>
              </InputGroup>
              {/* Link 'Esqueceu a senha?' */}
              <FormHelperText textAlign="right">
                <Link color="teal.500" href='#'>Esqueceu a senha?</Link>
              </FormHelperText>
            </FormControl>
            {/* Botão de login */}
            <Button
              borderRadius={0}
              type="submit"
              variant="solid"
              colorScheme="teal"
              w="100%"
            >
              Login
            </Button>
          </VStack>
        </form>
        {/* Link para cadastro de novos usuários */}
        <Box>
          Novo?{" "}
          <Link color="teal.500" href='/Registrar'>
            Cadastre-se
          </Link>
        </Box>
      </VStack>
    </Center>
  );
};

export default Login;

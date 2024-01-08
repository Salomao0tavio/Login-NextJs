// index.tsx ou App.tsx
import React from 'react';
import ReactDOM from 'react-dom';
// Aqui é onde você define o componente principal do seu aplicativo
import Login from './Pages/Login';
import { ChakraProvider } from '@chakra-ui/react';

ReactDOM.render(
  <ChakraProvider>
    <Login />
  </ChakraProvider>,
  document.getElementById('root')
);

// Home.tsx
import React from 'react';
import { Link } from 'react-router-dom'; // Se estiver usando React Router

const Home: React.FC = () => {
  return (
    <div>
      <h1>Bem-vindo à Página Inicial</h1>
      <Link to="../Login">Ir para Login</Link> {/* Link para a página de Login */}
      <Link to="../Cadastro">Ir para Cadastro</Link> {/* Link para a página de Cadastro */}
    </div>
  );
};

export default Home;

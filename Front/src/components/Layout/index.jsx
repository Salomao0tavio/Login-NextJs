import React from 'react';
import { Layout, Flex } from 'antd';
import { layoutStyle, headerStyle, contentStyle, footerStyle } from './styles'; // Importe os estilos corretamente

const { Header, Footer, Content } = Layout;

const App = ({ children, title = 'B2B' }) => (
  <Flex gap="middle" wrap="wrap">
    <Layout style={layoutStyle}>        
      <Header style={headerStyle}>
        NavBar
      </Header>
      <Content style={contentStyle}>
        {children}
      </Content>
      <Footer style={footerStyle}>
        Footer
      </Footer>
    </Layout>
  </Flex>
);

export default App;

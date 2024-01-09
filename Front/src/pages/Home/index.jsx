import { Row, Col, Typography, Button } from 'antd';
import Link from 'next/link';
import App from '../../components/Layout/index';

const { Title, Paragraph } = Typography;

const Home = () => {
    return (
        <App>
            <Row justify="center" align="middle" style={{ minHeight: '100vh' }}>
                <Col span={12} style={{
                    textAlign: 'center',
                    backgroundColor: 'white',
                    borderRadius: '10px',
                    padding: "1rem"
                }}>
                    <Title level={2}>Bem-vindo à Página Inicial</Title>
                    <Paragraph>
                        Esta é uma página inicial simples usando Ant Design com Next.js.
                    </Paragraph>
                    <Link href="/Login" passHref>
                        <Button type="primary">Ir para a Página de Login</Button>
                    </Link>
                </Col>
            </Row>
        </App>
    );
};

export default Home;

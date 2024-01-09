import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { Input, Button, Form, Row, Col, Typography, message } from 'antd';
import { UserOutlined, LockOutlined, EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import App from '../../components/Layout/index';

const { Title, Text } = Typography;

const API_BASE_URL = 'http://localhost:5023';

const Login = () => {
  const router = useRouter();
  const [token, setToken] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const login = async (values) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/login`, {
        email: values.email,
        password: values.password,
      });

      const { token } = response.data;
      setToken(token);
      localStorage.setItem('token', token);

      // Se o login for bem-sucedido, redirecione para '/logado'
      router.push('/Home');
    } catch (error) {
      console.error('Login Error:', error);
      message.error('Usuario ou Senha invalidos, Tente novamente.');
    }
  };

  const fetchData = async () => {
    try {
      const storedToken = localStorage.getItem('token');
      if (storedToken) {
        setToken(storedToken);
        const response = await axios.get(`${API_BASE_URL}/authenticated`, {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        });
        // Lógica para manipular a resposta aqui
      }
    } catch (error) {
      console.error('Fetch Data Error:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <App>
      <Row justify="center" align="middle" style={{ minHeight: '100vh' }}>
        <Col xs={24} sm={20} md={16} lg={12} xl={8} xxl={6}>
          <div style={{ padding: '20px', backgroundColor: '#fff', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', borderRadius: '10px' }}>
            <Title level={2} style={{ textAlign: 'center' }}>Login</Title>
            <Form
              onFinish={login}
              style={{ marginTop: '20px' }}
              initialValues={{ email: '', password: '' }}
            >
              <Form.Item
                name="email"
                rules={[
                  { required: true, message: 'Please input your email!' },
                  { type: 'email', message: 'Please enter a valid email!' },
                ]}
              >
                <Input prefix={<UserOutlined />} placeholder="Email" />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
              >
                <Input.Password
                  prefix={<LockOutlined />}
                  placeholder="Password"
                  iconRender={(visible) =>
                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                  }
                />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" block>
                  Login
                </Button>
              </Form.Item>
              <Form.Item style={{ textAlign: 'center' }}>
                <Row justify="center">
                  <Text style={{ marginRight: '8px' }}>
                    <h5 style={{ display: 'inline', marginBottom: '5px' }}>
                      Novo aqui?
                    </h5>
                  </Text>
                  <Button type="primary" href="/Cadastro" style={{ color: "white" }}>
                    Cadastre-se
                  </Button>
                </Row>
              </Form.Item>
            </Form>
          </div>
        </Col>
      </Row>
    </App>
  );
};

export default Login;
import React from 'react';
import { Form, Input, Button, Row, Col, Typography } from 'antd';
import App from '../../components/Layout/index';
import axios from 'axios';
import { useRouter } from 'next/router';

const { Title } = Typography;

const API_BASE_URL = 'http://localhost:5023';

const RegistrationPage = () => {
  const router = useRouter();
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    console.log('Received values:', values);
    try {
      const userDTO = {
        id: null,
        name: values.name,
        email: values.email,
        password: values.password,
        role: null,
      };

      const response = await axios.post(`${API_BASE_URL}/usuario`, userDTO);

      router.push('/Login');
    } catch (error) {
      console.error('Login Error:', error);
    }
  };

  return (
    <App>
      <Row justify="center" align="middle" style={{ minHeight: '100vh' }}>
        <Col xs={24} sm={20} md={16} lg={12} xl={8}>
          <div style={{ width: '100%', padding: '20px', backgroundColor: '#fff', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', borderRadius: '10px' }}>
            <Title level={2} style={{ textAlign: 'center', marginBottom: '20px' }}>Registrar Usuário</Title>
            <Form
              form={form}
              name="register"
              onFinish={onFinish}
              scrollToFirstError
            >
              <Form.Item
                name="name"
                label="Nome"
                rules={[
                  {
                    required: true,
                    message: 'Por favor, insira seu nome!',
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="email"
                label="E-mail"
                rules={[
                  {
                    type: 'email',
                    message: 'Insira um e-mail válido!',
                  },
                  {
                    required: true,
                    message: 'Por favor, insira seu e-mail!',
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="password"
                label="Senha"
                rules={[
                  {
                    required: true,
                    message: 'Por favor, insira sua senha!',
                  },
                  {
                    min: 8,
                    message: 'A senha deve ter no mínimo 8 caracteres!',
                  },
                  {
                    max: 20,
                    message: 'A senha deve ter no máximo 20 caracteres!',
                  },
                  {
                    pattern: /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
                    message: 'A senha deve conter pelo menos uma letra maiúscula, um número e um símbolo!',
                  },
                ]}
                hasFeedback
              >
                <Input.Password />
              </Form.Item>
              <Form.Item
                name="confirm"
                label="Confirmar Senha"
                dependencies={['password']}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: 'Por favor, confirme sua senha!',
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error('As senhas não coincidem!'));
                    },
                  }),
                ]}
              >
                <Input.Password />
              </Form.Item>
              <Form.Item style={{ textAlign: 'center' }}>
              <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                  Registrar
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Col>
      </Row>
    </App>
  );
};

export default RegistrationPage;
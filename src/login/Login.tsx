import React, { useContext, useState } from 'react';
import { Button, Checkbox, Form, Input, Alert, Space } from 'antd';
import jwtDecode from 'jwt-decode';
import { AppContext } from '../context/AppContext';
import { login } from '../services/api';

interface FormValues {
  username: string;
  password: string;
  remember: boolean;
}

interface DecodedToken {
  roles: string;
  sub: string;
  // Agrega otras propiedades si es necesario
}

const Login: React.FC = () => {
  const appContext = useContext(AppContext);

  if (!appContext) {
    throw new Error("Contexto no proporcionado");
  }

  const { setRoles, setLoggedIn, setUser } = appContext;
  const [errores, setErrores] = useState<boolean>(false);

  const onFinish = async (values: FormValues) => {
    try {
      const credentials = {
        email: values.username,
        password: values.password,
      };

      const data = await login(credentials);

      document.cookie = `token=${data.token};max-age=${60 * 60 * 3}; path=/; samesite=strict`;
      const decodedToken = jwtDecode<DecodedToken>(data.token);
      setRoles(decodedToken.roles);
      setUser(decodedToken.sub);
      setLoggedIn(true);
    } catch (error) {
      setErrores(true);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    
  };

  return (
    <>
     <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', paddingLeft:"500px"}}>
     <div className='login-box' style={{backgroundColor: 'white'}}>
      <Form
        name="login-form"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600, width: '300px' }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Email"
          name="username"
          rules={[
            {
              required: true,
              message: 'Ingrese su email',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Contraseña"
          name="password"
          rules={[
            {
              required: true,
              message: 'Ingrese su contraseña',
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>

      <div className="image-container">
        <img src={"https://pbs.twimg.com/profile_images/1081188968887136256/0KNtPI1U_400x400.jpg"} alt="Imagen de inicio de sesión" />
      </div>
      </div>

      <Space direction="vertical" style={{ width: '100%' }}>
        {errores && (
          <Alert message="Error" description="Error de usuario." type="error" showIcon />
        )}
      </Space>
      </div>
    </>
  );
};

export default Login;

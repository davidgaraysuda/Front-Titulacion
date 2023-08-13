import React, { useState } from 'react';
import { Button, Form, Input, Modal } from 'antd';
import { api } from '../../services/api';

interface FormValues {
  name: string;
  email: string;
  message: string;
}

const CareerNew: React.FC = () => {
  const [open, setVisible] = useState(false);
  const [form] = Form.useForm();

  const handleOpenModal = () => {
    setVisible(true);
  };

  const handleCloseModal = () => {
    setVisible(false);
  };

  const handleFormSubmit = (values: FormValues) => {
    api('/carreras', 'POST', values)
    .then(data => {
      handleCloseModal();
      form.resetFields();
    })
    .catch(error => {
      console.error(error);
    });
  };

  return (
    <>
    <Button type="primary" onClick={handleOpenModal}>
        New
      </Button>
      <Modal open={open} onCancel={handleCloseModal} footer={null}>
        <Form form={form} onFinish={handleFormSubmit} style={{paddingTop:'30px'}}>
          <Form.Item
            name="name"
            label="Nombre de la carrera"
            rules={[{ required: true, message: 'Ingresar el nombre de la carrera' }]}
          >
            <Input/>
          </Form.Item>
          <Form.Item
            name="coordinator"
            label="Nombre del coordinador de carrera"
            
          >
            <Input/>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default CareerNew;

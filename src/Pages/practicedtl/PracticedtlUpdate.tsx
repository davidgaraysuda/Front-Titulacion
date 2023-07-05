import React, { useState } from 'react';
import { Button, Form, Input, Modal } from 'antd';

interface FormValues {
  name: string;
  email: string;
  message: string;
}

const PracticedtlUpdate: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();

  const handleOpenModal = () => {
    setVisible(true);
  };

  const handleCloseModal = () => {
    setVisible(false);
  };

  const handleFormSubmit = (values: FormValues) => {
    fetch('http://localhost:8081/practicedtl', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
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
        Edit
      </Button>
      <Modal visible={visible} onCancel={handleCloseModal} footer={null}>
      <Form form={form} onFinish={handleFormSubmit}>
        <Form.Item
            name="actualDate"
            label="Fecha de la practica"
            rules={[{ required: true, message: 'Please enter your name' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="startTime"
            label="Hora de Entrada"
            rules={[{ required: true, message: 'Please enter your email' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="endTime"
            label="Hora de Salida"
            rules={[{ required: true, message: 'Please enter your email' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="totalHours"
            label="Total de horas"
            rules={[{ required: true, message: 'Please enter your email' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="practiceId"
            label="Practica destinada"
            rules={[{ required: true, message: 'Please enter a message' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="tutorId"
            label="Tutor Empresarial"
            rules={[{ required: true, message: 'Please enter a message' }]}
          >
            <Input />
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

export default PracticedtlUpdate;

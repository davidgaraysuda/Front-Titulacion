import React, { useState } from 'react';
import { Button, Form, Input, Modal } from 'antd';

interface FormValues {
  name: string;
  email: string;
  message: string;
}

const SAgreementUpdate: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();

  const handleOpenModal = () => {
    setVisible(true);
  };

  const handleCloseModal = () => {
    setVisible(false);
  };

  const handleFormSubmit = (values: FormValues) => {
    fetch('http://localhost:8081/specifics', {
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
            name="sAgreementId"
            label="Convenio"
            rules={[{ required: true, message: 'Please enter your name' }]}
          >
            <Input type='date'/>
          </Form.Item>
          <Form.Item
            name="careerId"
            label="Carrera"
            rules={[{ required: true, message: 'Please enter your email' }]}
          >
            <Input type='date'/>
          </Form.Item>
          <Form.Item
            name="status"
            label="Estado"
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

export default SAgreementUpdate;

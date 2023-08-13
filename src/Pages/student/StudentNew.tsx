import React, { useState } from 'react';
import { Button, Form, Input, Modal, Select } from 'antd';
import ForeignKeySelect from '../../components/ForeingKeySelect'
import { api } from '../../services/api';

interface FormValues {
  name: string;
  email: string;
  message: string;
}


const StudentNew: React.FC = () => {
  const [open, setVisible] = useState(false);
  const [form] = Form.useForm();

  const handleOpenModal = () => {
    setVisible(true);
  };

  const handleCloseModal = () => {
    setVisible(false);
  };

  const handleForeignKeyChange = (value: number) => {
  };


  const handleFormSubmit = (values: FormValues) => {

    api('/students', 'POST', values)
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
            name="nui"
            label="Cedula"
            rules={[{ required: true, message: 'Please enter your name' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="name"
            label="Nombres"
            rules={[{ required: true, message: 'Please enter your email' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="lastname"
            label="Apellidos"
            rules={[{ required: true, message: 'Please enter your email' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Mail"
            rules={[{ required: true, message: 'Please enter a message' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="phone"
            label="Celular"
            rules={[{ required: true, message: 'Please enter a message' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="careerId"
            label="Carrera"
          >
            <ForeignKeySelect onChange={handleForeignKeyChange} section={'carreras'}/>
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

export default StudentNew;

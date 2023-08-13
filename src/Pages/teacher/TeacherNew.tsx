import React, { useState } from 'react';
import { Button, Form, Input, Modal, Select } from 'antd';
import ForeignKeyCareer from '../../components/ForeingKeySelect';
import { api } from '../../services/api';

interface FormValues {
  name: string;
  email: string;
  message: string;
}

const TeacherNew: React.FC = () => {
  const [open, setVisible] = useState(false);
  const [form] = Form.useForm();

  const handleOpenModal = () => {
    setVisible(true);
  };

  const handleCloseModal = () => {
    setVisible(false);
  };

  const handleForeignKeyChange = (value: number) => {
    // Aquí puedes realizar acciones con el valor seleccionado
  };

  const handleFormSubmit = (values: FormValues) => {
    api('/teachers', 'POST', values)
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
            label="Nombre del tutor"
            rules={[{ required: true, message: 'Ingresar nombre del Tutor Academico' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="phone"
            label="Numero de teléfono"
            rules={[{ required: true, message: 'Ingresar numero de contacto del Tutor' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="careerId"
            label="Carrera"
          >
            <ForeignKeyCareer onChange={handleForeignKeyChange} section={'carreras'}/>
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

export default TeacherNew;

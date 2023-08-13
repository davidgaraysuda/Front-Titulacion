import React, { useState } from 'react';
import { Button, Form, Input, Modal } from 'antd';
import ForeignKeySelect from '../../components/ForeingKeySelect';
import { api } from '../../services/api';

interface FormValues {
  name: string;
  email: string;
  message: string;
}

const ActivityNew: React.FC = () => {
  const [open, setVisible] = useState(false);
  const [form] = Form.useForm();

  const handleForeignKeyChange = (value: number) => {
  };

  const handleOpenModal = () => {
    setVisible(true);
  };

  const handleCloseModal = () => {
    setVisible(false);
  };

  const handleFormSubmit = (values: FormValues) => {
    api('/activity', 'POST', values)
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
            name="description"
            label="Descripcion"
            rules={[{ required: true, message: 'Por favor ingrese la descripción de la actividad' }]}
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

export default ActivityNew;

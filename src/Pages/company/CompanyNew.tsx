import React, { useState } from 'react';
import { Button, Form, Input, Modal, Select } from 'antd';
import getHeadersAndToken from '../../utils/Headers';
import { api } from '../../services/api';

interface FormValues {
  name: string;
  email: string;
  message: string;
}

const CompanyNew: React.FC = () => {
  const [open, setVisible] = useState(false);
  const [form] = Form.useForm();
  const [isActive, setIsActive] = useState<boolean>(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState('');

  const handleOpenModal = () => {
    setVisible(true);
  };

  const handleCloseModal = () => {
    setVisible(false);
  };

  const handleOpenModalMap = () => {
    setModalVisible(true);
  };

  const handleCloseModalMap = () => {
    setModalVisible(false);
  };


  const handleToggleChange = (value: boolean) => {
    // Aquí puedes realizar acciones con el nuevo valor
  };

  const handleSaveAddress = (address: string) => {
    setSelectedAddress(address);
  };

  const handleFormSubmit = (values: FormValues) => {

    api('/company', 'POST', values)
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
            label="Nombre de la empresa"
            rules={[{ required: true, message: 'Ingresar el nombre de la Empresa' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="phone"
            label="Numero de teléfono"
            rules={[{ required: true, message: 'Ingresar un numero' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="contact"
            label="Contacto adicional"
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="coordinates"
            label="Direccion"
            rules={[{ required: true, message: 'Ingresar la direccion' }]}
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

export default CompanyNew;

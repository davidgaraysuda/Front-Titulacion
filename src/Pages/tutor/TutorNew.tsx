import React, { useState } from 'react';
import { Button, Form, Input, Modal, Select } from 'antd';
import ForeignKeyCompany from '../../components/ForeingKeyCompany';
import { api } from '../../services/api';

interface FormValues {
  name: string;
  email: string;
  status: boolean;
  isMain: boolean;
  tuStatus: boolean;
}

const TutorNew: React.FC = () => {
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
    api('/tutors', 'POST', values)
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
      <Modal open={open} onCancel={handleCloseModal} footer={null} >
        <Form form={form} onFinish={handleFormSubmit} style={{paddingTop:'30px'}}>
        <Form.Item
            name="name"
            label="Nombre del tutor"
            rules={[{ required: true, message: 'Ingresar nombre de Tutor Empresarial' }]}
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
            name="alternative"
            label="Otro contacto"
            rules={[{ message: 'En caso de tenerlo, ingresar otro contacto del tutor' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="isMain" label="Puesto">
        <Select>
          <Select.Option value={true}>Gerente</Select.Option>
          <Select.Option value={false}>Empleado</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item
            name="companyId"
            label="Empresa"
          >
            <ForeignKeyCompany onChange={handleForeignKeyChange}/>
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

export default TutorNew;

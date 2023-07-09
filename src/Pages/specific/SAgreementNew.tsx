import React, { useState } from 'react';
import { Button, Form, Input, Modal, Select } from 'antd';
import ForeignKeyAgreement from '../../components/ForeingKeyAgreement';
import ForeignKeyCareer from '../../components/ForeingKeyCareer';
import ForeignKeyTetutor from '../../components/ForeingKeyTetutor';

interface FormValues {
  name: string;
  email: string;
  message: string;
}

const SAgreementNew: React.FC = () => {
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

  const handleForeignKeyChangeAgreement = (id: number) => {
  };

  const handleFormSubmit = (values: FormValues) => {
    fetch('http://localhost:8081/specifics', {
      method: 'POST',
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
        New
      </Button>
      <Modal open={open} onCancel={handleCloseModal} footer={null}>
        <Form form={form} onFinish={handleFormSubmit}>
          <Form.Item
            name="agreementId"
            label="Convenio"
          >
            <ForeignKeyAgreement onChange={handleForeignKeyChangeAgreement} />
          </Form.Item>
          <Form.Item
            name="linkSdoc"
            label="Link Documento"
            rules={[{ required: true, message: 'Ingresar Link del documento' }]}
          >
            <Input></Input>
          </Form.Item>
          <Form.Item
            name="careerId"
            label="Carrera"
          >
            <ForeignKeyCareer onChange={handleForeignKeyChange}/>
          </Form.Item>

          <Form.Item
            name="teacherId"
            label="Tutor Academico"
          >
            <ForeignKeyTetutor onChange={handleForeignKeyChange}/>
          </Form.Item>

          <Form.Item name="sagStatus" label="Estado">
            <Select>
              <Select.Option value={true}>Activo</Select.Option>
              <Select.Option value={false}>Inactivo</Select.Option>
            </Select>
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

export default SAgreementNew;

import React, { useState } from 'react';
import { Button, Form, Input, Modal, Select } from 'antd';
import ForeignKeyAgreement from '../../components/ForeingKeyAgreement';
import ForeignKeySelect from '../../components/ForeingKeySelect';
import { api } from '../../services/api';

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
    api('/specifics', 'POST', values)
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
            <ForeignKeySelect onChange={handleForeignKeyChange} section={'carreras'}/>
          </Form.Item>

          <Form.Item
            name="teacherId"
            label="Tutor Academico"
          >
            <ForeignKeySelect onChange={handleForeignKeyChange} section={'teachers'}/>
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

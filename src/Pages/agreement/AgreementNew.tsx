import React, { useState } from 'react';
import { Button, Form, Input, Modal, Select, DatePicker, message } from 'antd';
import ForeignKeyCompany from '../../components/ForeingKeyCompany';

interface FormValues {
  name: string;
  email: string;
  message: string;
  startDate: Date;
  endDate: Date;
  linkDoc: string;
}

const AgreementNew: React.FC = () => {
  const [open, setVisible] = useState(false);
  const [form] = Form.useForm();
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const handleStartDateChange = (date: any) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date: any) => {
    setEndDate(date);
  };

  const handleOpenModal = () => {
    setVisible(true);
  };

  const handleCloseModal = () => {
    setVisible(false);
  };
  
  const handleForeignKeyChange = (value: number) => {
    
  };

  const handleFormSubmit = (values: FormValues) => {
    if (startDate && endDate && startDate < endDate) {
    fetch('http://localhost:8081/agreement', {
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
    }
      else {
        message.error('La fecha de inicio debe ser menor a la fecha final');
      }
    };

  return (
    <>
    <Button type="primary" onClick={handleOpenModal}>
        New
      </Button>
      <Modal open={open} onCancel={handleCloseModal} footer={null}>
        <Form form={form} onFinish={handleFormSubmit}>
          <Form.Item
            name="startDate"
            label="Fecha de Inicio"
            rules={[{ required: true, message: 'Ingresar la fecha de inicio del Convenio' }]}
          >
            <DatePicker format="YYYY-MM-DD" />
          </Form.Item>
          <Form.Item
            name="endDate"
            label="Fecha de Fin"
            rules={[{ required: true, message: 'Ingresar la fecha de fin del Convenio' }]}
          >
            <DatePicker format="YYYY-MM-DD" />
          </Form.Item>
          <Form.Item
            name="linkDoc"
            label="Documento"
            rules={[{ required: true, message: 'Ingresar Link del documento' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="companyId"
            label="Empresa"
          >
            <ForeignKeyCompany onChange={handleForeignKeyChange} />
          </Form.Item>
          
          <Form.Item name="agStatus" label="Estado">
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

export default AgreementNew;

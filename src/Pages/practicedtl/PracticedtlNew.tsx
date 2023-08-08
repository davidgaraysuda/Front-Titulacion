import React, { useState } from 'react';
import { Button, Form, Input, Modal, DatePicker, Select, TimePicker } from 'antd';
import moment, { Moment } from 'moment';
import ForeignKeyPractice from '../../components/ForeingKeyPractice';

const { Option } = Select;
const format = 'h:mm a'; // Formato de 12 horas con AM/PM

interface FormValues {
  name: string;
  email: string;
  message: string;
}

const PracticedtlNew: React.FC = () => {
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
    fetch('http://localhost:8081/practicedtl', {
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

  const generateHourOptions = () => {
    const hoursOptions: React.ReactNode[] = [];

    for (let hour = 7; hour <= 22; hour++) {
      const formattedHour = hour < 12 ? `${hour} AM` : `${hour - 12} PM`;
      const value = `${hour.toString().padStart(2, '0')}:00`;
      hoursOptions.push(
        <Option key={value} value={value}>
          {formattedHour}
        </Option>
      );
    }

    return hoursOptions;
  };

  return (
    <>
      <Button type="primary" onClick={handleOpenModal}>
        New
      </Button>
      <Modal open={open} onCancel={handleCloseModal} footer={null}>
        <Form form={form} onFinish={handleFormSubmit} style={{ paddingTop: '30px' }}>
          <Form.Item
            name="actualDate"
            label="Fecha de la practica"
            rules={[{ required: true, message: 'Please enter your name' }]}
          >
            <DatePicker format="YYYY-MM-DD" />
          </Form.Item>
          <Form.Item
            name="startTime"
            label="Hora de Entrada"
            rules={[{ required: true, message: 'Por favor ingresa la hora de entrada' }]}
          >
            <Select style={{ width: '100%' }} defaultValue="07:00">
              {generateHourOptions()}
            </Select>
          </Form.Item>

          <Form.Item
            name="endTime"
            label="Hora de Salida"
            rules={[{ required: true, message: 'Por favor ingresa la hora de salida' }]}
          >
            <Select style={{ width: '100%' }} defaultValue="07:00">
              {generateHourOptions()}
            </Select>
          </Form.Item>

          <Form.Item
            name="totalHours"
            label="Total de horas"
            rules={[{ required: true, message: 'Please enter your email' }]}
          >
            <Select>
              {[...Array(8)].map((_, index) => (
                <Option key={index + 1} value={index + 1}>
                  {index + 1}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="observations"
            label="Observaciones"
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="practiceId"
            label="Practica destinada"
            rules={[{ required: true, message: 'Please enter a message' }]}
          >
            <ForeignKeyPractice onChange={handleForeignKeyChange} />
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

export default PracticedtlNew;

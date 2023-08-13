import React, { useState } from 'react';
import { Button, Form, Input, Modal, DatePicker, message, Select } from 'antd';
import ForeignKeySelect from '../../components/ForeingKeySelect';
import ForeignKeyStudent from '../../components/ForeingKeyStudent';
import ForeignKeyTutor from '../../components/ForeingKeyTutor';
import { api } from '../../services/api';

interface FormValues {
  name: string;
  email: string;
  message: string;
  startDate: Date;
  endDate: Date;
}


const PracticeNew: React.FC = () => {
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

  const handleForeignKeyChange = (value: number) => {};

  const handleForeignKeyChangeStudent = (id: number) => {};

  const handleFormSubmit = (values: FormValues) => {
    api('/practices', 'POST', values)
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
        <Form form={form} onFinish={handleFormSubmit} style={{ paddingTop: '30px' }}>
          <Form.Item
            name="startDate"
            label="Fecha de Inicio"
            rules={[
              { required: true, message: 'Ingresar la fecha de inicio de la Practica' },
            ]}
          >
            <DatePicker format="YYYY-MM-DD" onChange={handleStartDateChange} />
          </Form.Item>
          <Form.Item
            name="endDate"
            label="Fecha de Fin"
            rules={[
              { required: true, message: 'Ingresar la fecha de fin de la Practica' },
              () => ({
                validator(_, value) {
                  if (!value || (startDate && value.isAfter(startDate))) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('La fecha de fin debe ser posterior a la fecha de inicio'));
                },
              }),
            ]}
          >
            <DatePicker format="YYYY-MM-DD" onChange={handleEndDateChange} />
          </Form.Item>

          <Form.Item
            name="studentId"
            label="Estudiante"
            rules={[{ required: true, message: 'Please enter your email' }]}
          >
            <ForeignKeyStudent onChange={handleForeignKeyChangeStudent} />
          </Form.Item>
          <Form.Item
            name="tutorId"
            label="Tutor Empresarial"
            rules={[{ required: true, message: 'Please enter your email' }]}
          >
            <ForeignKeyTutor onChange={handleForeignKeyChange} />
          </Form.Item>
          <Form.Item
            name="teacherId"
            label="Tutor Academico"
            rules={[{ required: true, message: 'Please enter your email' }]}
          >
            <ForeignKeySelect onChange={handleForeignKeyChange} section={'teachers'} />
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

export default PracticeNew;

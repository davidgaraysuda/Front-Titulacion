import React, { useState } from 'react';
import { Button, Form, Select, Modal } from 'antd';
import ForeignKeyActivity from '../../components/ForeingKeyActivity';
import ForeignKeyPracticedtl from '../../components/ForeingKeyPracticedtl';

interface FormValues {
  name: string;
  email: string;
  message: string;
}

const ActivityDetailNew: React.FC = () => {
  const [open, setVisible] = useState(false);
  const [form] = Form.useForm();

  const handleOpenModal = () => {
    setVisible(true);
  };

  const handleCloseModal = () => {
    setVisible(false);
  };

  const handleForeignKeyChangeActivity = (id: number) => {
  };

  const handleForeignKeyChangePracticedtl = (id: number) => {
  };

  const handleFormSubmit = (values: FormValues) => {
    fetch('http://localhost:8081/activitydtl', {
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
        <Form form={form} onFinish={handleFormSubmit} style={{paddingTop:'30px'}}>

        <Form.Item
            name="activitiesId"
            label="Actividades"
            rules={[{ required: true, message: 'Please enter your name' }]}
          >
            <ForeignKeyActivity onChange={handleForeignKeyChangeActivity} />
          </Form.Item>
          <Form.Item
            name="detailId"
            label="Detalle"
            rules={[{ required: true, message: 'Please enter your email' }]}
          >
            <ForeignKeyPracticedtl onChange={handleForeignKeyChangePracticedtl} />
          </Form.Item>

          <Form.Item
            name="checking"
            label="Revisado"
          >
           <Select>
              <Select.Option value={true}>Revisado</Select.Option>
              <Select.Option value={false}>No Revisado</Select.Option>
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

export default ActivityDetailNew;

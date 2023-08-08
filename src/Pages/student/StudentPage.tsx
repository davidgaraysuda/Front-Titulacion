import { Button, Modal, Table, Space, Form, Input, message, Popconfirm } from 'antd';
import React, { useEffect, useState } from 'react';
import type { ColumnsType } from 'antd/es/table';
import axios from 'axios';
import StudentNew from './StudentNew';

interface Item {
  studentId: number;
  // Add other properties here if needed
}

const StudentPage = () => {
  const [data, setData] = useState<Item[]>([]);

  const fetchItems = async () => {
    try {
      const response = await axios.get('https://its.academicok.com/api?a=datospracticasmatriculados&key=458466658');
      const data = response.data;
      setData(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const [open, setVisible] = useState(false);

  const handleOpenModal = () => {
    setVisible(true);
  };

  const handleCloseModal = () => {
    setVisible(false);
  };

  const handleFormSubmit = (values: any) => {
    console.log(values);
    handleCloseModal();
  };

  const handleDeleteData = async (id: number) => {
    try {
      await axios.delete(`http://localhost:8081/students/delete/${id}`);
      setData(prevData => prevData.filter(data => data.studentId !== id));
      message.success('Item deleted successfully');
    } catch (error) {
      console.error(error);
      message.error('Failed to delete item');
    }
  };

  const handleUpdateData = async (id: number) => {
    try {
      await axios.put(`http://localhost:8081/students/`);
      setData(prevData => prevData.filter(data => data.studentId !== id));
      message.success('Item update successfully');
    } catch (error) {
      console.error(error);
      message.error('Failed to update item');
    }
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const columns = [
    {
      title: 'Identificación',
      dataIndex: 'identifiacion',
      key: 'identifiacion',
    },
    {
      title: 'Nombres',
      dataIndex: 'nombres',
      key: 'nombres',
    },
    {
      title: 'Apellidos',
      dataIndex: 'apellido1',
      key: 'apellido1',
    },

    {
      title: 'Carrera',
      dataIndex: 'carrera',
      key: 'carrera',
    },

    {
      title: 'Data',
      dataIndex: 'data',
      key: 'data',
    },
  ];

  return (
    <>
      <Space style={{ marginBottom: 16 }}>
        <StudentNew></StudentNew>
      </Space>
      <Table dataSource={data} columns={columns} bordered />
    </>
  );
};

export default StudentPage;

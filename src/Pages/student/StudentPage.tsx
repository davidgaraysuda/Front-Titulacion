import { Button, Modal, Table, Space, Form, Input, message, Popconfirm } from 'antd';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import StudentNew from './StudentNew';
import { api } from '../../services/api';

interface Item {
  studentId: number;
  // Add other properties here if needed
}

const StudentPage = () => {
  const [data, setData] = useState<Item[]>([]);

  const fetchItems = async () => {
    try {
      const data = await api('/students/with/carrera'); 
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
      dataIndex: 'nui',
      key: 'identifiacion',
    },
    {
      title: 'Nombres',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Apellidos',
      dataIndex: 'lastname',
      key: 'lastname',
    },

    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },

    {
      title: 'Celular',
      dataIndex: 'phone',
      key: 'phone',
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

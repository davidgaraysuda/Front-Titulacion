import {Button, Modal, Table, Space, Form, Input, message, Popconfirm } from 'antd';
import React, { useEffect, useState } from 'react';
import type { ColumnsType } from 'antd/es/table';
import axios from 'axios';
import StudentNew from './StudentNew';

interface Item {
  studentId:number, 

}

const StudentPage = () => {
  const [data, setData] = useState<Item[]>([]);

  const fetchItems = async () => {
    try {
      const response = await fetch('http://localhost:8081/students');
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchItems();
    const interval = setInterval(() => {
      fetchItems();
    }, 1000);

    return () => clearInterval(interval);
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
      await fetch(`http://localhost:8081/students/delete/${id}`, {
        method: 'DELETE',
      });
      setData(prevData => prevData.filter(data => data.studentId !== id));
      message.success('Item deleted successfully');
    } catch (error) {
      console.error(error);
      message.error('Failed to delete item');
    }
  };

  const handleUpdateData = async (id: number) => {
    try {
      await fetch(`http://localhost:8081/students/`, {
        method: 'PUT',
      });
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
      title: 'Cedula',
      dataIndex: 'nui',
      key: 'nui',
    },
    {
      title: 'Nombre',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Apellido',
      dataIndex: 'lastname',
      key: 'lastname',
    },
    {
      title: 'E-mail',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Telefono',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Carrera',
      dataIndex: 'careerId',
      key: 'career_id',
    },
    {
      title: 'Estado',
      dataIndex: 'sState',
      key: 's_state',
    },
    
    {
      title: 'Action',
      key: 'action',
      render: (text: string, record: Item) => (
        <Popconfirm
          title="Are you sure you want to delete this item?"
          onConfirm={() => handleDeleteData(record.studentId)}
        >
          <Button type="link" danger>
            Delete
          </Button>
        </Popconfirm>
      ),},
      {
        title: 'Action',
        key: 'action',
        render: (text: string, record: Item) => (
          <Popconfirm
            title="Are you sure you want to update this item?"
            onConfirm={() => handleUpdateData(record.studentId)}
          >
            <Button type="link" danger>
              Update
            </Button>
          </Popconfirm>
        ),},]

  
  return( <>
  <Space style={{ marginBottom: 16 }}>
    <StudentNew></StudentNew>
  </Space>
  <Table dataSource={data} columns={columns} bordered />
  </>
  );
};

export default StudentPage;
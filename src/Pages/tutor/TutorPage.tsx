import {Button, Modal, Table, Space, Form, Input, message, Popconfirm } from 'antd';
import React, { useEffect, useState } from 'react';
import TutorNew from './TutorNew';
import { api } from '../../services/api';

interface Item {
  id:number, 
  status:boolean, 
  isMain:boolean, 
}

const TutorPage = () => {
  const [data, setData] = useState<Item[]>([]);

  const fetchItems = async () => {
    try {
      const data = await api('/tutors/with/company'); 
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
      await fetch(`http://localhost:8081/tutors/delete/${id}`, {
        method: 'DELETE',
      });
      setData(prevData => prevData.filter(data => data.id !== id));
      message.success('Item deleted successfully');
    } catch (error) {
      console.error(error);
      message.error('Failed to delete item');
    }
  };

  const handleUpdateData = async (id: number) => {
    try {
      await fetch(`http://localhost:8081/tutors/`, {
        method: 'PUT',
      });
      setData(prevData => prevData.filter(data => data.id !== id));
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
      title: 'Nombre',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Telefono',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Contacto',
      dataIndex: 'alternative',
      key: 'alternative',
    },
    {
      title: 'Empresa',
      dataIndex: 'company',
      key: 'company',
    },
    {
      title: 'Puesto',
      dataIndex: 'isMain',
      key: 'is_main',
      render: (isActive: boolean) => (
        <span>{isActive ? 'Gerente' : 'Empleado'}</span>
      ),
    },
    {
      title: 'Estado',
      dataIndex: 'tuStatus',
      key: 'tu_status',
      render: (isActive: boolean) => (
        <span>{isActive ? 'Activo' : 'Inactivo'}</span>
      ),
    },
    ]

  
  return( <>
  <Space style={{ marginBottom: 16 }}>
    <TutorNew></TutorNew>
  </Space>
  <Table dataSource={data} columns={columns} bordered />
  </>
  );
};

export default TutorPage;
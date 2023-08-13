import {Button, Modal, Table, Space, Form, Input, message, Popconfirm } from 'antd';
import React, { useEffect, useState } from 'react';
import CareerNew from './CareerNew';
import { api } from '../../services/api';

interface Item {
  id:number, 
}

const CareerPage = () => {
  const [data, setData] = useState<Item[]>([]);

  const fetchItems = async () => {
    try {
      const data = await api('/carreras'); 
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
    handleCloseModal();
  };

  const handleDeleteData = async (id: number) => {
    try {
      await fetch(`http://localhost:8081/carreras/delete/${id}`, {
        method: 'DELETE',
      });
      setData(prevData => prevData.filter(data => data.id !== id));
      message.success('Item deleted successfully');
    } catch (error) {
      console.error(error);
      message.error('Failed to delete item');
    }
  };


  const handleCancel = () => {
    setVisible(false);
  };

  const columns = [
    {
      title: 'Nombre de carrera',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Coordinador de Carrera',
      dataIndex: 'coordinator',
      key: 'coordinator',
    },
    
    ]

  
  return( <>
  <Space style={{ marginBottom: 16 }}>
    <CareerNew></CareerNew>
  </Space>

  <Table dataSource={data} columns={columns} bordered />
  </>
  );
};

export default CareerPage;
import {Button, Modal, Table, Space, Form, Input, message, Popconfirm } from 'antd';
import React, { useEffect, useState } from 'react';
import type { ColumnsType } from 'antd/es/table';
import axios from 'axios';
import ActivityNew from './ActivityNew';

interface Item {
  activityId:number, 

}

const ActivityPage = () => {
  const [data, setData] = useState<Item[]>([]);

  const fetchItems = async () => {
    try {
      const response = await fetch('http://localhost:8081/activity/with/carrera');
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
      await fetch(`http://localhost:8081/activity/delete/${id}`, {
        method: 'DELETE',
      });
      setData(prevData => prevData.filter(data => data.activityId !== id));
      message.success('Item deleted successfully');
    } catch (error) {
      console.error(error);
      message.error('Failed to delete item');
    }
  };

  const handleUpdateData = async (id: number) => {
    try {
      await fetch(`http://localhost:8081/activity/`, {
        method: 'PUT',
      });
      setData(prevData => prevData.filter(data => data.activityId !== id));
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
      title: 'Descripcion de la actividad',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Carrera a la que pertenece',
      dataIndex: 'carrera',
      key: 'careerId',
    },]

  
  return( <>
  <Space style={{ marginBottom: 16 }}>
    <ActivityNew></ActivityNew>
  </Space>
  <Table dataSource={data} columns={columns} bordered />
  </>
  );
};

export default ActivityPage;
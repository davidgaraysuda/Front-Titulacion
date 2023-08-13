import {Button, Modal, Table, Space, Form, Input, message, Popconfirm } from 'antd';
import React, { useEffect, useState } from 'react';
import ActivityDetailNew from './ActivityDetailNew';
import { api } from '../../services/api';

interface Item {
  activityDetailId:number, 

}

const ActivityDetailPage = () => {
  const [data, setData] = useState<Item[]>([]);

  const fetchItems = async () => {
    try {
      const data = await api('/activitydtl'); 
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
      await fetch(`http://localhost:8081/activitydtl/delete/${id}`, {
        method: 'DELETE',
      });
      setData(prevData => prevData.filter(data => data.activityDetailId !== id));
      message.success('Item deleted successfully');
    } catch (error) {
      console.error(error);
      message.error('Failed to delete item');
    }
  };

  const handleUpdateData = async (id: number) => {
    try {
      await fetch(`http://localhost:8081/activitydtl/`, {
        method: 'PUT',
      });
      setData(prevData => prevData.filter(data => data.activityDetailId !== id));
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
      title: 'Descripcion',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Actividades',
      dataIndex: 'activityId',
      key: 'activity_id',
    },
    {
      title: 'Detalle',
      dataIndex: 'detailId',
      key: 'detail_id',
    },

    {
      title: 'Revisado',
      dataIndex: 'checking',
      key: 'checking',
    },
    
   ]

  
  return( <>
  <Space style={{ marginBottom: 16 }}>
    <ActivityDetailNew></ActivityDetailNew>
  </Space>
  <Table dataSource={data} columns={columns} bordered />
  </>
  );
};

export default ActivityDetailPage;
import {Button, Modal, Table, Space, message, Popconfirm } from 'antd';
import { useEffect, useState } from 'react';
import TeacherNew from './TeacherNew';

interface Item {
  id:number, 

}

const TeacherPage = () => {
  const [data, setData] = useState<Item[]>([]);

  const fetchItems = async () => {
    try {
      const response = await fetch('http://localhost:8081/teachers/with/career');
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
      await fetch(`http://localhost:8081/teachers/delete/${id}`, {
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
      await fetch(`http://localhost:8081/teachers/`, {
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
      title: 'Carrera',
      dataIndex: 'career',
      key: 'career',
    },
    {
      title: 'Estado',
      dataIndex: 'teStatus',
      key: 'te_status',
      render: (isActive: boolean) => (
        <span>{isActive ? 'Activo' : 'Inactivo'}</span>
      ),
    },
    ]

  
  return( <>
  <Space style={{ marginBottom: 16 }}>
    <TeacherNew></TeacherNew>
  </Space>
  <Table dataSource={data} columns={columns} bordered />
  </>
  );
};

export default TeacherPage;
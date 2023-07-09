import {Button, Modal, Table, Space, Form, Input, message, Popconfirm } from 'antd';
import React, { useEffect, useState } from 'react';
import type { ColumnsType } from 'antd/es/table';
import axios from 'axios';
import PracticeNew from './PracticeNew';

interface Item {
  practiceId:number, 

}

const PracticePage = () => {
  const [data, setData] = useState<Item[]>([]);

  const fetchItems = async () => {
    try {
      const response = await fetch('http://localhost:8081/practices/with/empresa');
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
      await fetch(`http://localhost:8081/practices/delete/${id}`, {
        method: 'DELETE',
      });
      setData(prevData => prevData.filter(data => data.practiceId !== id));
      message.success('Item deleted successfully');
    } catch (error) {
      console.error(error);
      message.error('Failed to delete item');
    }
  };

  const handleUpdateData = async (id: number) => {
    try {
      await fetch(`http://localhost:8081/practices/`, {
        method: 'PUT',
      });
      setData(prevData => prevData.filter(data => data.practiceId !== id));
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
      title: 'Fecha de Inicio',
      dataIndex: 'startDate',
      key: 'start_date',
    },
    {
      title: 'Fecha de Fin',
      dataIndex: 'endDate',
      key: 'end_date',
    },
    {
      title: 'Nombre Estudiante',
      dataIndex: 'student',
      key: 'student',
    },
    {
      title: 'Apellido Estudiante',
      dataIndex: 'lastname',
      key: 'lastname',
    },
    {
      title: 'Tutor Empresarial',
      dataIndex: 'tutor',
      key: 'tutor',
    },
    {
      title: 'Tutor Academico',
      dataIndex: 'teacher',
      key: 'teacher',
    },
    {
      title: 'Actividad',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Estado',
      dataIndex: 'praStatus',
      key: 'pra_status',
    },
    
    {
      title: 'Action',
      key: 'action',
      render: (text: string, record: Item) => (
        <Popconfirm
          title="Are you sure you want to delete this item?"
          onConfirm={() => handleDeleteData(record.practiceId)}
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
            onConfirm={() => handleUpdateData(record.practiceId)}
          >
            <Button type="link" danger>
              Update
            </Button>
          </Popconfirm>
        ),},]

  
  return( <>
  <Space style={{ marginBottom: 16 }}>
    <PracticeNew></PracticeNew>
  </Space>
  <Table dataSource={data} columns={columns} bordered />
  </>
  );
};

export default PracticePage;
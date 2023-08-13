import {Button, Modal, Table, Space, Form, Input, message, Popconfirm } from 'antd';
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import PracticedtlNew from './PracticedtlNew';
import { api } from '../../services/api';

interface Item {
  id:number, 

}

const PracticedtlPage = () => {
  const [data, setData] = useState<Item[]>([]);

  const fetchItems = async () => {
    try {
      const data = await api('/practicedtl/full'); 
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
      await fetch(`http://localhost:8081/practicedtl/delete/${id}`, {
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
      title: 'Fecha de la Practica',
      dataIndex: 'actualDate',
      key: 'actual_date',
      render: (startDate: string) => moment(startDate).format('YYYY-MM-DD'),
    },
    {
      title: 'Hora de Entrada',
      dataIndex: 'startTime',
      key: 'start_time',
    },
    {
      title: 'Hora de Salida',
      dataIndex: 'endTime',
      key: 'end_time',
    },
    {
      title: 'Horas Realizadas',
      dataIndex: 'totalHours',
      key: 'total_hours',
    },
    {
      title: 'Estudiante',
      dataIndex: 'estudiante',
      key: 'estudiante',
    },
    {
      title: 'Empresa',
      dataIndex: 'company',
      key: 'company',
    },



    ]

  
  return( <>
  <Space style={{ marginBottom: 16 }}>
    <PracticedtlNew></PracticedtlNew>
  </Space>
  <Table dataSource={data} columns={columns} bordered />
  </>
  );
};

export default PracticedtlPage;
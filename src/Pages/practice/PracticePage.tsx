import {Button, Modal, Table, Space, Form, Input, message, Popconfirm } from 'antd';
import React, { useEffect, useState } from 'react';
import type { ColumnsType } from 'antd/es/table';
import moment from 'moment';
import PracticeNew from './PracticeNew';

interface Item {
  practiceId:number, 
  hours?:number;
}

interface ItemDtl {
  totalHours:number, 

}

const PracticePage = () => {
  const [data, setData] = useState<Item[]>([]);
  const [practicedata, setPracticeData] = useState<Item[]>([]);
  const [practicedtldata, setPracticeDtlData] = useState<ItemDtl[]>([]);

  const fetchItems = async () => {
    try {
      const response = await fetch('http://localhost:8081/practices/with/estudiante');
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchItems2 = async () => {
    try {
      const response = await fetch('http://localhost:8081/practicedtl');
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchItems2();
    fetchItems();
    const interval = setInterval(() => {
      fetchItems();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Realiza la suma y actualiza la columna sumaTabla2 en la tabla1
    const updatedHoursData = practicedata.map((item) => {
      const suma = practicedtldata.reduce((acc, curr) => acc + curr.totalHours, 0);
      return { ...item, sumaTabla2: suma };
    });
    setPracticeData(updatedHoursData);
  }, [practicedtldata]);

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
      render: (startDate: string) => moment(startDate).format('YYYY-MM-DD'),
    },
    {
      title: 'Fecha de Fin',
      dataIndex: 'endDate',
      key: 'end_date',
      render: (endDate: string) => moment(endDate).format('YYYY-MM-DD'),
    },
    
    {
      title: 'Estudiante',
      dataIndex: 'estudiante',
      key: 'student',
    },
    {
      dataIndex: 'apellido',
      key: 'student',
    },
    {
      title: 'Tutor Empresarial',
      dataIndex: 'tutor',
      key: 'tutor',
    },
    {
      title: 'Tutor Academico',
      dataIndex: 'profesor',
      key: 'teacher',
    },
    
    ]

  
  return( <>
  <Space style={{ marginBottom: 16 }}>
    <PracticeNew></PracticeNew>
  </Space>
  <Table dataSource={data} columns={columns} bordered />
  </>
  );
};

export default PracticePage;
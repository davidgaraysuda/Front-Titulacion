import {Button, Modal, Table, Space, message, Popconfirm } from 'antd';
import { useEffect, useState } from 'react';

interface Item {
  id:number, 

}

const TeacherInfo = () => {
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
    
      ]

  
  return( <>
  <Table dataSource={data} columns={columns} bordered />
  </>
  );
};

export default TeacherInfo;
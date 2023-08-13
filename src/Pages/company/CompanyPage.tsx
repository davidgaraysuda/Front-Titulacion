import {Button, Modal, Table, Space, Form, Input, message, Popconfirm } from 'antd';
import React, { useEffect, useState } from 'react';
import {api} from '../../services/api'
import CompanyNew from './CompanyNew';

interface Item {
  id:number, 
  key: string;
  name: string;
  coordinates: string;
}

interface TableItem {
  key: string;
  name: string;
  coordinates: string;
}

const CompanyPage = () => {
  const [data, setData] = useState<Item[]>([]);
  const [modalVisibleMap, setModalVisibleMap] = useState(false);
  const [selectedItem, setSelectedItem] = useState<TableItem | null>(null);
  const [mapLink, setMapLink] = useState('');  

  const fetchItems = async () => {
    try {
      const data = await api('/company'); 
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

  const handleCancel = () => {
    setVisible(false);
  };

  const handleFormSubmit = (values: any) => {
    handleCloseModal();
  };

  const handleOpenModalMap = (coordinates: string) => {
    setMapLink(coordinates);
    setModalVisibleMap(true);
    window.open(coordinates, '_blank');
  };

  const handleCloseModalMap = () => {
    setModalVisibleMap(false);
  };

  const handleDeleteData = async (id: number) => {
    try {
      await fetch(`http://localhost:8081/company/delete/${id}`, {
        method: 'DELETE',
      });
      setData(prevData => prevData.filter(data => data.id !== id));
      message.success('Item deleted successfully');
    } catch (error) {
      console.error(error);
      message.error('Failed to delete item');
    }
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
      title: 'Otro Contacto',
      dataIndex: 'contact',
      key: 'contact',
    },
    {
      title: 'Ver Direccion',
      key: 'action',
      render: (_: any, record: Item) => (
        <Button onClick={() => handleOpenModalMap (record.coordinates)} disabled={!record.coordinates}>
          View Address
        </Button>
      ),
    },
    {
      title: 'Estado',
      dataIndex: 'coStatus',
      key: 'co_status',
      render: (isActive: boolean) => (
        <span>{isActive ? 'Activo' : 'Inactivo'}</span>
      ),
    },
    
    ]

  
  return( <>
  <Space style={{ marginBottom: 16 }}>
    <CompanyNew></CompanyNew>
  </Space>
  <Table dataSource={data} columns={columns} bordered />
  </>
  );
};

export default CompanyPage;
import {Button, Modal, Table, Space, Form, Input, message, Popconfirm } from 'antd';
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { api } from '../../../services/api';

interface Item {
  agreementId:number, 
  linkDoc: string;
  startDate: Date,
  endDate: Date,
}

const AgreementPage = () => {
  const [data, setData] = useState<Item[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [documentLink, setDocumentLink] = useState('');  

  const fetchItems = async () => {
    try {
      const data = await api('/agreement/expired'); 
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

  const handleOpenModalDocument = (linkDoc: string) => {
    window.open(linkDoc, '_blank');
  };

  const handleFormSubmit = (values: any) => {
    handleCloseModal();
  };


  const handleCancel = () => {
    setVisible(false);
  };

  const columns = [
    {
      title: 'Fecha de inicio',
      dataIndex: 'startDate',
      key: 'start_date',
      render: (startDate: string) => moment(startDate).format('YYYY-MM-DD'),
    },
    {
      title: 'Fecha Fin',
      dataIndex: 'endDate',
      key: 'end_date',
      render: (endDate: string) => moment(endDate).format('YYYY-MM-DD'),
    },
    {
      title: 'Empresa',
      dataIndex: 'company',
      key: 'empresa',
    },
    {
      title: 'Estado',
      dataIndex: 'agStatus',
      key: 'ag_status',
      render: (isActive: boolean) => (
        <span>{isActive ? 'Activo' : 'Inactivo'}</span>
      ),
    },
    
    {
      title: 'Document',
      key: 'action',
      render: (_: any, record: Item) => (
        <Button onClick={() => handleOpenModalDocument(record.linkDoc)}>View Document</Button>
      ),
    },
      ]

  
  return( <>
  <Table dataSource={data} columns={columns} bordered />
  </>
  );
};

export default AgreementPage;
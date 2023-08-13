import {Button, Modal, Table, Space, Form, Input, message, Popconfirm } from 'antd';
import React, { useEffect, useState } from 'react';
import SAgreementNew from './SAgreementNew';
import { api } from '../../services/api';

interface Item {
  id:number, 
  linkSdoc: string, 
}

const SAgreementPage = () => {
  const [data, setData] = useState<Item[]>([]);
  const [open, setOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [sdocumentLink, setDocumentLink] = useState('');  

  const fetchItems = async () => {
    try {
      const data = await api('/specifics/list'); 
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

  const handleOpenModalDocument = (linkSdoc: string) => {
    setDocumentLink(linkSdoc);
    setModalOpen(true);
  };

  const handleCloseModalDocument = () => {
    setDocumentLink('');
    setModalOpen(false);
  };

  const handleOpenModal = () => {
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

  const handleFormSubmit = (values: any) => {
    handleCloseModal();
  };

  const handleDeleteData = async (sAgreementId: number) => {
    try {
      await fetch(`http://localhost:8081/specifics/delete/${sAgreementId}`, {
        method: 'DELETE',
      });
      setData(prevData => prevData.filter(data => data.id !== sAgreementId));
      message.success('Item deleted successfully');
    } catch (error) {
      console.error(error);
      message.error('Failed to delete item');
    }
  };

  const handleUpdateData = async (sAgreementId: number) => {
    try {
      await fetch(`http://localhost:8081/specifics/`, {
        method: 'PUT',
      });
      setData(prevData => prevData.filter(data => data.id !== sAgreementId));
      message.success('Item update successfully');
    } catch (error) {
      console.error(error);
      message.error('Failed to update item');
    }
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const columns = [
    {
      title: 'Empresa',
      dataIndex: 'company',
      key: 'company',
    },
    {
      title: 'Carrera',
      dataIndex: 'career',
      key: 'career',
    },
    {
      title: 'Estado',
      dataIndex: 'sagStatus',
      key: 'sag_status',
      render: (isActive: boolean) => (
        <span>{isActive ? 'Activo' : 'Inactivo'}</span>
      ),
    },
    
    {
      title: 'Document',
      key: 'action',
      render: (_: any, record: Item) => (
        <Button onClick={() => handleOpenModalDocument(record.linkSdoc)} >View Document</Button>
      ),
    },
    
      ]

  
  return( <>
  <Space style={{ marginBottom: '16px' }}>
    <div style={{paddingLeft:'15px', paddingTop:'10px'}}><SAgreementNew></SAgreementNew></div>
  </Space>
  <Table dataSource={data} columns={columns} bordered />
  <Modal
        title="Document Viewer"
        open={modalOpen}
        onCancel={handleCloseModalDocument}
        footer={null}
        destroyOnClose
        width={"250%"}
      >
        {sdocumentLink && (
          <iframe src={sdocumentLink} width="100%" height="500px" frameBorder="0" title="Document" />
        )}
      </Modal>
  </>
  );
};

export default SAgreementPage;
import {Button, Modal, Table, Space, Form, Input, message, Popconfirm } from 'antd';
import React, { useEffect, useState } from 'react';
import SAgreementNew from './SAgreementNew';

interface Item {
  id:number, 
  linkSdoc: string, 
}

const SAgreementPage = () => {
  const [data, setData] = useState<Item[]>([]);
  const [visible, setVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [sdocumentLink, setDocumentLink] = useState('');  

  const fetchItems = async () => {
    try {
      const response = await fetch('http://localhost:8081/specifics/list');
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

  const handleOpenModalDocument = (linkSdoc: string) => {
    setDocumentLink(linkSdoc);
    setModalVisible(true);
  };

  const handleCloseModalDocument = () => {
    setDocumentLink('');
    setModalVisible(false);
  };

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
    setVisible(false);
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
        <Button onClick={() => handleOpenModalDocument(record.linkSdoc)}>View Document</Button>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (text: string, record: Item) => (
        <Popconfirm
          title="Are you sure you want to delete this item?"
          onConfirm={() => handleDeleteData(record.id)}
        >
          <Button type="link" danger>
            Delete
          </Button>
        </Popconfirm>
      ),},
      ]

  
  return( <>
  <Space style={{ marginBottom: 16 }}>
    <SAgreementNew></SAgreementNew>
  </Space>
  <Table dataSource={data} columns={columns} bordered />
  <Modal
        title="Document Viewer"
        visible={modalVisible}
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
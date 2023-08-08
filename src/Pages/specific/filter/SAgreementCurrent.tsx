import { Button, Modal, Table, Space, Tabs } from 'antd';
import React, { useEffect, useState } from 'react';
import SAgreementNew from '../SAgreementNew';

const { TabPane } = Tabs;

interface Item {
  id: number;
  linkSdoc: string;
}

const SAgreementFilterCurrent = () => {
  const [data, setData] = useState<Item[]>([]);
  const [open, setOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [sdocumentLink, setDocumentLink] = useState('');
   const [activeTab, setActiveTab] = useState<string>('1');

  const fetchItems = async (endpoint: string) => {
    try {
      const response = await fetch(endpoint);
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    // Determinar el endpoint según la pestaña activa
    let endpoint = 'http://localhost:8081/specifics/current';
    if (activeTab === '2') {
      endpoint = 'http://localhost:8081/specifics/current/Desarrollo%20de%20Software';
    }
    if (activeTab === '3') {
      endpoint = 'http://localhost:8081/specifics/current/Dise%C3%B1o';
    }
    if (activeTab === '4') {
      endpoint = 'http://localhost:8081/specifics/current/Enfermeria';
    }
    if (activeTab === '5') {
      endpoint = 'http://localhost:8081/specifics/current/Gastronom%C3%ADa';
    }
    if (activeTab === '6') {
      endpoint = 'http://localhost:8081/specifics/current/Marketing';
    }
    if (activeTab === '7') {
      endpoint = 'http://localhost:8081/specifics/current/Turismo';
    }

    fetchItems(endpoint);
    const interval = setInterval(() => {
      fetchItems(endpoint);
    }, 1000);

    return () => clearInterval(interval);
  }, [activeTab]); // Agregar activeTab como dependencia del efecto

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
    console.log(values);
    handleCloseModal();
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleTabChange = (key: string) => {
    setActiveTab(key);
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
      render: (isActive: boolean) => <span>{isActive ? 'Activo' : 'Inactivo'}</span>,
    },
    {
      title: 'Document',
      key: 'action',
      render: (_: any, record: Item) => (
        <Button onClick={() => handleOpenModalDocument(record.linkSdoc)}>View Document</Button>
      ),
    },
  ];

  return (
    <>
      <Space style={{ marginBottom: 16 }}>
        <SAgreementNew />
      </Space>
      <Tabs defaultActiveKey="current" onChange={handleTabChange}>
        <TabPane tab="Vigentes" key="1">
          <Table dataSource={data} columns={columns} bordered />
        </TabPane>
        <TabPane tab="Software" key="2">
          <Table dataSource={data} columns={columns} bordered />
        </TabPane>
        <TabPane tab="Diseño" key="3">
          <Table dataSource={data} columns={columns} bordered />
        </TabPane>
        <TabPane tab="Enfermeria" key="4">
          <Table dataSource={data} columns={columns} bordered />
        </TabPane>
        <TabPane tab="Gastronomia" key="5">
          <Table dataSource={data} columns={columns} bordered />
        </TabPane>
        <TabPane tab="Marketing" key="6">
          <Table dataSource={data} columns={columns} bordered />
        </TabPane>
        <TabPane tab="Turismo" key="7">
          <Table dataSource={data} columns={columns} bordered />
        </TabPane>
      </Tabs>
      <Modal
        title="Document Viewer"
        open={modalOpen}
        onCancel={handleCloseModalDocument}
        footer={null}
        destroyOnClose
        width={'250%'}
      >
        {sdocumentLink && <iframe src={sdocumentLink} width="100%" height="500px" frameBorder="0" title="Document" />}
      </Modal>
    </>
  );
};

export default SAgreementFilterCurrent;

import React, { useEffect, useState } from 'react';
import { Button, Card, Statistic} from 'antd';
import {CheckCircleOutlined} from '@ant-design/icons'
import axios from 'axios';

interface Data {
    current: number;
    soon:number;
    expired:number;
  // Agrega más propiedades según tu JSON
}

const DataCard: React.FC = () => {
  const [dataAgreement, setDataAgreement] = useState<Data | null>(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    fetchDataAgreement();
  }, []);

  const fetchDataAgreement = async () => {
    try {
      const response = await axios.get<Data>('http://localhost:8081/agreement/reports');
      setDataAgreement(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <Card title= 'Convenios Marco'>
      <Statistic
        value={dataAgreement?.current}
        valueStyle={{ color: '#52c41a', fontSize: "34px", fontWeight: 'bold' }}
        prefix="Vigentes: "
      />
      <Statistic
        value={dataAgreement?.soon}
        valueStyle={{ color: '#36cfc9', fontSize: "34px", fontWeight: 'bold' }}
        prefix="Proximos a acabar: "
      />
      <Statistic
        value={dataAgreement?.expired}
        valueStyle={{ color: '#d4380d', fontSize: "34px", fontWeight: 'bold' }}
        prefix="No vigentes: "
      />
    </Card>
    
  );
};

export default DataCard;

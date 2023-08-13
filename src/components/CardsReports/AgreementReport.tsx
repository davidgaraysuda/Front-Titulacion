import React, { useEffect, useState } from 'react';
import { Card, Progress, Spin } from 'antd';
import { api } from '../../services/api';

interface Data {
  current: number;
  soon: number;
  expired: number;
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
      const data = await api('/agreement/reports'); // Utiliza la función api
      setDataAgreement(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <Card title="Convenios Marco">
      {loading ? (
        <Spin />
      ) : (
        <div>
          <Progress
            type="dashboard"
            percent={dataAgreement?.current}
            size={280}
            style={{paddingRight:"80px"}}
            format={() => `Vigentes: ${dataAgreement?.current}`}
            strokeColor="#52c41a"
          />
          <Progress
            type="dashboard"
            percent={dataAgreement?.soon}
            size={280}
            style={{paddingRight:"80px"}}
            format={() => `Proximos a acabar: ${dataAgreement?.soon}`}
            strokeColor="#36cfc9"
          />
          <Progress
            type="dashboard"
            percent={dataAgreement?.expired}
            size={280}
            format={() => `No vigentes: ${dataAgreement?.expired}`}
            strokeColor="#d4380d"
          />
        </div>
      )}
    </Card>
  );
};

export default DataCard;

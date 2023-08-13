import React, { useEffect, useState } from 'react';
import { Card, Spin, Progress } from 'antd';
import { api } from '../../services/api';

interface Data {
  specificCurrentDesing: number;
  // Agrega más propiedades según tu JSON
}

const DesingReport: React.FC = () => {
  const [dataDesing, setDataDesing] = useState<Data | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDataDesing();
  }, []);

  const fetchDataDesing = async () => {
    try {
      const data = await api('/specifics/reports/desing'); // Utiliza la función api
      setDataDesing(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <Card title="Convenios Diseño">
      {loading ? (
        <Spin />
      ) : (
        <div style={{ textAlign: 'center' }}>
          <Progress
            type="dashboard"
            percent={dataDesing?.specificCurrentDesing || 0}
            format={percent => `${percent}%`}
            strokeColor="#91caff"
          />
          <p style={{ fontSize: '20px', fontWeight: 'bold', marginTop: '10px' }}>Vigentes: {dataDesing?.specificCurrentDesing}</p>
        </div>
      )}
    </Card>
  );
};

export default DesingReport;

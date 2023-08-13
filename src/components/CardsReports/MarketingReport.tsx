import React, { useEffect, useState } from 'react';
import { Card, Spin, Progress } from 'antd';
import { api } from '../../services/api';

interface Data {
  specificCurrentMarketing: number;
  // Agrega más propiedades según tu JSON
}

const MarketingReport: React.FC = () => {
  const [dataMarketing, setDataMarketing] = useState<Data | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDataMarketing();
  }, []);

  const fetchDataMarketing = async () => {
    try {
      const data = await api('/specifics/reports/marketing'); // Utiliza la función api
      setDataMarketing(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <Card title="Convenios Marketing">
      {loading ? (
        <Spin />
      ) : (
        <div style={{ textAlign: 'center' }}>
          <Progress
            type="dashboard"
            percent={dataMarketing?.specificCurrentMarketing || 0}
            format={percent => `${percent}%`}
            strokeColor="#faad14"
          />
          <p style={{ fontSize: '20px', fontWeight: 'bold', marginTop: '10px' }}>Vigentes: {dataMarketing?.specificCurrentMarketing}</p>
        </div>
      )}
    </Card>
  );
};

export default MarketingReport;

import React, { useEffect, useState } from 'react';
import { Card, Spin, Progress } from 'antd';
import { api } from '../../services/api';

interface Data {
  specificCurrentSoftware: number;
  // Agrega más propiedades según tu JSON
}

const SoftwareReport: React.FC = () => {
  const [dataSoftware, setDataSoftware] = useState<Data | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDataSoftware();
  }, []);

  const fetchDataSoftware = async () => {
    try {
      const data = await api('/specifics/reports/software'); // Utiliza la función api
      setDataSoftware(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <Card title="Convenios Software">
      {loading ? (
        <Spin />
      ) : (
        <div style={{ textAlign: 'center' }}>
          <Progress
            type="dashboard"
            percent={dataSoftware?.specificCurrentSoftware || 0}
            format={percent => `${percent}%`}
            strokeColor="#531dab"
          />
          <p style={{ fontSize: '20px', fontWeight: 'bold', marginTop: '10px' }}>Vigentes: {dataSoftware?.specificCurrentSoftware}</p>
        </div>
      )}
    </Card>
  );
};

export default SoftwareReport;

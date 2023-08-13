import React, { useEffect, useState } from 'react';
import { Card, Spin, Progress } from 'antd';
import { api } from '../../services/api';

interface Data {
  specificCurrentTourism: number;
  // Agrega más propiedades según tu JSON
}

const TourismReport: React.FC = () => {
  const [dataTourism, setDataTourism] = useState<Data | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDataTourism();
  }, []);

  const fetchDataTourism = async () => {
    try {
      const data = await api('/specifics/reports/tourism'); // Utiliza la función api
      setDataTourism(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <Card title="Convenios Turismo">
      {loading ? (
        <Spin />
      ) : (
        <div style={{ textAlign: 'center' }}>
          <Progress
            type="dashboard"
            percent={dataTourism?.specificCurrentTourism || 0}
            format={percent => `${percent}%`}
            strokeColor="#135200"
          />
          <p style={{ fontSize: '20px', fontWeight: 'bold', marginTop: '10px' }}>Vigentes: {dataTourism?.specificCurrentTourism}</p>
        </div>
      )}
    </Card>
  );
};

export default TourismReport;

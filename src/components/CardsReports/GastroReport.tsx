import React, { useEffect, useState } from 'react';
import { Card, Spin, Progress } from 'antd';
import { api } from '../../services/api';

interface Data {
  specificCurrentGastro: number;
  // Agrega más propiedades según tu JSON
}

const GastroReport: React.FC = () => {
  const [dataGastronomy, setDataGastronomy] = useState<Data | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDataGastronomy();
  }, []);

  const fetchDataGastronomy = async () => {
    try {
      const data = await api('/specifics/reports/gastronomy'); // Utiliza la función api
      setDataGastronomy(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <Card title="Convenios Gastronomía">
      {loading ? (
        <Spin />
      ) : (
        <div style={{ textAlign: 'center' }}>
          <Progress
            type="dashboard"
            percent={dataGastronomy?.specificCurrentGastro || 0}
            format={percent => `${percent}%`}
            strokeColor="#7cb305"
          />
          <p style={{ fontSize: '20px', fontWeight: 'bold', marginTop: '10px' }}>
            Vigentes: {dataGastronomy?.specificCurrentGastro}
          </p>
        </div>
      )}
    </Card>
  );
};

export default GastroReport;

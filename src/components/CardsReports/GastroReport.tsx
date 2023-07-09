import React, { useEffect, useState } from 'react';
import { Card, Spin, Statistic } from 'antd';
import axios from 'axios';

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
      const response = await axios.get<Data>('http://localhost:8081/specifics/reports/gastronomy');
      setDataGastronomy(response.data);
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
        <Statistic
        value={dataGastronomy?.specificCurrentGastro}
        valueStyle={{ color: '#7cb305', fontSize: "34px", fontWeight: 'bold' }}
        prefix="Vigentes: "
      />
      )}
    </Card>
    
  );
};

export default GastroReport;

import React, { useEffect, useState } from 'react';
import { Card, Spin, Statistic } from 'antd';
import axios from 'axios';

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
      const response = await axios.get<Data>('http://localhost:8081/specifics/reports/desing');
      setDataDesing(response.data);
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
        <Statistic
        value={dataDesing?.specificCurrentDesing}
        valueStyle={{ color: '#91caff', fontSize: "34px", fontWeight: 'bold' }}
        prefix="Vigentes: "
      />
      )}
    </Card>
    
  );
};

export default DesingReport;

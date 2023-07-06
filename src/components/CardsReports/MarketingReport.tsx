import React, { useEffect, useState } from 'react';
import { Card, Spin } from 'antd';
import axios from 'axios';

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
      const response = await axios.get<Data>('http://localhost:8081/specifics/reports/marketing');
      setDataMarketing(response.data);
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
        <>
          <p>Vigentes: {dataMarketing?.specificCurrentMarketing}</p>
          {/* Mostrar más propiedades del JSON según sea necesario */}
        </>
      )}
    </Card>
    
  );
};

export default MarketingReport;

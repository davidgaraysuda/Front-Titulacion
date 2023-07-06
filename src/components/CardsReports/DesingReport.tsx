import React, { useEffect, useState } from 'react';
import { Card, Spin } from 'antd';
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
        <>
          <p>Vigentes: {dataDesing?.specificCurrentDesing}</p>
          {/* Mostrar más propiedades del JSON según sea necesario */}
        </>
      )}
    </Card>
    
  );
};

export default DesingReport;

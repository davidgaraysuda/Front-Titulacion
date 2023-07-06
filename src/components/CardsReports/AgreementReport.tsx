import React, { useEffect, useState } from 'react';
import { Card, Spin } from 'antd';
import axios from 'axios';

interface Data {
    current: number;
    soon:number;
    expired:number;
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
      const response = await axios.get<Data>('http://localhost:8081/agreement/reports');
      setDataAgreement(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <Card title="Convenios Marcos">
      {loading ? (
        <Spin />
      ) : (
        <>
          <p>Vigentes: {dataAgreement?.current}</p>
          <p>Proximos a Caducar (90 días): {dataAgreement?.soon}</p>
          <p>Caducados: {dataAgreement?.expired}</p>
          {/* Mostrar más propiedades del JSON según sea necesario */}
        </>
      )}
    </Card>
    
  );
};

export default DataCard;

import React, { useEffect, useState } from 'react';
import { Card, Spin } from 'antd';
import axios from 'axios';

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
      const response = await axios.get<Data>('http://localhost:8081/specifics/reports/tourism');
      setDataTourism(response.data);
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
        <>
          <p>Vigentes: {dataTourism?.specificCurrentTourism}</p>
          {/* Mostrar más propiedades del JSON según sea necesario */}
        </>
      )}
    </Card>
    
  );
};

export default TourismReport;

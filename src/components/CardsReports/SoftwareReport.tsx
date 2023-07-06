import React, { useEffect, useState } from 'react';
import { Card, Spin } from 'antd';
import axios from 'axios';

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
      const response = await axios.get<Data>('http://localhost:8081/specifics/reports/software');
      setDataSoftware(response.data);
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
        <>
          <p>Vigentes: {dataSoftware?.specificCurrentSoftware}</p>
          {/* Mostrar más propiedades del JSON según sea necesario */}
        </>
      )}
    </Card>
    
  );
};

export default SoftwareReport;

import React, { useEffect, useState } from 'react';
import { Card, Spin } from 'antd';
import axios from 'axios';

interface Data {
    specificCurrentNursing: number;
 
  // Agrega más propiedades según tu JSON
}

const NursingReport: React.FC = () => {
  const [dataNursing, setDataNursing] = useState<Data | null>(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    fetchDataNursing();
  }, []);

  const fetchDataNursing = async () => {
    try {
      const response = await axios.get<Data>('http://localhost:8081/specifics/reports/nursing');
      setDataNursing(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <Card title="Convenios Enfermería">
      {loading ? (
        <Spin />
      ) : (
        <>
          <p>Vigentes: {dataNursing?.specificCurrentNursing}</p>
          {/* Mostrar más propiedades del JSON según sea necesario */}
        </>
      )}
    </Card>
    
  );
};

export default NursingReport;

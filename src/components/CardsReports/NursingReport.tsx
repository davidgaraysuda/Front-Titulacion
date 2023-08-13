import React, { useEffect, useState } from 'react';
import { Card, Spin, Progress } from 'antd';
import { api } from '../../services/api';

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
      const data = await api('/specifics/reports/nursing'); // Utiliza la función api
      setDataNursing(data);
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
        <div style={{ textAlign: 'center' }}>
          <Progress
            type="dashboard"
            percent={dataNursing?.specificCurrentNursing || 0}
            status="active"
            strokeColor="#006d75"
          />
          <p style={{ fontSize: '20px', fontWeight: 'bold', marginTop: '10px' }}>Vigentes: {dataNursing?.specificCurrentNursing}</p>
        </div>
      )}
    </Card>
  );
};

export default NursingReport;

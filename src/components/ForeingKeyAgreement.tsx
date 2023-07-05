import React, { useEffect, useState } from 'react';
import { Select } from 'antd';
import axios from 'axios';

const { Option } = Select;

interface ForeignKeyOption {
  id: number;
  company: string;
}

interface ForeignKeySelectProps {
  onChange: (value: number) => void;
}

const ForeignKeyAgreement: React.FC<ForeignKeySelectProps> = ({ onChange }) => {
  const [options, setOptions] = useState<ForeignKeyOption[]>([]);

  useEffect(() => {
    fetchForeignKeyData();
  }, []);

  const fetchForeignKeyData = async () => {
    try {
      const response = await axios.get('http://localhost:8081/agreement/full'); // Reemplaza '/api/foreign-keys' con la ruta real a tu endpoint del backend
      const data: ForeignKeyOption[] = response.data;

      setOptions(data);
    } catch (error) {
      console.error('Error fetching foreign key data:', error);
    }
  };

  const handleSelectChange = (value: number) => {
    onChange(value);
  };

  return (
    <Select onChange={handleSelectChange}>
      {options.map((option) => (
        <Option key={option.id} value={option.id}>
          {option.company}
        </Option>
      ))}
    </Select>
  );
};

export default ForeignKeyAgreement;

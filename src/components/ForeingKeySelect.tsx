import React, { useEffect, useState } from 'react';
import { Select } from 'antd';
import axios from 'axios';

const { Option } = Select;

interface ForeignKeyOption {
  id: number;
  name: string;
}

interface ForeignKeySelectProps {
  onChange: (value: number) => void;
  section: string;
}

const ForeignKeyCareer: React.FC<ForeignKeySelectProps> = ({ onChange, section}) => {
  const [options, setOptions] = useState<ForeignKeyOption[]>([]);

  useEffect(() => {
    fetchForeignKeyData();
  }, []);

  const fetchForeignKeyData = async () => {
    try {
      const response = await axios.get('http://localhost:8081/'+ section); // Reemplaza '/api/foreign-keys' con la ruta real a tu endpoint del backend
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
          {option.name}
        </Option>
      ))}
    </Select>
  );
};

export default ForeignKeyCareer;

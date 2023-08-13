import React, { useEffect, useState } from 'react';
import { Select } from 'antd';
import { api } from '../services/api'; // Importa la función api

const { Option } = Select;

interface ForeignKeyOption {
  id: number;
  name: string;
}

interface ForeignKeySelectProps {
  onChange: (value: number) => void;
  section: string;
}

const ForeignKeyCareer: React.FC<ForeignKeySelectProps> = ({ onChange, section }) => {
  const [options, setOptions] = useState<ForeignKeyOption[]>([]);

  useEffect(() => {
    fetchForeignKeyData();
  }, []);

  const fetchForeignKeyData = async () => {
    try {
      const data = await api('/' + section); // Utiliza la función api
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

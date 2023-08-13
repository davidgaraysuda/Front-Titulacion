import React, { useEffect, useState } from 'react';
import { Modal, Button, Radio, Input } from 'antd';
import { api } from '../services/api';


const { Button: RadioButton } = Radio;
const { Search } = Input;

interface ForeignKeyOption {
  id: number;
  name: string;
  lastname:string;
  career:string
}

interface ForeignKeySelectProps {
  onChange: (value: number) => void;
  formValue?: number;
}

const ForeignKeyStudent: React.FC<ForeignKeySelectProps> = ({ onChange, formValue }) => {
  const [options, setOptions] = useState<ForeignKeyOption[]>([]);
  const [filteredOptions, setFilteredOptions] = useState<ForeignKeyOption[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(formValue || null);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    fetchForeignKeyData();
  }, []);

  useEffect(() => {
    filterOptions();
  }, [searchValue]);

  const fetchForeignKeyData = async () => {
    try {
      const data: ForeignKeyOption[] = await api('/students/with/career');
      setOptions(data);
    } catch (error) {
      console.error('Error fetching foreign key data:', error);
    }
  };

  const filterOptions = () => {
    const filtered = options.filter((option) =>
      option.name.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredOptions(filtered);
  };

  const handleSelectChange = (value: number) => {
    setSelectedOption(value);
  };

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const handleConfirm = () => {
    if (selectedOption !== null) {
      onChange(selectedOption);
    }
    setModalVisible(false);
  };

  const handleSearch = (value: string) => {
    setSearchValue(value);
  };

  return (
    <>
      <Button onClick={handleOpenModal}>Open Modal</Button>
      <Modal open={modalVisible} onCancel={handleCloseModal} onOk={handleConfirm}>
        <Search placeholder="Search by name" onChange={(e) => handleSearch(e.target.value)} />
        <Radio.Group onChange={(e) => handleSelectChange(e.target.value)} value={selectedOption}>
          <ul>
            {filteredOptions.map((option) => (
              <li key={option.id} style={{paddingTop:'10px'}}>
                <RadioButton value={option.id}>{`${option.name} ${option.lastname} ${option.career}`}</RadioButton>
              </li>
            ))}
          </ul>
        </Radio.Group>
      </Modal>
      {selectedOption !== null && (
        <div>Selected Foreign Key: {options.find((option) => option.id === selectedOption)?.name}</div>
      )}
    </>
  );
};

export default ForeignKeyStudent;

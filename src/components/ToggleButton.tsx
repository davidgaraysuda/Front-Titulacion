import React, { useState } from 'react';
import { Button } from 'antd';

interface ToggleButtonProps {
  initialValue: boolean;
}

const ToggleButton: React.FC<ToggleButtonProps> = ({ initialValue }) => {
  const [isActive, setIsActive] = useState(initialValue);

  const handleClick = () => {
    setIsActive(!isActive);
  };

  return (
    <Button type={isActive ? 'primary' : 'default'} onClick={handleClick}>
      {isActive ? 'Activo' : 'Inactivo'}
    </Button>
  );
};

export default ToggleButton;

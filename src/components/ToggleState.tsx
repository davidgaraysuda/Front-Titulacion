import React, {useState} from 'react';
import { Button } from 'antd';

interface ToggleStateProps {
  initialCarge: boolean;
  onChange: (value: boolean) => void;
}

const ToggleState: React.FC<ToggleStateProps> = ({ initialCarge, onChange }) => {
  const [isMain, setIsMain] = useState(initialCarge);

  const handleToggle = () => {
    const updatedValue = !isMain;
    setIsMain(updatedValue);
    onChange(updatedValue);
  };

  return (
    <Button type="primary" onClick={handleToggle}>
        {isMain ? 'Empleado' : 'Gerente'}
      </Button>
  );
};

export default ToggleState;

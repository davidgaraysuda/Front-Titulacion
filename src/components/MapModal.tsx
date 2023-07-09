import React, { useState } from 'react';
import { Modal, Input, Button } from 'antd';

interface MapModalProps {
  open: boolean;
  onCancel: () => void;
  onSave: (address: string) => void;
}

const MapModal: React.FC<MapModalProps> = ({ open, onCancel, onSave }) => {
  const [address, setAddress] = useState('');

  const handleSave = () => {
    onSave(address);
    console.log(address);
    onCancel();
  };

  return (
    <Modal
      open={open}
      title="Select Address from Google Maps"
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Cancel
        </Button>,
        <Button key="save" type="primary" onClick={handleSave}>
          Save
        </Button>,
      ]}
    >
        <Input
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        placeholder="Enter Address or Google Maps Embed URL"
      />
      <iframe
        title="Google Maps"
        width="100%"
        height="400px"
        src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3984.7144695093284!2d-79.00045022585535!3d-2.898386939511467!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91cd181675908f61%3A0x6f12861e6ea10317!2sTecnol%C3%B3gico%20Sudamericano!5e0!3m2!1ses!2sec!4v1688417619930!5m2!1ses!2sec`}
        allowFullScreen
      ></iframe>
    </Modal>
  );
};

export default MapModal;

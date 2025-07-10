import React, { useState } from 'react';
import NavbarAdmin from './component/navbarAdmin';
import Tablelist from './component/Tablelist';
import Modalform from './component/Modalform';

const Myspace = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [selectedClient, setSelectedClient] = useState(null); // ✅ เพิ่ม

  const handleOpen = (mode, client = null) => {
    setModalMode(mode);
    setSelectedClient(client);
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    setSelectedClient(null);
  };

  return (
    <div>
      <NavbarAdmin onOpen={() => handleOpen('add')} />
      <Tablelist handleOpen={handleOpen} />
      <Modalform
        isOpen={isOpen}
        onClose={handleClose}
        mode={modalMode}
        selectedClient={selectedClient}
      />
    </div>
  );
};

export default Myspace;

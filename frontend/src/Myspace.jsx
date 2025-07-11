import React, { useState, useEffect } from 'react'; // ✅ ต้องมี useEffect ด้วย
import NavbarAdmin from './component/navbarAdmin.jsx';
import Tablelist from './component/Tablelist';
import Modalform from './component/Modalform';
import { supabase } from './supabase/supabase.js';

const Myspace = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [selectedClient, setSelectedClient] = useState(null); // ✅ เพิ่ม
  const [clients, setClients] = useState([]); 

  const fetchClients = async () => {
    const { data, error } = await supabase.from('client').select();
    if (error) {
      console.error('Fetch error:', error.message);
    } else {
      setClients(data);
    }
  };

  useEffect(() => {
    fetchClients(); // โหลดครั้งแรก
  }, []);

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
      <Tablelist 
        handleOpen={handleOpen}
        clients={clients}
        fetchClients={fetchClients}
      />
      <Modalform
        isOpen={isOpen}
        onClose={handleClose}
        mode={modalMode}
        selectedClient={selectedClient}
        fetchClients={fetchClients}
      />
    </div>
  );
};

export default Myspace;

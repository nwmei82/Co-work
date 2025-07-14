import React, { useState, useEffect } from 'react';
import NavbarAdmin from './component/navbarAdmin.jsx';
import Tablelist from './component/Tablelist';
import Modalform from './component/Modalform';
import { supabase } from './supabase/supabase.js';

const Myspace = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [selectedDetail, setSelectedDetail] = useState(null); // ✅ เปลี่ยนชื่อให้สอดคล้อง
  const [details, setDetails] = useState([]); // ✅ ใช้ชื่อ details

  const fetchDetails = async () => {
    const { data, error } = await supabase.from('details').select();
    if (error) {
      console.error('Fetch error:', error.message);
    } else {
      setDetails(data);
    }
  };

  useEffect(() => {
    fetchDetails(); // โหลดครั้งแรก
  }, []);

  const handleOpen = (mode, detail = null) => {
    setModalMode(mode);
    setSelectedDetail(detail);
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    setSelectedDetail(null);
  };

  return (
    <div>
      <NavbarAdmin onOpen={() => handleOpen('add')} />
      <Tablelist 
        handleOpen={handleOpen}
        details={details}
        fetchDetails={fetchDetails}
      />
      <Modalform
        isOpen={isOpen}
        onClose={handleClose}
        mode={modalMode}
        selectedDetail={selectedDetail}
        fetchDetails={fetchDetails}
      />
    </div>
  );
};

export default Myspace;

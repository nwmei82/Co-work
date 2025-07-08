import React, { useState } from 'react'
import NavbarAdmin from './component/navbarAdmin'
import Tablelist from './component/Tablelist'
import Modalform from './component/Modalform'

const Mysapce = () => {
  const [isOpen, setIsopen] = useState(false);
  const [modalMode, setModalMode] = useState('add');

  const handleOpen = (mode) => {
    setIsopen(true);
    setModalMode(mode);
  }

  const handleSubmit = () => {
    if (modalMode === 'add'){
      console.log('modal mode Add');
    } else {
      console.log('modal mode Edit')
    }
  }
  return (
    <div>
      <NavbarAdmin onOpen={() => handleOpen('add')}/>
      <Tablelist handleOpen={handleOpen}/>
      <Modalform 
      isOpen={isOpen} Onsubmit={handleSubmit}
      onClose={() => setIsopen(false)}
      mode={modalMode}
      />
    </div>
  )
}

export default Mysapce
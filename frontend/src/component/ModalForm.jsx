// components/ModalForm.jsx
import React, { useEffect, useRef, useState } from 'react';
import { supabase } from '../supabase/supabase.js';
import FormKeywords from './formSections/FormKeywords.jsx';
import FormOpenDays from './formSections/FormOpenDays.jsx';
import FormSeatsAndPrice from './formSections/FormSeatsAndPrice.jsx';
import FormMenu from './formSections/FormMenu.jsx';
import FormFacilities from './formSections/FormFacilities.jsx';
import FormAddress from './formSections/FormAddress.jsx';
import FormTel from './formSections/FormTel.jsx';
import FormNote from './formSections/FormNote.jsx';
import FormShopName from './formSections/FormShopName.jsx';



const ModalForm = ({ isOpen, onClose, mode, selectedDetail, fetchDetails }) => {
  const [shopName, setShopName] = useState('');
  const [rate, setRate] = useState('');
  const [menu, setMenu] = useState('');
  const [seats, setSeats] = useState('');
  const [facilities, setFacilities] = useState([]);
  const [address, setAddress] = useState('');
  const [tel, setTel] = useState('');
  const [note, setNote] = useState('');
  const [keyword, setKeyword] = useState([]);
  const [priceMin, setPriceMin] = useState('');
  const [priceMax, setPriceMax] = useState('');
  const [addressDetail, setAddressDetail] = useState({
    main: '',
    subdistrict: '',
    district: '',
    province: '',
  });

  const [addressOpen, setAddressOpen] = useState(false);
  const [openDaysToggle, setOpenDaysToggle] = useState(false);
  const [showFacilities, setShowFacilities] = useState(false);

  const [daysStatus, setDaysStatus] = useState([
    { day: 'อาทิตย์', closed: false, openTime: '', closeTime: '' },
    { day: 'จันทร์', closed: false, openTime: '', closeTime: '' },
    { day: 'อังคาร', closed: false, openTime: '', closeTime: '' },
    { day: 'พุธ', closed: false, openTime: '', closeTime: '' },
    { day: 'พฤหัสบดี', closed: false, openTime: '', closeTime: '' },
    { day: 'ศุกร์', closed: false, openTime: '', closeTime: '' },
    { day: 'เสาร์', closed: false, openTime: '', closeTime: '' }
  ]);

  const toggleClosed = (index) => {
    setDaysStatus((prev) => prev.map((item, i) => i !== index ? item : {
      ...item,
      closed: !item.closed,
      openTime: item.closed ? item.openTime : '',
      closeTime: item.closed ? item.closeTime : '',
    }));
  };

  const handleTimeChange = (index, field, value) => {
    setDaysStatus(prev => {
      const updated = [...prev];
      updated[index][field] = value;
      return updated;
    });
  };

  const modalRef = useRef(null);

  useEffect(() => {
    const fetchShopName = async (detailId) => {
      const { data, error } = await supabase
        .from('shops')
        .select('shop_name')
        .eq('shop_detail_id', detailId)
        .single();

      if (error) {
        console.error('Error fetching shop_name:', error.message);
      } else {
        setShopName(data?.shop_name || '');
      }
    };

    if (isOpen) {
      modalRef.current?.showModal();

      if (mode === 'edit' && selectedDetail) {
        setDaysStatus(Array.isArray(selectedDetail.date_time) ? selectedDetail.date_time : daysStatus);
        setSeats(selectedDetail.seats || '');
        setRate(selectedDetail.price_range || '');
        setMenu(selectedDetail.menu || '');
        setFacilities(Array.isArray(selectedDetail.facilities) ? selectedDetail.facilities : []);
        setAddress(selectedDetail.address || '');
        setTel(selectedDetail.tel || '');
        setNote(selectedDetail.notes || '');
        const [min, max] = (selectedDetail.price_range || '').split('-');
        setPriceMin(min || '');
        setPriceMax(max || '');

        fetchShopName(selectedDetail.detail_id);
      } else {
        // reset state
        setShopName('');
        setSeats('');
        setRate('');
        setMenu('');
        setFacilities([]);
        setAddress('');
        setTel('');
        setNote('');
      }
    } else {
      modalRef.current?.close();
    }
  }, [isOpen, selectedDetail, mode]);


    const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      date_time: daysStatus,
      seats,
      price_range: priceMin && priceMax ? `${priceMin}-${priceMax}` : '',
      menu: menu ? [menu] : [],
      facilities: facilities.map(f => ({ name: f.name, ...(f.note?.trim() && { note: f.note.trim() }) })),
      address: addressOpen ? Object.values(addressDetail).filter(Boolean).join(', ') : '',
      tel,
      notes: note,
      keyword,
    };

    if (mode === 'add') {
      const { data: detailData, error: detailError } = await supabase
        .from('details')
        .insert([payload])
        .select()
        .single();

      if (detailError) {
        console.error('Error inserting into details:', detailError.message);
        return;
      }

      const { error: shopError } = await supabase
        .from('shops')
        .insert({
          shop_name: shopName,
          shop_detail_id: detailData.detail_id, // เชื่อมกับ details
        });

      if (shopError) {
        console.error('Error inserting into shops:', shopError.message);
        return;
      }

    } else if (mode === 'edit') {
      const { error: detailError } = await supabase
        .from('details')
        .update(payload)
        .eq('detail_id', selectedDetail.detail_id);

      if (detailError) {
        console.error('Error updating details:', detailError.message);
        return;
      }

      const { error: shopError } = await supabase
        .from('shops')
        .update({
          shop_name: shopName,
        })
        .eq('shop_detail_id', selectedDetail.detail_id); // ❗ใช้ shop_detail_id ใน WHERE

      if (shopError) {
        console.error('Error updating shops:', shopError.message);
        return;
      }
    }

    await fetchDetails();
    onClose();
  };




  const generateTimeOptions = () => {
    const times = [];
    for (let h = 0; h < 24; h++) {
      for (let m = 0; m < 60; m += 30) {
        times.push(`${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`);
      }
    }
    return times;
  };

  const facilityOptions = ['ปลั๊กไฟ', 'ห้องน้ำ', 'แอร์', 'Wi-Fi'];

  const handleKeywordChange = (e) => {
    const value = e.target.value;
    const isChecked = e.target.checked;

    if (isChecked) {
      setKeyword((prev) => [...prev, value]);
    } else {
      setKeyword((prev) => prev.filter((k) => k !== value));
    }
  };


  return (
    <dialog ref={modalRef} className="modal">
      <div className="modal-box max-w-2xl w-full px-6">
        <h3 className="font-bold text-lg py-4">{mode === 'edit' ? 'Edit Detail' : 'ฟอร์มเพิ่ม Myspace'}</h3>
        <form method="dialog" onSubmit={handleSubmit} className="flex flex-col min-h-[300px] relative">

          <FormShopName shopName={shopName} setShopName={setShopName} />

          <FormTel tel={tel} setTel={setTel} />
          
          <FormKeywords keyword={keyword} onChange={handleKeywordChange} />

          <FormAddress
            addressOpen={addressOpen}
            setAddressOpen={setAddressOpen}
            addressDetail={addressDetail}
            setAddressDetail={setAddressDetail}
          />

          <button
            type="button"
            onClick={() => setOpenDaysToggle(!openDaysToggle)}
            className="flex items-center gap-2 font-bold text-lg"
          >
            <span className={`transition-transform ${openDaysToggle ? 'rotate-90' : ''}`}>▶</span>
            วันที่ที่เปิดทำการ
          </button>
          {openDaysToggle && (
            <FormOpenDays
              daysStatus={daysStatus}
              toggleClosed={toggleClosed}
              handleTimeChange={handleTimeChange}
              timeOptions={generateTimeOptions()}
              openDaysToggle={openDaysToggle}
              setOpenDaysToggle={setOpenDaysToggle}
            />
          )}

          <FormSeatsAndPrice
            seats={seats} setSeats={setSeats}
            priceMin={priceMin} setPriceMin={setPriceMin}
            priceMax={priceMax} setPriceMax={setPriceMax}
          />

            <FormFacilities
            facilities={facilities}
            setFacilities={setFacilities}
            facilityOptions={facilityOptions}
            showFacilities={showFacilities}
            setShowFacilities={setShowFacilities}
            
          />

          <FormMenu menu={menu} setMenu={setMenu} />

          <FormNote note={note} setNote={setNote} />


          <button type="button" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={onClose}>✕</button>
          <div className="mt-auto flex justify-start">
            <button type="submit" className="btn btn-success">{mode === 'edit' ? 'Save Changes' : 'Add Detail'}</button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default ModalForm;

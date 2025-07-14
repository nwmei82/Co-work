import React from 'react';
import { supabase } from '../supabase/supabase.js';

const Tablelist = ({ handleOpen, details, fetchDetails }) => {
  const handleDelete = async (id) => {
    // 🔸 ลบ shop ที่เชื่อมกับ detail ก่อน
    const { error: shopError } = await supabase
      .from('shops')
      .delete()
      .eq('shop_detail_id', id);

    if (shopError) {
      console.error('Error deleting from shops:', shopError.message);
      return;
    }

    // 🔹 ลบ detail หลังจากลบ shop แล้ว
    const { error: detailError } = await supabase
      .from('details')
      .delete()
      .eq('detail_id', id);

    if (detailError) {
      console.error('Error deleting from details:', detailError.message);
      return;
    }

    fetchDetails(); // รีโหลดข้อมูล
  };


  return (
    <div className="overflow-x-auto mt-10">
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Key word</th>
            <th>Date/Time</th>
            <th>Seats</th>
            <th>Price</th>
            <th>Menu</th>
            <th>Facilities</th>
            <th>Address</th>
            <th>Tel</th>
            <th>Note</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {details.map((detail) => (
            <tr key={detail.detail_id}>
              <td>{detail.detail_id}</td>
              <td>{Array.isArray(detail.keyword) ? detail.keyword.join(', ') : detail.keyword}</td>
              <td>
                {Array.isArray(detail.date_time)
                  ? detail.date_time
                      .map(
                        (d) =>
                          `${d.day}: ${d.closed ? 'ปิด' : `${d.openTime} - ${d.closeTime}`}`
                      )
                      .join(', ')
                  : ''}
              </td>
              <td>{detail.seats}</td>
              <td>{detail.price_range}</td>
              <td>{detail.menu}</td>
              <td>
                {Array.isArray(detail.facilities)
                  ? detail.facilities
                      .map((f) => (f.note ? `${f.name} (${f.note})` : f.name))
                      .join(', ')
                  : ''}
              </td>
              <td>{detail.address}</td>
              <td>{detail.tel}</td>
              <td>{detail.notes}</td>
              <td className="flex gap-2">
                <button
                  onClick={() => handleOpen('edit', detail)}
                  className="btn btn-secondary"
                >
                  Update
                </button>
                <button
                  className="btn btn-accent"
                  onClick={() => handleDelete(detail.detail_id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Tablelist;

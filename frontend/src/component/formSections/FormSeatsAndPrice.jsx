import React from 'react';

const FormSeatsAndPrice = ({
  seats,
  setSeats,
  priceMin,
  setPriceMin,
  priceMax,
  setPriceMax,
}) => {
  return (
    <div>
      <label className="block my-2 font-bold">
        Seats
        <input
          className="input input-bordered w-full mt-1 font-normal"
          type="number"
          min="0"
          value={seats}
          onChange={(e) => setSeats(e.target.value)}
        />
      </label>

      <label className="block my-2 font-bold">
        Price Range
        <div className="flex gap-2 mt-1">
          <input
            type="number"
            min="0"
            placeholder="ต่ำสุด"
            value={priceMin}
            onChange={(e) => setPriceMin(e.target.value)}
            className="input input-bordered w-1/2 font-normal"
          />
          <input
            type="number"
            min={priceMin || 0}
            placeholder="สูงสุด"
            value={priceMax}
            onChange={(e) => setPriceMax(e.target.value)}
            className="input input-bordered w-1/2 font-normal"
          />
        </div>
      </label>
    </div>
  );
};

export default FormSeatsAndPrice;

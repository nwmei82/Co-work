import React from 'react';

const FormOpenDays = ({
  daysStatus,
  toggleClosed,
  handleTimeChange,
  openDaysToggle,
  setOpenDaysToggle,
  timeOptions,
}) => {
  return (
    <div className="my-4">
      <button
        type="button"
        onClick={() => setOpenDaysToggle(!openDaysToggle)}
        className="flex items-center gap-2 font-bold text-lg"
      >
        <span
          className={`transition-transform duration-200 ${
            openDaysToggle ? 'rotate-90' : ''
          }`}
        >
          ▶
        </span>
        วันที่ที่เปิดทำการ
      </button>

      {openDaysToggle && (
        <div className="mt-2 border p-4 rounded-md">
          {daysStatus.map((dayData, index) => (
            <div key={index} className="mb-4">
              <div className="flex items-center gap-4">
                <p className="w-20">{dayData.day}</p>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={dayData.closed}
                    onChange={() => toggleClosed(index)}
                    className="w-5 h-5 border border-black"
                  />
                  ปิดทำการ
                </label>
                {!dayData.closed && (
                  <>
                    <input
                      type="text"
                      list="openTimes"
                      className="input input-bordered input-sm w-[110px]"
                      value={dayData.openTime}
                      onChange={(e) => handleTimeChange(index, 'openTime', e.target.value)}
                      placeholder="00:00"
                    />
                    <span>ถึง</span>
                    <input
                      type="text"
                      list="openTimes"
                      className="input input-bordered input-sm w-[110px]"
                      value={dayData.closeTime}
                      onChange={(e) => handleTimeChange(index, 'closeTime', e.target.value)}
                      placeholder="23:30"
                    />

                    {/* วางไว้ครั้งเดียวข้างล่างสุดของ modal */}
                    <datalist id="openTimes">
                      {timeOptions.map((time) => (
                        <option key={time} value={time} />
                      ))}
                    </datalist>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FormOpenDays;

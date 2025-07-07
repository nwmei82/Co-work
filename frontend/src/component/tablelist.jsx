const TableList = () => {
    return(
        <div className="flex">
            <div className="card card-border border-[#1D3557] w-[675px]  mx-[30px] my-[30px]">
                <div className="card-body">
                    <div className="flex justify-between items-start">
                        <h2 className="card-title text-[30px] font-bold">INK & LION cafe (อิงค์แอน์ไลออนคาเฟ่)</h2>
                        <span className="material-symbols-outlined cursor-pointer px-3">bookmark</span>
                    </div>
                    <div className="flex flex-row items-center">
                        <div className="flex flex-row items-center">
                            <button className="flex items-center gap-1 h-[34px] bg-[#789DBC] text-[16px] rounded-[5px] px-3 py-[5px]"> 3.7
                            <span className="material-symbols-outlined text-[20px] leading-none">kid_star</span>
                            </button>
                            <button className="h-[34px] bg-[#FFE3E3] text-[16px] rounded-[5px] px-3 py-[5px] ml-[10px]">Open</button>
                        </div>
                        <p className="text-[16px] px-3">คาเฟ่, ร้านกาแฟ/ชา, เค้ก/เบเกอรี่</p>
                    </div>
                    <div className="flex flex-row items-center text-[16px] py-[5px]">
                        <span class="material-symbols-outlined">location_on</span>
                        <p>1991/194 ถนนอ่อนนุช อ่อนนุช สวนหลวง กรุงเทพมหานคร</p>
                    </div>

                </div>
            </div>
            <div className="card card-border border-[#1D3557] w-[675px] mr-[30px] my-[30px]">
                <div className="card-body">
                    <h2 className="card-title text-[32px] font-bold">INK & LION cafe (อิงค์แอน์ไลออนคาเฟ่)</h2>
                    <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
                </div>
            </div>
        </div>
    )
}

export default TableList;
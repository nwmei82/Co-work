import { useParams } from "react-router-dom";
import { useEffect , useState} from "react";
import { getShopById } from "../supabase/shop";
const DetailShop = () => {
    const {id} = useParams();
    const [shop, setShop] = useState(null);

    const getShop = async(id) => {
        console.log("start getShopBYId");
        try{
            const shop = await getShopById(id);
            console.log(shop)
            setShop(shop[0]);
        }catch (error) {
            console.log("error at getShopById", error);
        }
    }

    useEffect(()=> {
        if(id){
            getShop(id);
        }
    },[id])

    if (!shop) {
        return <p>Loading...</p>;
    }
    return(
        <div className="p-6 bg-[#fdf8f2] min-h-screen flex justify-center">
        <div className="w-full max-w-6xl flex flex-row gap-6">

        {/* Image and thumbnails */}
        <div className="flex flex-col items-center">
          <div className="w-[300px] h-[300px] bg-gray-300 mb-4 border-2 border-blue-300 flex items-center justify-center">
            image
          </div>
          <div className="flex gap-3">
            <div className="w-[60px] h-[60px] bg-gray-200"></div>
            <div className="w-[60px] h-[60px] bg-gray-200"></div>
            <div className="w-[60px] h-[60px] bg-gray-200"></div>
            <div className="w-[60px] h-[60px] bg-gray-200"></div>
          </div>
        </div>

        {/* Center Info */}
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold">
                {shop.shop_name}
              </h2>
              <p className="text-gray-600 mt-1">{shop.shop_detail_id?.keyword}</p>
            </div>
            <span className="material-symbols-outlined text-[24px] cursor-pointer">bookmark</span>
          </div>

          <div className="flex items-center gap-2 mt-3">
            <button className="flex items-center gap-1 bg-[#789DBC] text-white px-2 py-[2px] rounded text-sm h-[30px]">{shop.shop_rating}<span className="material-symbols-outlined text-sm">kid_star</span></button>
            <button className="bg-[#FFE3E3] font-bold text-black px-3 py-[2px] rounded text-sm h-[30px]">Open</button>
          </div>

          {/* Operating Time and Price */}
          <div className="grid grid-cols-2 gap-4 mt-5 text-sm">
            <div>
              <p className="font-bold">เวลาเปิด-ปิด</p>
              <p>จันทร์ - ศุกร์: 08.00 - 16.00</p>
              <p>เสาร์ - อาทิตย์: 09.00 - 17.00</p>
            </div>
            <div>
              <p className="font-bold">จำนวนที่นั่ง</p>
              <p>{shop.shop_detail_id?.seats}</p>
              <p className="font-bold mt-2">ราคา</p>
              <p>{shop.shop_detail_id?.price_range}</p>
            </div>
          </div>

          {/* Facilities */}
          <div className="mt-4 text-sm">
            <p className="font-bold">สิ่งอำนวยความสะดวก</p>
            <div className="flex gap-4 mt-1">
              <div>✅</div>
              <div>✅</div>
              <div>✅</div>
            </div>
            <p className="text-gray-500 mt-1">หมายเหตุ</p>
          </div>

          {/* Comments */}
          <div className="mt-5">
            <p className="font-bold">comment</p>
            <div className="bg-green-100 rounded p-2 mt-2 text-sm">
              <p className="font-semibold">rewiew<span className="text-yellow-600">review score</span></p>
              <p>review content</p>
            </div>
            <div className="bg-green-100 rounded p-2 mt-2 h-[40px]"></div>
          </div>
        </div>

        {/* Map + Address */}
        <div className="w-[250px]">
          <div className="w-full h-[180px] bg-gray-200 flex items-center justify-center">
            Map
          </div>
          <p className="text-sm mt-3">{shop.shop_detail_id?.address}</p>
          <p className="text-sm mt-1"><span className="font-bold">เบอร์โทร</span> : {shop.shop_detail_id?.tel}</p>
          <button className="mt-3 bg-[#789DBC] text-white w-full py-2 rounded">ดูเมนูและราคา</button>
        </div>

      </div>
    </div>
    )
}
export default DetailShop;
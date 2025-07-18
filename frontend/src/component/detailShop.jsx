import { useParams,useNavigate } from "react-router-dom";
import { useEffect , useState} from "react";
import { getShopById, getReviews, addBookmark,deleteBookmark }from "../supabase/shop";
import {MapContainer,TileLayer,Marker} from "react-leaflet";
import { useAuth } from "./authContext";

const DetailShop = () => {
    const {id} = useParams();
    const [shop, setShop] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [latitude, setLat] = useState(null)
    const [longtitude, setLong] = useState(null)
    const [add, setAdd] = useState(false);
    const navigate = useNavigate();

    const {user} = useAuth();

    const handleAdd = async () => {
      const uid = user.uid;
      if(!add){
        try{
          console.log("stat handleAdd")
          const detail = await addBookmark(uid,id);
          console.log(detail)
          setAdd(true);
        }
        catch(error){
          console.log("error at handleAdd",error)
        }
      }else{
        try{
          console.log("start hadle delete");
          console.log(uid,id)
          await deleteBookmark(uid,id);
          setAdd(false);
        }catch(error){
          console.log("error at handledelete", error)
        }
      }
      
    }

    const getShop = async(id) => {
        try{
            const shopData = await getShopById(id);
            const shop = shopData[0]
            setShop(shop);
            const [lat,long] = shop.shop_location
            setLat(lat)
            setLong(long)
        }catch (error) {
            console.log("error at getShopById", error);
        }
    }

    const handleback = () => {
      navigate('/');
    }

    const fetchReviews = async(id) => {
      try{
        const review = await getReviews(id)
        setReviews(review);
      }catch(error){
        console,log("error at getReviews", error)
      }
    }

    useEffect(()=> {
        if(id){
          getShop(id);
          fetchReviews(id);
        }
    },[id])

    if (!shop) {
        return <p>Loading...</p>;
    }

    const formatTime = (time) => time?.slice(0, 5).replace(":", ".");
    const opened = shop.shop_detail_id?.date_time.filter(day => !day.closed)

    return(
        <div className="p-6 bg-[#fdf8f2] min-h-screen flex justify-center">
        <div className="w-full flex flex-row gap-6 text-[#1D3557]">
        <button className="btn btn-ghost" onClick={()=>handleback()}><span className="material-symbols-outlined">arrow_back</span></button>
        

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
              <div className="flex">
              {shop.shop_detail_id?.keyword.map(word=>{
                return(
                  <p className="text-gray-600 mt-1 mr-2" key={word}>{word}</p>
              )})}
              </div>
            </div>

            <button className="btn btn-ghost cursor-pointer mx-2" onClick={handleAdd}>
              {add === false ? (
                <span className="material-symbols-outlined text-[24px]">bookmark</span>
              ) : (
              <img src="/bookmark.png" />
              )}
            </button>
            
          </div>

          <div className="flex items-center gap-2 mt-3">
            <button className="flex items-center gap-1 bg-[#789DBC] text-white px-2 py-[2px] rounded text-sm h-[30px]">{shop.shop_rating}<span className="material-symbols-outlined text-sm">kid_star</span></button>
            <button className="bg-[#FFE3E3] font-bold text-black px-3 py-[2px] rounded text-sm h-[30px]">Open</button>
          </div>

          {/* Operating Time and Price */}
          <div className="grid grid-cols-2 gap-4 mt-5 text-sm">
            <div>
              <p className="font-bold">เวลาเปิด-ปิด</p>
              {opened.length > 0 ? (
                opened.map(({ day, openTime, closeTime }) => (
                  <p key={day}>
                    {day} : {formatTime(openTime)} - {formatTime(closeTime)}
                  </p>
                ))
              ) : (
                <p className="text-red-500">ไม่มีวันเปิดทำการ</p>
              )}
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
            <div className="flex flex-row gap-4 mt-1">
              {shop.shop_detail_id?.facilities.map(faci=> {
                return(<div key={faci}>✅{faci}</div>
              )})}
              
            </div>
            <div className="flex flex-col mt-4">
            {shop.shop_detail_id?.notes.length > 0 && (
              <>
              <p className="text-red-500 font-bold">หมายเหตุ</p>
              <p className="text-red-500" >{shop.shop_detail_id?.notes}</p>
              </>
            )}
            </div>
          </div>

          {/* Comments */}
          <div className="mt-5">
            {reviews.length > 0 && (
                <p className="font-bold">comment</p>
            )}
            {reviews.map(review =>{
              return(
              <div className="bg-green-100 rounded p-2 mt-2 text-sm" key={review.review_id}>
              <p className="font-semibold">{review.user_id?.name}<span className="text-yellow-600 mx-2">{review.score}</span></p>
              <p>{review.comment}</p>
              </div>
            )})}
            
          </div>
        </div>

        {/* Map + Address */}
        <div className="w-[250px]">

          <div className="w-full h-[180px] bg-gray-200 flex items-center justify-center">
            <MapContainer key={`${latitude}-${longtitude}`} center={[latitude, longtitude]} zoom={25} style={{ height: "180px", width: "100%" }}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[latitude, longtitude]}>
            </Marker>
            </MapContainer>
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
import { getAllShops } from "../supabase/shop";
import { useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./authContext";

const TableList = () => {

    const navigate = useNavigate();
    const [shops,setShops] = useState([]);
    const { user, setShowLoginModal, setRedirect } = useAuth();

    const getShops = async() => {
        try{
            const datas = await getAllShops();
            setShops(datas);
        } catch(err) {
            console.log("error in fech getshop");
        }
    }
    useEffect(()=>{
        getShops();
    },[]);

    const handleClickTest = (id) => {
        if(!user){
            setRedirect(`/shop/${id}`)
            setShowLoginModal(true);
        } else {
            navigate(`/shop/${id}`);
        }
    };
    return(
        <div className="flex text-[#1D3557]">
            {shops.map(shop =>( 
                <div key={shop.shop_id} className="card card-border border-[#1D3557] w-[675px]  mx-[30px] my-[30px] cursor-pointer" onClick={()=>handleClickTest(shop.shop_id)}>
                <div className="card-body">
                    <div className="flex justify-between items-start text-[30px]">
                        <h2 className="card-title text-[30px] font-bold">{shop.shop_name}</h2>
                        <span className="material-symbols-outlined cursor-pointer">bookmark</span>
                    </div>
                    <div className="flex flex-row items-center">
                        <div className="flex flex-row items-center">
                            <button className="flex items-center gap-1 h-[34px] bg-[#789DBC] text-[16px] text- rounded-[5px] px-3 py-[5px] text-[#FEF9F2]">{shop.shop_rating}
                            <span className="material-symbols-outlined text-[20px] leading-none">kid_star</span>
                            </button>
                            <button className="h-[34px] bg-[#FFE3E3] text-[16px] font-bold rounded-[5px] px-3 py-[5px] ml-[10px]">Open</button>
                        </div>
                        <div className="flex">
                            {shop.shop_detail_id?.keyword.map(word=>{
                            return(
                                <p className="text-[16px] ml-2" key={word}>{word}</p>
                            )})}
                        </div>
                        
                    </div>
                    <div className="flex flex-row items-center text-[16px] py-[5px]">
                        <span className="material-symbols-outlined">location_on</span>
                        <p>{shop.shop_detail_id?.address}</p>
                    </div>
                </div>
            </div>

            ))}
        </div>
    )
}

export default TableList;
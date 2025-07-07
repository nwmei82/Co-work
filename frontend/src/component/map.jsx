import { getLocation } from "../supabase/user";
import { useEffect , useState} from "react";
import {MapContainer,TileLayer,Marker, Popup} from "react-leaflet";

const Map = () => {

    const [latitude, setLat] = useState(null)
    const [longtitude, setLong] = useState(null)

    const pinIcon = L.icon({
        iconUrl: "/pin.png",
        iconSize: [30, 30]
    });
    const location = async () => {
        try {
            const { lat, lng } = await getLocation();
            console.log("Location:", lat, lng);
            setLat(lat);
            setLong(lng);
        } catch (error) {
            alert("ไม่สามารถเข้าถึงตำแหน่งของคุณได้");
        }
    };

    useEffect(()=>{
        location();
    },[]);

    if (latitude === null || longtitude === null) {
        return <div className="flex justify-center items-center h-[300px]"><span className="loading loading-spinner"></span></div>;
    }

    return(
        <MapContainer key={`${latitude}-${longtitude}`} center={[latitude, longtitude]} zoom={25} style={{ height: "300px", width: "100%" }}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[latitude, longtitude]} icon={pinIcon}>
                <Popup><h6>You are here!</h6></Popup>
            </Marker>
        </MapContainer>
    )
}

export default Map
import Navbar from "./navbar";
import Login from "./login";
import Map from "./map";
import TableList from "./tablelist";
import { useState } from "react"

const Homepage = () => {

    const [role, setRole] = useState("");
    const [isOpen, setIsopen] = useState(false);

    return(
        
        <div className="bg-[#FEF9F2] w-full h-screen">
            <Navbar onAdmin={()=>{setIsopen(true); setRole("admin")}} onUser={()=>{setIsopen(true); setRole("user")}}/>
            <Login isOpen={isOpen} role={role} isClose={()=> setIsopen(false)}/>
            <div className="h-[300px]">
                <Map/>
            </div>
            <div className="bg-[#789DBC] h-[44px] flex justify-end ">
                <button className="self-center btn btn-ghost text-3xl font-bold text-[#FEF9F2]">^</button>
            </div>
            <TableList/>
        </div>
        
    )
}

export default Homepage;
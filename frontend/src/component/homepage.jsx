import Navbar from "./navbar";
import Login from "./login";
import { useState } from "react"

const Homepage = () => {

    const [role, setRole] = useState("");
    const [isOpen, setIsopen] = useState(false);

    return(
        
        <div className="bg-[#FEF9F2] w-full h-[1000px]">
            <Navbar onAdmin={()=>{setIsopen(true); setRole("admin")}} onUser={()=>{setIsopen(true); setRole("user")}}/>
            <Login isOpen={isOpen} role={role} isClose={()=> setIsopen(false)}/>
        </div>
        
    )
}

export default Homepage;
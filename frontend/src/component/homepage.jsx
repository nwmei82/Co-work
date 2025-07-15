import Navbar from "./navbar";
import Login from "./login";
import Map from "./map";
import TableList from "./tablelist";
import NavbarUser from "./navbarUser";
import { useAuth } from "./authContext";


const Homepage = () => {

    const { user,showLoginModal, setShowLoginModal, role, setRole } = useAuth();

    return(
        
        <div className="bg-[#FEF9F2] w-full">
            {user===null? (<Navbar
                onAdmin={() => {
                setShowLoginModal(true);
                setRole("admin");
                }}
                onUser={() => {
                setShowLoginModal(true);
                setRole("user");
                }}
            />):(<NavbarUser/>)}
            
            <Login isOpen={showLoginModal} role={role} isClose={() => setShowLoginModal(false)} />

            <div className="h-[300px]">
                <Map />
            </div>

            <div className="bg-[#789DBC] h-[44px] flex justify-end ">
                <button className="self-center btn btn-ghost text-3xl font-bold text-[#FEF9F2]">^</button>
            </div>

            <TableList />
        </div>
    )
}

export default Homepage;